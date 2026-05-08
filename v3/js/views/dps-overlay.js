'use strict';

var DpsOverlay = {
  template: `
    <div id="container" :style="containerStyle" v-cloak>
      <div id="resizer" v-if="resizable"></div>
      <div class="title" @dblclick="openSetting">
        <span id="title-left">
          <span v-if="!encounter.title">
            暂无数据 <span v-if="!option._knownSetting">(双击打开设置页面)</span>
          </span>
          <template v-else>
            <span>{{encounter.CurrentZoneName}} - {{encounter.duration}}</span>
          </template>
          <span class="circle hover-scale" @click="miniStyle=!miniStyle"></span>
        </span>
        <span>
          <span :class="{'at-right-nextline':titleNextLine, 'at-right':!titleNextLine}">
            <span id="title-right">
              <template v-if="option.series.length>1">
                <span class="series-names" v-for="(s, i) in option.series" @click="changeDataType(i)"
                  :class="{'active-series':currentSeriesIndex===i}">{{s.name}}</span>
              </template>
              <span v-show="encounter.title">
                <span v-if="myDps"># {{myOrder}} &nbsp; {{round(myDps)}} / </span>
                {{round(encounter.dps)}}
              </span>
            </span>
          </span>
        </span>
      </div>
      <div v-show="!miniStyle">
        <div class="title-border"></div>
        <ul v-if="showColumnHeader" style="font-weight: bold;">
          <li style="flex: 0 0 1.5em;"></li>
          <li :style="{flex: '0 0 '+(currentSeries.nameColumnWidth||option.nameColumnWidth)+'%'}"></li>
          <li v-for="column in currentSeries.columns"
            :style="{textAlign: column.textAlign||'left', flex: column.size?('0 0 '+column.size+'%'):'auto'}">
            {{column.name}}
          </li>
        </ul>
        <transition-group tag="div" :name="option.animationOff?'':'flip-list'">
          <ul v-for="c in combatants" :key="c.name">
            <li style="flex: 0 0 1.5em;">
              <img class="job-img"
                :src="'../icons/'+(c.Job||'Err')+'.png'"
                onerror="this.style.opacity='0'"/>
              <div class="filler" :class="{'filler-fill':option.dataBarStyle=='fill','filler-line':option.dataBarStyle=='line'}"
                :style="{width: getPercentWidth(c) + '%', backgroundColor: getJobColor(c.Job), height: dataBarHeight}"></div>
            </li>
            <li :style="{flex: '0 0 '+(currentSeries.nameColumnWidth||option.nameColumnWidth)+'%','font-family':option.fontFamily.name}"
              :class="{'hidden-text':option.hiddenOthers&&c.name!='YOU'}">{{c.name}}</li>
            <li v-for="column in currentSeries.columns"
              :style="{textAlign: column.textAlign||'left', flex: column.size?('0 0 '+column.size+'%'):'auto','font-family':option.fontFamily.data}">
              {{column.prefix}}
              <template v-if="column.round">{{round(c[column.value])}}</template>
              <template v-else>{{c[column.value]}}</template>
              {{column.suffix}}
            </li>
          </ul>
        </transition-group>
      </div>
    </div>
  `,
  setup() {
    const { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } = Vue;

    // ============= Job data =============
    var jobType = {
      tank: ["War", "Mrd", "Drk", "Pld", "Gla", "Gnb"],
      dps: ["Pgl", "Mnk", "Lnc", "Drg", "Rog", "Nin", "Sam", "Arc", "Brd", "Mch", "Dnc", "Thm", "Blm", "Acn", "Smn", "Rdm", "Blu", "Rpr", "Vpr", "Pct"],
      healer: ["Whm", "Cnj", "Ast", "Sch", "Sge"]
    };
    var jobSort = [].concat(jobType.tank, jobType.healer, jobType.dps);
    for (var i in jobType) {
      var jts = jobType[i];
      for (var j = 0; j < jts.length; ++j) jobType[jts[j]] = i;
    }
    for (var k in jobSort) jobSort[jobSort[k]] = +k;

    // ============= Options =============
    var defaultOption = {
      fontSize: 13,
      fontFamily: { all: "-webkit-pictograph,serif", name: "", data: "" },
      showLimitBreak: false,
      showColumnHeader: false,
      nameColumnWidth: 30,
      backgroundAlpha: 30,
      useJobColor: false,
      orderByJob: false,
      dataBarStyle: "fill",
      dataBarHeight: 2,
      jobColor: {
        Blm: "#A579D6", Mnk: "#d69c00", Sam: "#e46d04", Mch: "#6EE1D6",
        Nin: "#AF1964", Drg: "#4164CD", Smn: "#2D9B78", Brd: "#91BA5E",
        Dnc: "#E2B0AF", Rdm: "#e87b7b", Gnb: "#796D30", Pld: "#A8D2E6",
        War: "#cf2621", Drk: "#D126CC", Whm: "#FFF0DC", Sch: "#8657FF",
        Ast: "#FFE74A", Blu: "#57ABAB", Rpr: "#965A90", Sge: "#80A0F0",
        Pct: "#875488", Vpr: "#0e750e"
      },
      colors: { tank: "#8080ff", dps: "#ff8080", healer: "#80ff80", background: "rgba(0,0,0,0.2)" },
      series: [
        {
          name: "伤害",
          columns: [
            { name: "DPS", value: "dps", round: true, size: 20 },
            { name: "直击", value: "DirectHitPct", prefix: "直", size: 15 },
            { name: "暴击", value: "crithit%", prefix: "暴", size: 15 },
            { name: "倒地", value: "deaths", suffix: "死", textAlign: "center" }
          ],
          orderBy: 0, orderAsc: false
        },
        {
          name: "奶量",
          columns: [
            { name: "HPS", value: "enchps", round: true, size: 20 },
            { name: "过量", value: "OverHealPct", prefix: "过", size: 15 },
            { name: "承伤", value: "damagetaken-*", prefix: "承", size: 15 },
            { name: "倒地", value: "deaths", suffix: "死", textAlign: "center" }
          ],
          orderBy: 0, orderAsc: false
        }
      ]
    };

    function getOption(opt) {
      opt = mergeObj(JSON.parse(JSON.stringify(defaultOption)), opt || {});
      try {
        for (var si = 0; si < opt.series.length; si++) {
          var series = opt.series[si];
          if (!series) continue;
          var remain_size = 0, sizeCount = 0;
          series.columns.forEach(function(c) {
            if (c.size) {
              var sz = +c.size;
              if (!isNaN(sz)) remain_size += sz;
            }
          });
          sizeCount = remain_size;
          remain_size = (95 - (opt.nameColumnWidth || 30)) - remain_size;
          if (remain_size < 0) { remain_size = 10; sizeCount += 10; }
          var nosizeSeries = series.columns.filter(function(c) { return !c.size; });
          if (nosizeSeries.length > 0) {
            var siz = Math.round(remain_size / nosizeSeries.length * 100) / 100;
            nosizeSeries.forEach(function(c) { c.size = "" + siz; });
          }
          if (Math.abs(sizeCount - 95) > 5) {
            if (!series.nameColumnWidth) series.nameColumnWidth = opt.nameColumnWidth;
            sizeCount += (+series.nameColumnWidth);
            var sizeScale = 95 / sizeCount;
            series.nameColumnWidth = Math.round(series.nameColumnWidth * sizeScale * 100) / 100;
            series.columns.forEach(function(c) {
              if (c.size) c.size = (c.size * sizeScale).toFixed(2);
            });
          }
        }
      } catch(e) { console.error(e); }
      return opt;
    }

    var savedOption = localStorage.getItem("CCINO_DPS_OPTION");
    savedOption = savedOption ? JSON.parse(savedOption) : null;
    const option = reactive(getOption(savedOption));

    // ============= State =============
    const resizable = ref(true);
    const isActive = ref(false);
    const encounter = ref({});
    const combatants = ref([]);
    const combatant_max = ref({});
    const yourData = ref({});
    const miniStyle = ref(false);
    const currentSeriesIndex = ref(0);
    const myOrder = ref(1);
    var settingWindow = null;
    var settingPollTimer = null;

    // ============= Body size =============
    const bodyWidth = ref(300);
    const titleWidth = ref(200);

    function updateBodySize() {
      bodyWidth.value = document.body.offsetWidth || 300;
      var titleLeft = document.getElementById("title-left");
      var titleRight = document.getElementById("title-right");
      titleWidth.value = 18 + (titleLeft ? titleLeft.offsetWidth : 100) + (titleRight ? titleRight.offsetWidth : 100);
    }

    // ============= Utility functions =============
    function round(val) {
      try {
        var v = parseFloat(val);
        if (typeof val === "string") {
          var r = val.substring(val.length - 1);
          if (isNaN(+r)) return Math.round(v) + r;
        }
        return Math.round(v);
      } catch(e) { console.error(e); }
      return val;
    }

    function parseNumber(v) {
      var n = parseFloat(v);
      if (typeof v === "string") {
        var r = v.substring(v.length - 1).toUpperCase();
        switch(r) { case "K": n *= 1000; break; case "M": n *= 1000000; break; case "G": n *= 1000000000; break; }
      }
      return n;
    }

    function color2rgba(color, alpha) {
      if (color.substr(0, 4) === "rgba") {
        var m = /\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((.|\d)+)\s*\)/.exec(color);
        if (m) color = "#" + padLeft((+m[1]).toString(16), '0', 2) + padLeft((+m[2]).toString(16), '0', 2) + padLeft((+m[3]).toString(16), '0', 2);
        else return color;
      } else if (color[0] !== "#") return color;
      var red = parseInt(color.substr(1, 2), 16);
      var green = parseInt(color.substr(3, 2), 16);
      var blue = parseInt(color.substr(5, 2), 16);
      return "rgba(" + red + "," + green + "," + blue + "," + (alpha / 100) + ")";
    }

    // ============= Computed =============
    const myDps = computed(function() { return yourData.value.dps || 0; });
    const currentSeries = computed(function() { return option.series[currentSeriesIndex.value]; });
    const showColumnHeader = computed(function() {
      if (currentSeries.value.showColumnHeader != null) return currentSeries.value.showColumnHeader;
      return option.showColumnHeader;
    });
    const orderBy = computed(function() {
      try {
        if (currentSeries.value.orderBy != null) {
          return { sortColumn: currentSeries.value.columns[currentSeries.value.orderBy].value, orderAsc: currentSeries.value.orderAsc };
        }
        return null;
      } catch(e) { return { sortColumn: "dps", orderAsc: false }; }
    });
    const titleNextLine = computed(function() { return bodyWidth.value < titleWidth.value; });
    const dataBarHeight = computed(function() {
      return option.dataBarStyle === 'line' ? (option.dataBarHeight || 2) + "px" : "1.5em";
    });
    const containerStyle = computed(function() {
      return {
        fontSize: option.fontSize + 'px',
        'background-color': option.colors.background,
        'font-family': option.fontFamily.all,
        color: 'white',
        'text-shadow': '0px 0px 3px #DAA520',
        'line-height': 1.6,
        'border-radius': '8px',
        'margin-right': '8px',
        padding: '3px'
      };
    });

    // ============= Sorting =============
    function sortCombatants(list) {
      var ob = orderBy.value;
      if (ob) {
        var sortCol = ob.sortColumn;
        var asc = ob.orderAsc;
        list.sort(function(a, b) {
          var va = parseNumber(a[sortCol]), vb = parseNumber(b[sortCol]);
          if (isNaN(va) || isNaN(vb)) { va = a[sortCol]; vb = b[sortCol]; }
          if ((asc && va > vb) || (!asc && va < vb)) return 1;
          if ((asc && va < vb) || (!asc && va > vb)) return -1;
          return 0;
        });
        combatant_max.value = list[asc ? list.length - 1 : 0];
        myOrder.value = list.indexOf(yourData.value) + 1;
      }
      if (option.orderByJob) {
        list.sort(function(a, b) {
          var va = a.name === 'YOU' ? -1 : jobSort[a.Job];
          var vb = b.name === 'YOU' ? -1 : jobSort[b.Job];
          if (va === vb) return a.name < b.name ? -1 : 1;
          return va - vb;
        });
      }
    }

    function getJobColor(job) {
      if (!job) return "#ffffff";
      var alpha = option.backgroundAlpha;
      if (option.useJobColor) {
        return color2rgba(option.jobColor[job] || "#ffffff", alpha);
      }
      return color2rgba(option.colors[jobType[job]] || "#ffffff", alpha);
    }

    function getPercentWidth(c) {
      try {
        var sc = orderBy.value.sortColumn;
        var asc = orderBy.value.orderAsc;
        return Math.round((parseNumber(c[sc]) / parseNumber(combatant_max.value[sc])) * 10000) / 100;
      } catch(e) { return 0; }
    }

    function changeDataType(i) {
      if (currentSeriesIndex.value !== i) {
        currentSeriesIndex.value = i;
        var list = combatants.value.slice();
        sortCombatants(list);
        combatants.value = list;
      }
    }

    // ============= Settings popup =============
    function openSetting() {
      if (settingWindow && !settingWindow.closed) { settingWindow.focus(); return; }
      localStorage.setItem("CCINO_DPS_OPTION", JSON.stringify(option));
      var base = window.location.href.split('#')[0];
      settingWindow = window.open(base + '#/dps/setting', '_blank',
        'height=800,innerHeight=800,width=960,innerWidth=960,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
      if (settingPollTimer) clearInterval(settingPollTimer);
      settingPollTimer = setInterval(function() {
        if (!settingWindow || settingWindow.closed) {
          clearInterval(settingPollTimer);
          settingPollTimer = null;
          settingWindow = null;
          var newOption = getOption(JSON.parse(localStorage.getItem("CCINO_DPS_OPTION")));
          Object.keys(option).forEach(function(k) { delete option[k]; });
          Object.keys(newOption).forEach(function(k) { option[k] = newOption[k]; });
          var list = combatants.value.slice();
          sortCombatants(list);
          combatants.value = list;
        }
      }, 300);
    }

    // ============= Data update =============
    function update(e) {
      encounter.value = e.Encounter || {};
      isActive.value = e.isActive || false;
      var list = [];
      if (e.Combatant) {
        for (var i in e.Combatant) {
          var c = e.Combatant[i];
          if ((option.showLimitBreak || c.name !== "Limit Break") && !isNaN(+c.dps)) {
            if (c.Job && c.Job.length >= 1) c.Job = c.Job.substr(0, 1).toUpperCase() + c.Job.substr(1);
            list.push(c);
          }
        }
      }
      yourData.value = (e.Combatant && e.Combatant.YOU) || {};
      sortCombatants(list);
      combatants.value = list;
    }

    // ============= Data sources =============
    var currentEvent = null;
    var timer = null;
    var ws = null;

    function handleEvent(e) { currentEvent = e; }

    onMounted(function() {
      // Polling timer
      timer = setInterval(function() {
        if (currentEvent) {
          update(currentEvent.detail);
          nextTick(updateBodySize);
          currentEvent = null;
        }
      }, 1000);

      // WebSocket
      var uri = /[?&]HOST_PORT=(wss?:\/\/[^&\/]+)/.exec(location.search);
      uri = uri && uri[1];
      if (uri) {
        if (uri === 'ws://:10501') uri = 'ws://localhost:10501';
        uri += '/MiniParse';
        ws = new WebSocket(uri);
        ws.onmessage = function(e) {
          if (e.data === '.') return;
          var d;
          try { d = JSON.parse(e.data); } catch(err) { console.error(err, e.data); return; }
          if (d.type === 'broadcast' && d.msgtype === "CombatData") {
            currentEvent = { detail: d.msg };
          }
        };
        ws.onerror = function(e) { ws.close(); console.error(e); };
      } else {
        document.addEventListener("onOverlayDataUpdate", handleEvent);
      }

      document.addEventListener("onOverlayStateUpdate", function(e) {
        resizable.value = !e.detail.isLocked;
      });

      if (window.addOverlayListener) {
        addOverlayListener('CombatData', function(e) {
          var dps = parseFloat(e.Encounter.encdps);
          if (dps <= 0 || dps === Infinity) return;
          currentEvent = { detail: e };
        });
      }

      // Resize
      window.addEventListener('resize', updateBodySize);
      updateBodySize();

      // Test data
      if (window.testdata) {
        update(testdata.detail || testdata);
        document.body.style.backgroundColor = "black";
      }
    });

    onUnmounted(function() {
      if (timer) clearInterval(timer);
      if (settingPollTimer) clearInterval(settingPollTimer);
      if (ws) ws.close();
      document.removeEventListener("onOverlayDataUpdate", handleEvent);
      window.removeEventListener('resize', updateBodySize);
    });

    return {
      option, containerStyle, resizable, encounter, combatants, myDps, myOrder,
      currentSeriesIndex, currentSeries, showColumnHeader, titleNextLine,
      dataBarHeight, miniStyle,
      round, getJobColor, getPercentWidth,
      openSetting, changeDataType,
      bodyWidth, titleWidth
    };
  }
};
