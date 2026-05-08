'use strict';

function insertSort(arr, obj, handler) {
  if (!(handler instanceof Function)) handler = function(a, b) { return a.time < b.time; };
  for (var i = arr.length - 1; i >= 0; --i) {
    if (handler(arr[i], obj)) { arr.splice(i + 1, 0, obj); return i + 1; }
  }
  arr.splice(0, 0, obj);
  return 0;
}

var Timeline = {
  template: '#timeline-template',
  setup: function() {
    var vm = Vue;
    var ref = vm.ref, reactive = vm.reactive, computed = vm.computed, watch = vm.watch, nextTick = vm.nextTick, onMounted = vm.onMounted, onUnmounted = vm.onUnmounted;

    var copy = function(src, dest) {
      if (dest) { for (var p in src) { if (src.hasOwnProperty(p)) dest[p] = src[p]; } return dest; }
      return JSON.parse(JSON.stringify(src));
    };
    var TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * 60000;
    var skillNameIcon = { "翅膀": "武装戍卫", "幕帘": "圣光幕帘", "血仇": "雪仇", "雪仇(10)": "雪仇" };
    var autoSave = true;
    var svgContainer = null;

    function getFormat(time) { return time > 3600000 ? "h:mm:ss.fff" : "mm:ss.fff"; }
    function formatTime(time) {
      var h, m, s, f;
      if (time > 3600000) { h = Math.floor(time / 3600000); time -= h * 3600000; }
      if (time > 60000) { m = Math.floor(time / 60000); if (m < 10) m = "0" + m; time -= m * 60000; } else m = "00";
      if (time > 1000) { s = Math.floor(time / 1000); if (s < 10) s = "0" + s; time -= s * 1000; } else s = "00";
      f = padLeft(Math.floor(time) + "", "0", 3);
      return h > 0 ? (h + ":" + m + ":" + s + "." + f) : (m + ":" + s + "." + f);
    }

    // ===== DATA =====
    var versions = [
      { ver: "0.40", type: "update", date: "2026.05.08 17:00", info: "上了个新版本，以后会在新版更新，更新了技能数据，变更了架构，可能会有BUG。" },
    ];
    var defaultOption = { svg: { width: 1200, height: window.innerHeight - 20 }, skill: { cd: 20, cdOffset: 0, width: 20, duration: 20, durationOffset: 0, nameOffset: 10, margin: 20 } };

    var savedRaw = localStorage.getItem("CCINO_TIMELINE");
    if (savedRaw) { try { savedRaw = JSON.parse(savedRaw); } catch(e) { console.error(e); savedRaw = []; } } else savedRaw = [];

    const showPannel = ref(true);
    const setting = reactive({
      reserveCols: 1, showTimeBySecond: false, inputText: "", inputErrMsg: "",
      selectedSkill: null, selectedSkillType: null, lastSkillIsGcd: false,
      selectRangeComputeDmg: true, pressDeleteKeyDeleteSelectedObject: true,
      skillSet: { enable: false, x: 100, y: 100, selectedMark: null, markTime: 0, markText: "", markType: "short" },
      eventSet: { enable: false, x: 100, y: 100, event: {} },
      importLogEventFilterRegex: "攻击",
      skillSelectSet: { enable: false, jobName: "骑士", userDefinedSkill: { enable: false, name: null, cd: null, skillType: "gcd", duration: null, new: false }, selectedUserDefinedSkill: null, selectedSkills: { job: [], jobType: [], gcd: [] }, gcdDuration: 2.5 }
    });
    const option = reactive(copy(defaultOption));
    const userDefinedDatas = ["userDefinedSkills", "userDefinedjobTypeSkill", "userDefinedJobSkill", "skills", "gcdSkills", "setting", "gcdSetting", "timeline"];
    const userDefinedSkills = ref([]);
    const userDefinedjobTypeSkill = reactive({ 坦克: [], 奶妈: [], 近战: [], 远敏: [], 魔法: [] });
    const userDefinedJobSkill = reactive({});
    const sharingDatas = ["timeline", "gcdSetting", "gcdSkills", "skills"];
    const skills = ref([]);
    const gcdSkills = ref([]);
    const gcdSetting = reactive({ cd: 2.5, addIsInsert: false, dragAllMove: true, abilities: {}, skills: {}, buffs: {} });
    const timeline = reactive({ infoWidth: 500, length: 3000, offset: 50, events: [], skills: {}, gcd: [], abilities: [], buff: [], buffList: [] });
    const dials = reactive({ left: 0, settingTick: 60, tick: 10, tickRange: 10, minLineDistance: 70, maxTick: 120, lines: [], lastLineIndex: -1, mouseY: 0, selectedLineY: null, selectedRange: null, skillShown: null, top: 0, height: 2000 });
    const drag = reactive({ enable: false, lastY: -1, lastX: -1, movingData: null, movingSkillInfo: null, handler: { getTimeHandler: null, setTimeHandler: null, checkTimeHandler: null, mouseUpHandler: null }, dragingPickedSkill: { index: 0, type: null }, scrollingTo: null, scrolling: false });
    const hover = reactive({ rect: { enable: false, x: null, width: null, type: null, skillIndex: null } });
    const selectedDataIndex = ref(0);
    const newDataName = ref(null);
    const savedDatas = ref(savedRaw);
    const sharing = ref(null);
    const sharingText = ref(null);
    const tempSelectedActLogFile = ref(null);
    const tempParseDatas = ref(null);
    const tempImportDataTypes = reactive({ gcd: true, job: true, event: true });
    const tempParseDataEventSource = ref(null);
    const tempParseDatasSkillSet = reactive({ gcd: {}, job: {} });
    const tempImportActLogSet = reactive({ enable: false });
    const tempImportLogsSet = reactive({
      enable: false, code: "", selectedCode: "", loading: false,
      error: { status: null, error: "" },
      apiKey: "184a0cc2cd961346f91397dae0f38630",
      import: { job: true, gcd: true, event: true, begincast: false },
      importSource: { job: {}, gcd: {}, event: [] },
      report: { fights: null, selectedFight: null, players: null, targets: null, boss: null, npc: null, downloading: false, downloaded: false, downloadedCasts: null, downloadedEvents: null, parsedPlayerData: null },
      progress: { casts: 0, events: 0 }
    });
    const tempImportEventSet = reactive({ enable: false, text: "" });
    const tempHoverSkill = reactive({ enable: false, x: null, y: null, skill: {} });

    // ===== TIME HELPERS =====
    function time2y(time) { return time * dials.tick / 1000; }
    function y2time(y) { return y / dials.tick * 1000; }
    function second2y(sec) { return sec * dials.tick; }
    function time2yOffset(time) { return time2y(time) + timelineOffset.value; }

    // ===== FILTERS =====
    function timeFormat(time, fmt) {
      if (setting.showTimeBySecond || time < 0) return (Math.round(time) / 1000).toFixed(1);
      if (fmt) return new Date(time + TIME_ZONE_OFFSET).format(fmt);
      return formatTime(time);
    }
    function skillNameFilter(sn) { return sn ? sn.replace(/@.+/, "") : ""; }

    // ===== COMPUTED =====
    // 技能数据：优先取已加载的全局变量，否则通过 loadSkillData() 动态加载
    const jobSkillSetting = reactive(window.jobSkill || {});
    if (window.loadSkillData && !window.jobSkill) {
      window.loadSkillData().then(function(data) {
        for (var key in data.jobSkill) { jobSkillSetting[key] = data.jobSkill[key]; }
      });
    }
    const timelineOffset = computed(function() { return 50 + time2y(timeline.offset); });
    const allUserDefinedSkillMap = computed(function() {
      var m = {}; var uds = userDefinedSkills.value;
      for (var i = 0; i < uds.length; ++i) m[uds[i].name] = uds[i];
      return m;
    });
    const userDefinedJobSkillRef = computed(function() {
      var ref2 = {};
      for (var jn in jobSkillSetting) {
        var jt = jobSkillSetting[jn].type;
        var jsl = userDefinedJobSkill[jn] || { gcd: [], job: [] };
        var job = { type: jt, skills: { jobType: [], job: [], gcd: [] } };
        ref2[jn] = job;
        var jtsl = userDefinedjobTypeSkill[jt] || [];
        for (var i = jtsl.length - 1; i >= 0; --i) { var sn = jtsl[i], sk = allUserDefinedSkillMap.value[sn]; if (sk) job.skills.jobType.push(sk); else jtsl.splice(i, 1); }
        for (var i2 = jsl.job.length - 1; i2 >= 0; --i2) { var sn2 = jsl.job[i2], sk2 = allUserDefinedSkillMap.value[sn2]; if (sk2) job.skills.job.push(sk2); else jsl.job.splice(i2, 1); }
        for (var i3 = jsl.gcd.length - 1; i3 >= 0; --i3) { var sn3 = jsl.gcd[i3]; job.skills.gcd.push(allUserDefinedSkillMap.value[sn3] || { name: sn3 }); }
      }
      return ref2;
    });
    const skillOption = computed(function() { return { width: +option.skill.width, margin: +option.skill.margin, all: (+option.skill.width) + (+option.skill.margin) }; });
    const dialsLines = computed(function() {
      var top = dials.top - timelineOffset.value, height2 = dials.height, tick = dials.tick * dials.tickRange, lineIndex = Math.floor(top / tick);
      if (lineIndex !== dials.lastLineIndex) {
        dials.lastLineIndex = lineIndex;
        var y = lineIndex * tick, maxY = top + height2, lines = [];
        for (var i = 0; y <= maxY; y += tick) {
          var t = y / dials.tick * 1000, text = setting.showTimeBySecond || t < 0 ? (Math.round(t) / 1000).toFixed(1) : formatTime(t);
          lines.push({ i: i, y: y, text: text });
        }
        dials.lines = lines;
      }
      return [dials.lines, dials.miniLines];
    });
    const svgHeight = computed(function() { return timeline.length * dials.tick; });
    const shownSkillInfo = computed(function() {
      var infos = [];
      if (dials.skillShown && dials.skillShown.skillInfo != null) infos.push(dials.skillShown);
      if (drag.movingSkillInfo) infos.push({ skillInfo: drag.movingSkillInfo });
      if (setting.selectedSkill && setting.selectedSkill.skillInfo != null) infos.push(setting.selectedSkill);
      return infos;
    });

    // ===== SVG EVENT HANDLERS =====
    function onSvgMouseMove(e) {
      var rect = e.currentTarget.getBoundingClientRect();
      dials.mouseY = e.clientY - rect.top;
      var x = e.clientX - rect.left;
      if (x >= 70 && x < timeline.infoWidth - 10) {
        hover.rect.x = 70;
        hover.rect.width = timeline.infoWidth - 80;
        hover.rect.type = "event";
        hover.rect.enable = true;
      } else {
        var sw = skillOption.value.all;
        var iw = +timeline.infoWidth;
        if (x >= iw && x < iw + sw * (skills.value.length + setting.reserveCols)) {
          var colX = Math.floor((x - iw) / sw);
          hover.rect.skillIndex = colX - setting.reserveCols;
          hover.rect.type = "skill";
          hover.rect.x = iw + colX * sw - skillOption.value.margin / 2;
          hover.rect.width = skillOption.value.all;
          hover.rect.enable = true;
        } else {
          hover.rect.enable = false;
        }
      }
    }
    function onSvgScroll(e) {
      if (svgContainer) {
        dials.top = svgContainer.scrollTop;
        dials.left = svgContainer.scrollLeft;
        dials.height = svgContainer.clientHeight;
      }
    }
    function selectLine() { dials.selectedLineY = dials.mouseY; }
    function setTick(tick) {
      if (tick < 1) tick = 1;
      else if (tick > dials.maxTick) tick = dials.maxTick;
      var mouseT = y2time(dials.mouseY);
      var mouseY = dials.mouseY;
      var diffY = mouseY - (svgContainer ? svgContainer.scrollTop : 0);
      dials.tick = tick;
      dials.tickRange = Math.ceil(dials.minLineDistance / tick);
      var newMouseY = time2y(mouseT);
      var newScrollTop = newMouseY - diffY;
      if (newScrollTop >= 0 && svgContainer) {
        svgContainer.scroll(svgContainer.scrollLeft, newScrollTop);
        dials.mouseY = newMouseY;
      }
      dials.lastLineIndex = -1;
    }
    function onMouseWheelScale(e) {
      if (e.wheelDelta > 0) setTick(dials.tick * 1.2);
      else setTick(dials.tick * 0.8);
    }

    function onMouseDrag(e) {
      if (!drag.enable) return;
      if (e.type === "mouseup") {
        drag.enable = false;
        drag.lastY = -1;
        dials.skillShown = null;
        if (drag.handler.mouseUpHandler) drag.handler.mouseUpHandler(drag.movingData);
        drag.handler = {};
        drag.movingData = null; drag.movingSkillInfo = null;
        return;
      }
      if (!drag.handler.getTimeHandler || !drag.handler.setTimeHandler) return;
      var dy = e.offsetY - drag.lastY;
      var newTime = drag.handler.getTimeHandler(drag.movingData) + y2time(dy);
      if (drag.handler.checkTimeHandler && !drag.handler.checkTimeHandler(drag.movingData, newTime)) return;
      drag.handler.setTimeHandler(drag.movingData, newTime);
      drag.lastY = e.offsetY;
      var shownSkill = drag.movingSkillInfo || drag.movingData;
      dials.skillShown = shownSkill ? { skillInfo: shownSkill } : null;
      dials.lastLineIndex = -99999;
    }

    function onMouseDragSimple(e, data) {
      drag.enable = true; drag.lastY = e.offsetY; drag.movingData = data; drag.movingSkillInfo = null;
      drag.handler = { getTimeHandler: function(d) { return d.time; }, setTimeHandler: function(d, t) { d.time = t; }, mouseUpHandler: function() { dials.skillShown = null; } };
    }
    function onMouseDragSimpleCheck(e, data, checkTimeHandler) {
      drag.enable = true; drag.lastY = e.offsetY; drag.movingData = data; drag.movingSkillInfo = null;
      drag.handler = { getTimeHandler: function(d) { return d.time; }, setTimeHandler: function(d, t) { d.time = t; }, checkTimeHandler: checkTimeHandler, mouseUpHandler: function() { dials.skillShown = null; } };
    }
    function gcdOnMouseDrag(e, gcd, i) {
      drag.enable = true; drag.lastY = e.offsetY; drag.movingData = gcd; drag.movingSkillInfo = null;
      drag.handler = { getTimeHandler: function(d) { return d.time; }, setTimeHandler: function(d, t) { changeGcdTime(d, t, i, false); }, mouseUpHandler: function() { dials.skillShown = null; } };
    }
    function skillOnMouseDrag(skillInfo, skill, _use, e, skillIndex) {
      drag.enable = true; drag.lastY = e.offsetY; drag.movingData = skillInfo; drag.movingSkillInfo = skillInfo;
      drag.handler = { getTimeHandler: function(d) { return d.time; }, setTimeHandler: function(d, t) { d.time = t; }, checkTimeHandler: function(d, t) { return checkSkillTime(skill, t, skillIndex, true, skillInfo); }, mouseUpHandler: function() { dials.skillShown = null; } };
    }
    function skillDurationSliderOnMouseDrag(skillInfo, skill, _use, e, skillIndex) {
      if (!skill.durationSlideRange) { skillOnMouseDrag(skillInfo, skill, _use, e, skillIndex); return; }
      drag.enable = true; drag.lastY = e.offsetY; drag.movingData = skillInfo; drag.movingSkillInfo = null;
      drag.handler = { getTimeHandler: function(d) { return d.slideTime || 0; }, setTimeHandler: function(d, t) { var slideMs = y2time(t) - skillInfo.time; d.slideTime = Math.max(0, Math.min(slideMs, (skill.durationSlideRange || 0) * 1000)); }, mouseUpHandler: function() {} };
    }
    function scrollOnMouseDrag(e) {
      drag.enable = true; drag.lastY = e.offsetY; drag.scrolling = true; drag.movingSkillInfo = null;
      var scrollData = { oy: e.offsetY, ox: e.offsetX, dy: 0, dx: 0, scrollTop: svgContainer ? svgContainer.scrollTop : 0, scrollLeft: svgContainer ? svgContainer.scrollLeft : 0 };
      drag.movingData = scrollData;
      drag.handler = {
        getTimeHandler: function(d) { return d.scrollTop; },
        setTimeHandler: function(d, t) {
          d.dy = d.oy - drag.lastY;
          d.dx = d.ox - drag.lastX;
          d.scrollTop += d.dy;
          d.scrollLeft += d.dx;
          if (svgContainer) { svgContainer.scrollTop = d.scrollTop; svgContainer.scrollLeft = d.scrollLeft; }
        },
        mouseUpHandler: function(d) {
          drag.scrolling = false;
          var inertia = { y: d.dy * 1.2 };
          var timer = setInterval(function() {
            if (inertia) {
              inertia.y *= 0.97;
              d.scrollTop += inertia.y;
              if (svgContainer) svgContainer.scrollTop = d.scrollTop;
              if ((inertia.y <= 1 && inertia.y >= -1) || d.scrollTop <= 0) {
                clearInterval(timer);
              }
            } else {
              clearInterval(timer);
            }
          }, 30);
        }
      };
    }
    function selectTimeRange(e) {
      if (!setting.selectRangeComputeDmg) { drag.enable = false; return; }
      var rect = e.currentTarget.getBoundingClientRect();
      var y = e.clientY - rect.top + (svgContainer ? svgContainer.scrollTop : 0);
      dials.selectedRange = { y: y, oy: y, dmgAll: 0 };
      dials.skillShown = null;
      drag.enable = true; drag.lastY = e.offsetY; drag.movingData = null; drag.movingSkillInfo = null;
      drag.handler = { getTimeHandler: function() { return dials.selectedRange ? y2time(dials.selectedRange.y) : 0; }, setTimeHandler: function(d, t) { if (dials.selectedRange) dials.selectedRange.y = time2y(t); }, mouseUpHandler: computeSelectedRangeDmg };
      setTimeout(clearSelectRange);
    }
    function computeSelectedRangeDmg() {
      var range = dials.selectedRange;
      if (!range) return;
      var startTime = y2time(Math.min(range.y, range.oy) - timelineOffset.value);
      var endTime = y2time(Math.max(range.y, range.oy) - timelineOffset.value);
      var buffList = computeBuffList(startTime, endTime);
      timeline.buffList = buffList;
      var buffListData = { buffIndex: 0, buff: null, buffList: buffList };
      var dmgAll = 0;
      for (var i = 0; i < timeline.gcd.length; ++i) {
        var gcd = timeline.gcd[i];
        if (gcd.time < startTime) continue;
        if (gcd.time > endTime) break;
        var gcdSkill = gcdSkills.value[gcdSkills.value.findIndex(function(a) { return a.name === gcd.skill; })];
        computeCurrentBuff(buffListData, gcd);
        var dmg = computeLineDataDmg(gcd, timeline.gcd, gcdSkill, buffListData.buff, startTime, endTime);
        dmgAll += dmg;
      }
      for (var si = 0; si < skills.value.length; si++) {
        var skill = skills.value[si];
        if (skill.dmg > 0 || skill.dot > 0) {
          buffListData = { buffIndex: 0, buff: null, buffList: buffList };
          var tl = timeline.skills[skill.name];
          if (tl) {
            for (var i = 0; i < tl.length; ++i) {
              var lineData = tl[i];
              if (lineData.time < startTime) continue;
              if (lineData.time > endTime) break;
              computeCurrentBuff(buffListData, lineData);
              var dmg = computeLineDataDmg(lineData, tl, skill, buffListData.buff, startTime, endTime);
              dmgAll += dmg;
            }
          }
        }
      }
      range.dmgAll = dmgAll;
      buffListData = { buffIndex: 0, buff: null, buffList: buffList };
      for (var ei = 0; ei < timeline.events.length; ++ei) {
        var evt = timeline.events[ei];
        if (evt.time < startTime) continue;
        if (evt.time > endTime) continue;
        if (evt.dmg > 0) {
          var dmg = +evt.dmg;
          if (isNaN(dmg)) { evt.dmg = 0; continue; }
          if (evt.dmgType === "true") continue;
          computeCurrentBuff(buffListData, evt);
          var buff = buffListData.buff;
          if (buff && buff.reduceDmg instanceof Array) {
            var dmgPercent = 1;
            try {
              var sumReduce = function(p, c) { return Math.round((1 - (1 - p / 100) * (1 - c / 100)) * 10000) / 100; };
              dmgPercent = (1 - buff.reduceDmg.reduce(sumReduce, 0) / 100);
              if (evt.dmgType === "magic") {
                dmgPercent *= (100 - buff.reduceMagic.reduce(sumReduce, 0)) / 100;
              } else {
                dmgPercent *= (100 - buff.reduceNormal.reduce(sumReduce, 0)) / 100;
              }
            } catch (e) { console.error(e); }
            evt.reduceDmg = Math.round(dmg * (1 - dmgPercent) + (buff.addShield || 0));
            evt.trueDmg = Math.round(dmg * dmgPercent - (buff.addShield || 0));
          }
        }
      }
    }
    function computeBuffList(startTime, endTime) {
      var buffList = [];
      var props = ["increaseNormal", "increaseMagic", "increaseCri", "reduceDmg", "reduceMagic", "reduceNormal", "addShield"];
      var reduceProp = {};
      for (var pi = 0; pi < props.length; pi++) { if (props[pi].indexOf("reduce") !== -1) reduceProp[props[pi]] = true; }
      for (var si = 0; si < skills.value.length; si++) {
        var skill = skills.value[si];
        if (skill.duration > 0) {
          var skillData = {}, all = 0;
          for (var pi = 0; pi < props.length; pi++) { skillData[props[pi]] = skill[props[pi]] || 0; all += skillData[props[pi]]; }
          var duration = skill.duration * 1000;
          if (all === 0) continue;
          var line = timeline.skills[skill.name];
          if (!line) continue;
          for (var i = 0; i < line.length; ++i) {
            var lineData = line[i];
            if (lineData.time + duration < startTime || lineData.time > endTime) continue;
            var startBuff = { time: lineData.time };
            for (var pi = 0; pi < props.length; pi++) startBuff[props[pi]] = +skillData[props[pi]];
            insertSort(buffList, startBuff);
            if (lineData.time + duration <= endTime) {
              var endBuff = { time: lineData.time + duration };
              for (var pi = 0; pi < props.length; pi++) endBuff[props[pi]] = -skillData[props[pi]];
              insertSort(buffList, endBuff);
            }
          }
        }
      }
      if (buffList.length > 0) {
        var sumBuff = copy(buffList[0]);
        for (var pi = 0; pi < props.length; pi++) { if (reduceProp[props[pi]]) { sumBuff[props[pi]] = [sumBuff[props[pi]]]; buffList[0][props[pi]] = [buffList[0][props[pi]]]; } }
        for (var i = 1; i < buffList.length; ++i) {
          var buff = buffList[i];
          for (var pi = 0; pi < props.length; pi++) {
            if (reduceProp[props[pi]]) {
              if (buff[props[pi]] > 0) sumBuff[props[pi]].push(buff[props[pi]]);
              else { var bi = sumBuff[props[pi]].indexOf(-buff[props[pi]]); if (bi !== -1) sumBuff[props[pi]].splice(bi, 1); }
            } else sumBuff[props[pi]] += buff[props[pi]];
          }
          for (var pi = 0; pi < props.length; pi++) {
            if (reduceProp[props[pi]]) buff[props[pi]] = copy(sumBuff[props[pi]]);
            else buff[props[pi]] = sumBuff[props[pi]];
          }
        }
      }
      return buffList;
    }
    function clearSelectRange() {
      timeline.buffList = null;
      for (var i = 0; i < timeline.gcd.length; i++) { var gcd = timeline.gcd[i]; gcd.dmg = undefined; gcd.addDmg = undefined; }
      for (var sn in timeline.skills) {
        var tl = timeline.skills[sn];
        if (tl) { for (var i = 0; i < tl.length; i++) { var ld = tl[i]; ld.dmg = undefined; ld.addDmg = undefined; } }
      }
      for (var i = 0; i < timeline.events.length; i++) { var e = timeline.events[i]; e.reduceDmg = undefined; e.trueDmg = undefined; }
    }
    function computeLineDataDmg(lineData, timeline, skill, buff, startTime, endTime) {
      if (lineData.time < startTime) return 0;
      if (lineData.time > endTime) return 0;
      if (skill) {
        lineData.dmg = skill.dmg || 0;
        lineData.dmgType = skill.dmgType;
        lineData.dot = 0;
        if (skill.dot > 0) {
          var dotEndTime = Math.min(lineData.time + skill.duration * 1000, endTime);
          for (var j = 0; j < timeline.length; ++j) {
            var nextLineData = timeline[j];
            if (nextLineData.time > dotEndTime) break;
            if (nextLineData === lineData) continue;
            if (nextLineData.skill === lineData.skill) { dotEndTime = nextLineData.time - 1; break; }
          }
          var dotCount = Math.floor((dotEndTime - lineData.time) / 3000);
          lineData.dot = skill.dot * dotCount;
          lineData.dotCount = dotCount;
        }
        var addDmg = 0, addDot = 0;
        if (buff) {
          if (skill.dmgType === '物理') {
            addDmg = lineData.dmg * (buff.increaseNormal / 100);
            if (lineData.dotCount > 0) addDot = lineData.dot * (buff.increaseNormal / 100);
          } else if (skill.dmgType === '魔法') {
            addDmg = lineData.dmg * (buff.increaseMagic / 100);
            if (lineData.dotCount > 0) addDot = lineData.dot * (buff.increaseMagic / 100);
          }
          addDmg += lineData.dmg * ((buff.increaseCri / 100) * 0.35);
          if (lineData.dotCount > 0) addDot += lineData.dot * ((buff.increaseCri / 100) * 0.35);
        }
        lineData.addDmg = Math.floor(addDmg);
        lineData.addDot = Math.floor(addDot);
      }
      return (lineData.dmg || 0) + (lineData.addDmg || 0) + (lineData.addDot || 0) + (lineData.dot || 0);
    }
    function computeCurrentBuff(buffListData, lineData) {
      while (buffListData.buffList && buffListData.buffList[buffListData.buffIndex] && buffListData.buffList[buffListData.buffIndex].time < lineData.time) {
        buffListData.buff = buffListData.buffList[buffListData.buffIndex];
        ++buffListData.buffIndex;
      }
    }
    function skillOnHover(skillInfo, skill, enter) { dials.skillShown = enter ? { skillInfo: skillInfo, skill: skill } : null; }

    // ===== GCD/SKILL HELPERS =====
    function getGcdCd(name) { var s = gcdSetting.skills[name]; return s && s.cd ? Math.floor(s.cd * 100) * 10 : null; }
    function changeGcdTime(gcd, time, i, forceDown, dragAll) {
      if (forceDown) time = gcd.time;
      else if (time === gcd.time) return time;
      var up = time < gcd.time, down = !up;
      if ((up && i > 0) || (down && i < timeline.gcd.length - 1)) {
        var newI = up ? i - 1 : i + 1, g = timeline.gcd[newI];
        var cd = gcdSetting.cd * 1000, scd = getGcdCd(up ? timeline.gcd[i - 1].skill : gcd.skill);
        if (scd) cd = scd;
        if (down ? time >= g.time + (up ? cd : -cd) : time <= g.time + (up ? cd : -cd)) {
          if (gcdSetting.dragAllMove || dragAll) { if (changeGcdTime(g, time + (up ? -cd : cd), newI, false, dragAll) <= 0) return -1; }
          else return gcd.time;
        }
      } else if (time < 0 || time > timeline.length * 1000) return -1;
      gcd.time = time; return time;
    }
    function getLastGcdSkill(name, i, limit) { var cg = timeline.gcd[i]; if (!limit) limit = cg.time; for (--i; i >= 0; --i) { var g = timeline.gcd[i]; if (cg.time - g.time > limit) break; if (g.skill === name) return [g, i]; } }
    function getNextGcdSkill(name, i, limit) { var cg = timeline.gcd[i]; if (!limit) limit = timeline.gcd[timeline.gcd.length - 1].time; for (++i; i < timeline.gcd.length; ++i) { var g = timeline.gcd[i]; if (g.time - cg.time > limit) break; if (g.skill === name) return [g, i]; } }
    function addGcdSkill(name, isInsert) { var y = dials.selectedLineY || timelineOffset.value; var t = addGcdSkillAtTime(y2time(y - timelineOffset.value), name, isInsert); dials.selectedLineY = time2yOffset(t); return t; }
    function addGcdSkillAtTime(time, name, isInsert) {
      for (var i = 0, len = timeline.gcd.length; i < len; ++i) {
        var gcd = timeline.gcd[i], gd = gcdSetting.cd * 1000;
        if (gcd.time + gd < time) continue;
        if (time < gcd.time - gd) { if (getGcdCd(name)) { var ns = getNextGcdSkill(name, i, getGcdCd(name)); if (ns) { time = ns[0].time + getGcdCd(name); continue; } } break; }
        if (isInsert) {
          var diff = time - (gcd.time - gd), lastTime = time, lastCd = gd;
          for (; i < len; ++i) { gcd = timeline.gcd[i]; var dd = gcd.time - (lastTime + lastCd); lastTime = gcd.time; if (diff - dd <= 0) break; if (dd > 0) diff -= dd; gcd.time += diff; lastCd = Math.floor(((gcdSetting.skills[gcd.skill] || {}).cd || gcdSetting.cd || 2.5) * 100) * 10; }
          break;
        } else { time = gcd.time + gd; }
      }
      var ig = { time: time, skill: name };
      var idx = insertSort(timeline.gcd, ig, function(a, b) { return a.time < b.time; });
      if (isInsert) changeGcdTime(ig, 0, idx, true, true);
      return time;
    }
    function deleteGcd(i) { timeline.gcd.splice(i, 1); }
    function getGcdIcon(name) { return "../icons/skill/" + (name ? name.replace(/@.+/, "") : "unknown") + ".png"; }
    function getSkillIcon(skill) {
      if (!skill) return;
      if (skill.icon) return skill.icon;
      var n = (skillNameIcon[skill.name] || skill.fullname || skill.name || "").replace(/@.+/, "");
      return "../icons/skill/" + n + ".png";
    }

    // ===== SKILL MANAGEMENT =====
    function savePicked() {
      var sel = setting.skillSelectSet.selectedSkills;
      skills.value = copy(sel.job);
      gcdSkills.value = copy(sel.gcd);
      gcdSetting.skills = {};
      for (var i = 0; i < gcdSkills.value.length; i++) gcdSetting.skills[gcdSkills.value[i].name] = gcdSkills.value[i];
      var d = +setting.skillSelectSet.gcdDuration;
      if (!isNaN(d)) gcdSetting.cd = d;
      for (var name in timeline.skills) { if (skills.value.findIndex(function(e) { return e.name === name; }) === -1) delete timeline.skills[name]; }
      setting.skillSelectSet.enable = false;
      saveUserDefinedData();
    }
    function unpickSkill(i, t) { setting.skillSelectSet.selectedSkills[t].splice(i, 1); }
    function pickSkill(skill, t) {
      skill = copy(skill);
      if (skill.name) skill.name = skill.name.replace(/@.+/, "");
      var name = skill.name;
      if (t === "gcd") { if (setting.skillSelectSet.selectedSkills.gcd.findIndex(function(a) { return a.name === name; }) !== -1) return; }
      else { t = "job"; if (!name) return; while (setting.skillSelectSet.selectedSkills.job.findIndex(function(a) { return a.name === name; }) !== -1) { name = prompt("技能重复，请输入一个别名:", name); if (!name) return; } skill.fullname = skill.name; skill.name = name; }
      setting.skillSelectSet.selectedSkills[t].push(skill);
    }
    function onSkillHover(skill, e) { tempHoverSkill.enable = true; var nx = e.x + 10; if (nx + 320 >= window.innerWidth) nx = window.innerWidth - 320; tempHoverSkill.x = nx; tempHoverSkill.y = e.y + 10; tempHoverSkill.skill = skill; }
    function onMouseRightClickInPickedSkill(skill) { var n = prompt("请输入一个别名:", skill.name); if (!n) return; while (setting.skillSelectSet.selectedSkills.job.findIndex(function(a) { return a.name === n; }) !== -1) { n = prompt("名称重复，请输入一个别名:", n); if (!n) return; } if (!skill.fullname) skill.fullname = skill.name; skill.name = n; }
    function pickedSkillDrag(e, i, type) { drag.dragingPickedSkill.index = i; drag.dragingPickedSkill.type = type; }
    function pickedSkillDrop(e, i, type) { if (type !== drag.dragingPickedSkill.type) return; var oi = drag.dragingPickedSkill.index; if (i !== oi) { var s = setting.skillSelectSet.selectedSkills[type].splice(oi, 1); if (i > oi) --i; setting.skillSelectSet.selectedSkills[type].splice(i, 0, s[0]); } setting.skillSelectSet.selectedSkills[type] = setting.skillSelectSet.selectedSkills[type].filter(function(a) { return a; }); }
    function selectUserDefinedSkill(skill, t) { setting.skillSelectSet.userDefinedSkill = {}; copy(skill, setting.skillSelectSet.userDefinedSkill); setting.skillSelectSet.userDefinedSkill.enable = true; setting.skillSelectSet.userDefinedSkill.new = false; setting.skillSelectSet.selectedUserDefinedSkill = skill; }
    function addNewUserDefinedSkill() { setting.skillSelectSet.userDefinedSkill = { enable: true, name: null, cd: null, fullname: null, skillType: setting.skillSelectSet.userDefinedSkill.skillType, duration: null, new: true }; }
    function cancelSaveUserDefinedSkill() { setting.skillSelectSet.userDefinedSkill.enable = false; setting.skillSelectSet.userDefinedSkill.new = false; setting.skillSelectSet.selectedUserDefinedSkill = null; }
    function saveNewUserDefinedSkill() {
      var name = setting.skillSelectSet.userDefinedSkill.name;
      if (!name) { alert("请输入技能名"); return; }
      var uss = userDefinedSkills.value, ussFn = function(a) { return a.name === name; };
      if (setting.skillSelectSet.userDefinedSkill.new) {
        if (uss.findIndex(ussFn) !== -1) { alert("技能名不能重复"); return; }
        uss.push(copy(setting.skillSelectSet.userDefinedSkill));
      } else if (setting.skillSelectSet.selectedUserDefinedSkill) {
        var sk = setting.skillSelectSet.selectedUserDefinedSkill;
        if (uss.findIndex(function(a) { return a.name === name && a !== sk; }) !== -1) { alert("技能名不能重复"); return; }
        copy(setting.skillSelectSet.userDefinedSkill, sk);
        var delFn = function(l) { var idx = l.findIndex(function(e) { return e === sk.name; }); if (idx >= 0) l.splice(idx, 1); };
        for (var jtn in userDefinedjobTypeSkill) delFn(userDefinedjobTypeSkill[jtn]);
        for (var jn in userDefinedJobSkill) { var js = userDefinedJobSkill[jn]; delFn(js.job); delFn(js.gcd); }
        sk.name = name;
      }
      var st = setting.skillSelectSet.userDefinedSkill.skillType, jbn = setting.skillSelectSet.jobName;
      if (st === "jobType") { var jt2 = (jobSkillSetting[jbn] || {}).type; if (!userDefinedjobTypeSkill[jt2]) userDefinedjobTypeSkill[jt2] = []; userDefinedjobTypeSkill[jt2].push(name); }
      else { if (!userDefinedJobSkill[jbn]) userDefinedJobSkill[jbn] = { job: [], gcd: [] }; userDefinedJobSkill[jbn][st].push(name); }
      setting.skillSelectSet.userDefinedSkill.name = "";
      cancelSaveUserDefinedSkill(); saveUserDefinedData();
    }
    function saveUserDefinedData() {
      if (!autoSave) return;
      var d = {};
      d.userDefinedSkills = copy(userDefinedSkills.value);
      d.userDefinedjobTypeSkill = copy(userDefinedjobTypeSkill);
      d.userDefinedJobSkill = copy(userDefinedJobSkill);
      d.skills = copy(skills.value);
      d.gcdSkills = copy(gcdSkills.value);
      d.setting = copy(setting);
      d.gcdSetting = copy(gcdSetting);
      d.timeline = copy(timeline);
      localStorage.setItem("CCINO_TIMELINE_USERDEFINED_DATA", JSON.stringify(d));
    }

    // ===== EVENT/SKILL SELECTION =====
    function cancelAllSelect() { setting.selectedSkillType = null; setting.selectedSkill = null; setting.eventSet = { enable: false, x: 100, y: 100, event: {} }; setting.skillSet = { enable: false, x: 100, y: 100, selectedMark: null, markTime: 0, markText: "", markType: "short" }; dials.selectedLineY = null; dials.selectedRange = null; }
    function onSelectSkillType(skill, i) { cancelAllSelect(); setting.selectedSkillType = skill; }
    function onSelectSkill(skillInfo, skill, i, evt) { cancelAllSelect(); setting.selectedSkill = { skillInfo: skillInfo, skill: skill }; Object.assign(setting.skillSet, { enable: true, selectedMark: null, markTime: 0, x: evt.x + option.skill.width, y: evt.y + 20 }); }
    function onSkillRightClick(skillInfo, skill, i) { if (setting.selectedSkill && skillInfo === setting.selectedSkill.skillInfo) setting.selectedSkill = null; }
    function deleteSelectedSkill() {
      if (!setting.selectedSkill) return;
      var sk = setting.selectedSkill.skill, sl = timeline.skills[sk.name];
      var i = sl.findIndex(function(a) { return a === setting.selectedSkill.skillInfo; });
      if (i >= 0) { sl.splice(i, 1); if (sk.count > 1) checkSkillTime(sk, sl[i].time, i, true, sl[i]); }
      cancelAllSelect();
    }
    function onEventClick(e, evt) { cancelAllSelect(); Object.assign(setting.eventSet, { enable: true, x: 100, y: evt.y + 20, event: e }); }
    function deleteSelectedEvent() { if (setting.eventSet.event) { var i = timeline.events.findIndex(function(ev) { return ev === setting.eventSet.event; }); if (i >= 0) timeline.events.splice(i, 1); setting.eventSet = { enable: false, x: 100, y: 100, event: {} }; } }
    function onSelectMark(m) { setting.selectedSkill.selectedMark = m; setting.skillSet.markType = m.type; setting.skillSet.markTime = m.time; setting.skillSet.markText = m.text; }
    function addMarkOnSkill(skillInfo, time, text, type) {
      if (!skillInfo) { alert("请选择一个具体的技能"); return; }
      if (time == null) time = 0; if (text == null) text = ""; if (type == null) type = "short";
      if (setting.selectedSkill.selectedMark) Object.assign(setting.selectedSkill.selectedMark, { time: time, text: text, type: type });
      else { if (!skillInfo.marks) skillInfo.marks = []; skillInfo.marks.push({ time: time, text: text, type: type }); }
    }
    function checkAbilityTime(time, name) {
      var ability = gcdSetting.abilities[name] || {};
      var offsetTime = (ability.cd || 0) * 1000;
      var maxTime = time + offsetTime;
      for (var i = 0; i < timeline.abilities.length; ++i) {
        var abil = timeline.abilities[i];
        if (abil.ability !== name) continue;
        var startTime = abil.time;
        var endTime = startTime + offsetTime;
        if ((time >= startTime && time <= endTime) || (startTime >= time && startTime <= maxTime)) return false;
        if (maxTime < startTime) break;
      }
      return true;
    }
    function computeSkillTimeCount(skill, time, i, lastSkillData) {
      var s = { time: time };
      if (!skill) return s;
      if (skill.count > 1) {
        var cd = skill.cd * 1000;
        if (lastSkillData || i > 0) {
          var list = timeline.skills[skill.name];
          var lastSkillData = lastSkillData || list[i - 1];
          if (lastSkillData) {
            var diffTime = time - lastSkillData.time;
            diffTime -= lastSkillData.remainToAdd || 0;
            if (diffTime > 0) {
              var addCount = Math.floor(diffTime / cd) + 1 + (lastSkillData.count || 0);
              diffTime = diffTime % cd;
              if (addCount >= skill.count) {
                s.count = skill.count - 1;
                s.remainToAdd = cd;
              } else {
                s.count = addCount - 1;
                s.remainToAdd = cd - diffTime;
              }
            } else {
              s.remainToAdd = -diffTime;
              s.count = (lastSkillData.count || 0) - 1;
            }
          }
        } else {
          s.count = (skill.count - 1);
          s.remainToAdd = cd;
        }
      }
      return s;
    }
    function checkSkillCount(skill, data, i) {
      if (data.count >= 0) {
        var list = timeline.skills[skill.name];
        var newList = {};
        while (i < list.length) {
          var s = list[i];
          var newData = computeSkillTimeCount(skill, s.time, i, data);
          newList[i] = newData;
          if (newData.count >= skill.count) break;
          if (newData.count < 0) return false;
          data = newData;
          ++i;
        }
        for (var ni in newList) list[ni] = newList[ni];
        return true;
      }
      return false;
    }
    function checkSkillTime(skill, time, index, indexThis, originData) {
      var skills = timeline.skills[skill.name];
      if (!skills) return false;
      var lastSkill = skills[index - 1] || { time: -timeline.offset };
      var nextSkill = skills[indexThis ? index + 1 : index] || { time: 99999999 };
      if (time <= lastSkill.time || time > nextSkill.time) return false;
      if (skill.count > 1) {
        var insertData = computeSkillTimeCount(skill, time, index);
        if (checkSkillCount(skill, insertData, indexThis ? index + 1 : index)) {
          if (originData) mergeObj(originData, insertData);
          return true;
        }
        return false;
      }
      if (!skill.cd) return true;
      var offsetTime = skill.cd * 1000;
      if (index >= 1) {
        var lastSkill = skills[index - 1];
        if (time < lastSkill.time + offsetTime) return false;
      }
      if (indexThis) ++index;
      if (index < skills.length) {
        var timeEnd = time + offsetTime;
        var nextSkill = skills[index];
        if (nextSkill.time < timeEnd) return false;
      }
      return true;
    }

    // ===== EVENT INSERT =====
    function onClearInput() { setting.inputText = ""; setting.inputErrMsg = ""; }
    function enterEvent() { if (insertEvent(setting.inputText)) { setting.inputText = ""; setting.inputErrMsg = ""; } else setting.inputErrMsg = "格式错误"; }
    function insertEvent(lineStr) {
      var reg = /^\s*(\d+)[:：](\d{1,2})([.:：](\d+))?\s+(.*)/.exec(lineStr);
      if (reg) { var min = +reg[1], sec = +reg[2], millis = +reg[4], info = reg[5]; if (isNaN(min)) min = 0; if (isNaN(sec)) sec = 0; if (isNaN(millis)) millis = 0; var time = millis + sec * 1000 + min * 60 * 1000; if (info) info = info.trim(); if (info) { insertSort(timeline.events, { time: time, text: info }, function(a, b) { return a.time < b.time; }); return true; } }
    }
    function insertSkill(skillName, time) {
      var skill = null;
      for (var i = 0; i < skills.value.length; i++) { if (skills.value[i].name === skillName) { skill = skills.value[i]; break; } }
      if (!skill) return false;
      if (!timeline.skills[skillName]) timeline.skills[skillName] = [];
      var list = timeline.skills[skillName];
      if (!skill.cd) { insertSort(list, { time: time }); return true; }
      var index = list.findIndex(function(e) { return e.time > time; });
      if (index === -1) index = list.length;
      var insertData = { time: time };
      if (checkSkillTime(skill, time, index, false, insertData)) {
        insertSort(list, insertData);
        return true;
      }
      return false;
    }
    function insertNew() {
      if (hover.rect.enable) {
        if (dials.mouseY) {
          var time = y2time(dials.mouseY - timelineOffset.value);
          if (hover.rect.type === "event") {
            var text = prompt("输入事件内容", "");
            if (text) {
              insertSort(timeline.events, { time: time, text: text }, function(a, b) { return a.time < b.time; });
            }
          } else if (hover.rect.type === "skill" && hover.rect.skillIndex >= 0) {
            var skill = skills.value[hover.rect.skillIndex];
            if (skill) insertSkill(skill.name, time);
          }
        }
      }
    }

    // ===== ALIGN / BATCH =====
    function alignToStart(type) {
      if (!dials.selectedLineY) return;
      var time = y2time(dials.selectedLineY - timelineOffset.value), lists = [];
      if (type === "gcd") lists = [timeline.gcd];
      else if (type === "job") { for (var p in timeline.skills) lists.push(timeline.skills[p]); }
      else if (type === "event") lists = [timeline.events];
      for (var li = 0; li < lists.length; li++) { var arr = lists[li]; for (var i = 0; i < arr.length; ++i) { var td = arr[i], nt = td.time - time; if (nt < 0) arr.splice(i--, 1); else td.time = nt; } }
    }
    function batchExportEvent() { var lines = []; for (var i = 0; i < timeline.events.length; i++) lines.push(formatTime(timeline.events[i].time) + " " + timeline.events[i].text); tempImportEventSet.text = lines.join("\n"); }
    function batchImportEvent() { var lines = tempImportEventSet.text.split("\n"), count = 0; for (var i = 0; i < lines.length; ++i) { if (insertEvent(lines[i])) ++count; } alert("导入成功" + count + "条"); tempImportEventSet.enable = false; }
    function batchExportSkill() { var lines = []; for (var sn in timeline.skills) { var sl = timeline.skills[sn]; for (var i = 0; i < sl.length; i++) insertSort(lines, { time: sl[i].time, text: sn }); } tempImportEventSet.text = lines.map(function(d) { return (setting.showTimeBySecond ? (d.time / 1000).toFixed(1) : formatTime(d.time)) + ' "' + d.text + '"'; }).join("\n"); }
    function batchImportSkill() {
      var lines = tempImportEventSet.text.split("\n"), count = 0;
      for (var i = 0; i < lines.length; ++i) {
        var ls = lines[i], match = /^\s*(\d+)[:：](\d{1,2})([.:：](\d+))?\s+\"(.+)\"/.exec(ls);
        if (match) { var min = +match[1], sec = +match[2], millis = +match[4], skn = match[5]; if (isNaN(min)) min = 0; if (isNaN(sec)) sec = 0; if (isNaN(millis)) millis = 0; var t = millis + sec * 1000 + min * 60 * 1000; if (skn && insertSkill(skn.trim(), t)) ++count; }
        else { var sp = ls.split(" "), t2 = +sp[0], skn2 = sp[1]; if (!skn2 || isNaN(t2)) continue; if (insertSkill(skn2.replace('"', "").replace('"', "").trim(), t2 * 1000)) ++count; }
      }
      alert("导入成功" + count + "条"); tempImportEventSet.enable = false;
    }

    // ===== ACT IMPORT =====
    function parseActLogFile() {
      var file = document.getElementById("actfile").files[0];
      if (!file) { alert("请选择文件"); return; }
      var reader = new FileReader();
      reader.onload = function() {
        var i = 0, j = this.result.indexOf("\n"), datas = {}, dataList = {}, allPlayers = {}, count = 0, startTime = 0, endTime;
        var se = {}; for (var si = 0; si < skills.value.length; si++) se[skills.value[si].fullname || skills.value[si].name] = true;
        var gse = {}; for (var si = 0; si < gcdSkills.value.length; si++) gse[gcdSkills.value[si].fullname || gcdSkills.value[si].name] = true;
        var regex = /21\|(.{33})\|\w{8}\|([^|]+)\|\w+\|([^|]+)\|/;
        while (j !== -1) {
          var line = this.result.substring(i, j);
          if (line.substr(0, 3) === "21|") { var m = regex.exec(line);
            if (m) { var time = +new Date(m[1]); if (count === 0) startTime = time; endTime = time; var player = m[2], skill = { time: time, name: m[3] };
              if (!datas[player]) datas[player] = { gcd: [], job: [], gcdCount: {}, jobCount: {} };
              if (!allPlayers[player]) allPlayers[player] = 0; ++allPlayers[player];
              if (se[skill.name]) { datas[player].job.push(skill); if (!datas[player].jobCount[skill.name]) datas[player].jobCount[skill.name] = 0; ++datas[player].jobCount[skill.name]; }
              if (gse[skill.name]) { datas[player].gcd.push(skill); if (!datas[player].gcdCount[skill.name]) datas[player].gcdCount[skill.name] = 0; ++datas[player].gcdCount[skill.name]; }
              if (!dataList[player]) dataList[player] = []; dataList[player].push(skill); ++count; } }
          i = j + 1; j = this.result.indexOf("\n", i);
        }
        var players = []; for (var p in datas) players.push(p);
        tempParseDatas.value = { dataList: dataList, startTime: startTime, endTime: endTime, startTimeCurrent: startTime, endTimeCurrent: endTime, datas: datas, players: players, allPlayers: allPlayers };
        var ss = { gcd: {}, job: {} };
        if (players.length > 0) {
          function fmsp(skill, type) { var n = skill.fullname || skill.name, mc = 0, mp = players[0]; for (var pi = 0; pi < players.length; pi++) { var cnt = (tempParseDatas.value.datas[players[pi]] || {})[type + "Count"] || {}; if ((cnt[n] || 0) > mc) { mc = cnt[n] || 0; mp = players[pi]; } } return mp; }
          for (var si = 0; si < skills.value.length; si++) ss.job[skills.value[si].fullname || skills.value[si].name] = fmsp(skills.value[si], "job");
          for (var si = 0; si < gcdSkills.value.length; si++) ss.gcd[gcdSkills.value[si].fullname || gcdSkills.value[si].name] = fmsp(gcdSkills.value[si], "gcd");
          Object.keys(ss.job).forEach(function(k) { tempParseDatasSkillSet.job[k] = ss.job[k]; });
          Object.keys(ss.gcd).forEach(function(k) { tempParseDatasSkillSet.gcd[k] = ss.gcd[k]; });
        }
      };
      reader.readAsText(file);
    }
    function importActLogFile() {
      if (!confirm("是否确认导入？")) return;
      timeline.gcd = []; timeline.skills = {};
      var sns = {}; for (var si = 0; si < skills.value.length; si++) sns[skills.value[si].fullname || skills.value[si].name] = skills.value[si].name;
      var st = +tempParseDatas.value.startTimeCurrent, et = +tempParseDatas.value.endTimeCurrent;
      for (var player in tempParseDatas.value.datas) {
        var data = tempParseDatas.value.datas[player], props = [];
        if (tempImportDataTypes.job) props.push("job"); if (tempImportDataTypes.gcd) props.push("gcd");
        for (var pi = 0; pi < props.length; pi++) {
          var prop = props[pi];
          for (var si2 = 0; si2 < data[prop].length; si2++) { var s = data[prop][si2]; if (s.time > et) break; if (s.time < st) continue; var sk = copy(s); sk.time -= st; var n = sns[sk.name]; if (n && n !== sk.name) { sk.fullname = sk.name; sk.name = n; } if (tempParseDatasSkillSet[prop][sk.name] === player) { if (prop === "gcd") insertSort(timeline.gcd, { time: sk.time, skill: sk.name }); else { if (!timeline.skills[n]) timeline.skills[n] = []; insertSort(timeline.skills[n], sk); } } }
        }
      }
      if (tempImportDataTypes.event && tempParseDataEventSource.value && tempParseDataEventSource.value.length > 0) {
        for (var pi2 = 0; pi2 < tempParseDataEventSource.value.length; pi2++) { var p = tempParseDataEventSource.value[pi2], cclt = {}, sl = tempParseDatas.value.dataList[p]; for (var si3 = 0; si3 < sl.length; si3++) { var s2 = sl[si3]; if (s2.time > et) break; if (s2.time < st) continue; if (s2.name === "攻击" || s2.time < (cclt[s2.name] || 0) + 1000) continue; cclt[s2.name] = s2.time; var sk2 = copy(s2); sk2.time -= st; timeline.events.push({ time: sk2.time, text: p + " 施放 [" + sk2.name + "]" }); } }
      }
      if (et - st > timeline.length * 1000) timeline.length = (et - st) / 1000 + 100;
      tempImportActLogSet.enable = false;
    }

    // ===== LOGS IMPORT =====
    function downLoadLogsData() {
      var r = tempImportLogsSet.report; r.selectedFight = null; tempImportLogsSet.error = {}; tempImportLogsSet.loading = true; cancelCurrentDownload();
      var code = tempImportLogsSet.code, m = /reports\/(\w+)#/.exec(code); if (m) code = m[1]; if (!code) { tempImportLogsSet.error = { error: "请输入LOGS战斗记录的CODE" }; return; }
      tempImportLogsSet.selectedCode = code;
      axios.get("https://cn.fflogs.com/v1/report/fights/" + code + "?api_key=" + tempImportLogsSet.apiKey).then(function(res) {
        tempImportLogsSet.loading = false; r.fights = res.data; r.fights.fights.reverse(); r.players = []; r.boss = []; r.targets = []; r.npc = [];
        for (var i = 0; i < r.fights.friendlies.length; i++) { var f = r.fights.friendlies[i]; if (f.type !== "LimitBreak") { r.players[f.id] = f; r.targets[f.id] = f; } }
        for (var i = 0; i < r.fights.enemies.length; i++) { var f = r.fights.enemies[i]; if (f.type === "Boss") { r.boss[f.id] = f; r.targets[f.id] = f; } else if (f.type === "NPC") { r.npc[f.id] = f; r.targets[f.id] = f; } }
        tempImportLogsSet.error = {};
      }).catch(function(err) { tempImportLogsSet.error = err.response.data; tempImportLogsSet.loading = false; });
    }
    function cancelCurrentDownload() { var r = tempImportLogsSet.report; r.downloading = false; r.downloaded = false; tempImportLogsSet.progress.casts = 0; tempImportLogsSet.progress.events = 0; }
    function downloadSelectedFight() {
      var r = tempImportLogsSet.report, f = r.selectedFight; if (!f) return;
      r.downloading = true; var code = tempImportLogsSet.selectedCode, st = f.start_time, et = f.end_time, ap = tempImportLogsSet.apiKey;
      tempImportLogsSet.progress.casts = 0; tempImportLogsSet.progress.events = 0; tempImportLogsSet.importSource = { job: {}, gcd: {}, event: [] };
      function gpd(start, hostility, cb, translate, dl) { if (!r.downloading) throw "停止下载"; if (!start) start = 0; if (hostility == null) hostility = 0; if (!dl) dl = []; if (cb) cb(start, st, et); var u = "https://cn.fflogs.com/v1/report/events/casts/" + code + "?hostility=" + hostility + "&start=" + start + "&end=" + et + "&api_key=" + ap; if (translate) u += "&translate=true"; return axios.getUseCache(u).then(function(res) { var d = res.data; dl.push(d); if (d.nextPageTimestamp) return gpd(d.nextPageTimestamp, hostility, cb, translate, dl); else { if (cb) cb(et, st, et); return dl; } }); }
      var pj = [];
      if (tempImportLogsSet.import.job || tempImportLogsSet.import.gcd) pj.push(gpd(st, 0, function(cur, s, e) { tempImportLogsSet.progress.casts = Math.round((cur - s) / (e - s) * 100); }).then(function(d) { r.downloadedCasts = d; }));
      if (tempImportLogsSet.import.event) pj.push(gpd(st, 1, function(cur, s, e) { tempImportLogsSet.progress.events = Math.round((cur - s) / (e - s) * 100); }).then(function(d) { r.downloadedEvents = d; }));
      Promise.all(pj).then(function() { parseDownloadedLogFight(); }).catch(function(e) { console.error(e); r.downloading = false; r.downloaded = false; tempImportLogsSet.error.error = e; });
    }
    function parseDownloadedLogFight() {
      var r = tempImportLogsSet.report, f = r.selectedFight, ie = tempImportLogsSet.import, isrc = tempImportLogsSet.importSource, st = f.start_time, hbc = ie.begincast;
      r.parsedPlayerData = {}; for (var i = 0; i < r.targets.length; i++) { var p = r.targets[i]; if (p) r.parsedPlayerData[p.id] = { events: [], job: {}, gcd: {} }; }
      var stc = {}, ct = { cast: "施放", begincast: "开始读条" }, dict = r.fights.lang !== "cn" ? (window.skillLangDict || {})[r.fights.lang] || {} : {};
      var reg; try { reg = new RegExp(setting.importLogEventFilterRegex || "攻击"); } catch(e) { reg = /攻击/; }
      for (var dsi = 0; dsi < 2; dsi++) {
        var type = dsi, datas = dsi === 0 ? r.downloadedCasts : r.downloadedEvents; if (!datas) continue;
        for (var dli = 0; dli < datas.length; dli++) { var dList = datas[dli];
          for (var di = 0; di < dList.events.length; di++) { var d = dList.events[di];
            if (d.type === "cast" || (hbc && d.type === "begincast")) { var sn = d.ability.name, usn = sn.toUpperCase(); if (dict[usn]) sn = dict[usn].name; if (!sn || reg.test(sn)) continue;
              if (!stc[d.sourceID]) stc[d.sourceID] = {}; if (d.timestamp < (stc[d.sourceID][sn] || 0) + 1000) continue; stc[d.sourceID][sn] = d.timestamp;
              var time = d.timestamp - st;
              if (type === 1 && ie.event) { if (r.boss[d.sourceID] || r.npc[d.sourceID]) r.parsedPlayerData[d.sourceID].events.push({ time: time, castType: d.type, skillName: sn, text: r.targets[d.sourceID].name + " " + ct[d.type] + " [" + sn + "]" }); }
              if (type === 0 && (ie.job || ie.gcd)) {
                for (var si2 = 0; si2 < skills.value.length; si2++) { if ((skills.value[si2].fullname || skills.value[si2].name) === sn) { if (!r.parsedPlayerData[d.sourceID].job[skills.value[si2].name]) r.parsedPlayerData[d.sourceID].job[skills.value[si2].name] = []; insertSort(r.parsedPlayerData[d.sourceID].job[skills.value[si2].name], { time: time }); } }
                for (var si2 = 0; si2 < gcdSkills.value.length; si2++) { if ((gcdSkills.value[si2].fullname || gcdSkills.value[si2].name) === sn) { if (!r.parsedPlayerData[d.sourceID].gcd[gcdSkills.value[si2].name]) r.parsedPlayerData[d.sourceID].gcd[gcdSkills.value[si2].name] = []; insertSort(r.parsedPlayerData[d.sourceID].gcd[gcdSkills.value[si2].name], { time: time, skill: gcdSkills.value[si2].name }); } }
              }
            }
          }
        }
      }
      for (var si2 = 0; si2 < skills.value.length; si2++) { var mc = 0, mp = null; for (var pi in r.parsedPlayerData) { var pd = r.parsedPlayerData[pi], l = pd.job[skills.value[si2].name]; if (l && l.length > mc) { mc = l.length; mp = pi; } } isrc.job[skills.value[si2].name] = mp; }
      for (var si2 = 0; si2 < gcdSkills.value.length; si2++) { var mc = 0, mp = null; for (var pi in r.parsedPlayerData) { var pd = r.parsedPlayerData[pi], l = pd.gcd[gcdSkills.value[si2].name]; if (l && l.length > mc) { mc = l.length; mp = pi; } } isrc.gcd[gcdSkills.value[si2].name] = mp; }
      isrc.event = []; for (var bi = 0; bi < r.boss.length; bi++) { if (r.boss[bi]) isrc.event.push(r.boss[bi].id); }
      r.downloaded = true;
    }
    function importSelectedFight() {
      if (tempImportLogsSet.import.event) timeline.events = [];
      if (tempImportLogsSet.import.job) timeline.skills = {}; if (tempImportLogsSet.import.gcd) timeline.gcd = [];
      var r = tempImportLogsSet.report, isrc = tempImportLogsSet.importSource;
      for (var ti = 0; ti < 2; ti++) { var td = ti === 0 ? "job" : "gcd"; if (!tempImportLogsSet.import[td]) continue;
        for (var sn in isrc[td]) { var pi = isrc[td][sn]; if (!pi) continue; var l = (r.parsedPlayerData[pi] || {})[td][sn]; if (l) { for (var li = 0; li < l.length; li++) { if (td === "job") { if (!timeline.skills[sn]) timeline.skills[sn] = []; insertSort(timeline.skills[sn], l[li]); } else insertSort(timeline.gcd, l[li]); } } }
      }
      if (tempImportLogsSet.import.event) { for (var ei = 0; ei < isrc.event.length; ei++) { var evs = (r.parsedPlayerData[isrc.event[ei]] || {}).events; if (evs) for (var eii = 0; eii < evs.length; eii++) insertSort(timeline.events, evs[eii]); } }
      alert("导入成功"); cancelCurrentDownload(); tempImportLogsSet.enable = false;
    }

    // ===== DATA PERSISTENCE =====
    function getAllData() { var d = {}; d.timeline = copy(timeline); d.gcdSetting = copy(gcdSetting); d.gcdSkills = copy(gcdSkills.value); d.skills = copy(skills.value); return d; }
    function dataSave() {
      var d = getAllData();
      if (newDataName.value && newDataName.value.length > 0) { d.name = newDataName.value; savedDatas.value.push(d); selectedDataIndex.value = savedDatas.value.length - 1; newDataName.value = ""; localStorage.setItem("CCINO_TIMELINE", JSON.stringify(savedDatas.value)); }
      else if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) { d.name = savedDatas.value[selectedDataIndex.value].name; savedDatas.value[selectedDataIndex.value] = d; localStorage.setItem("CCINO_TIMELINE", JSON.stringify(savedDatas.value)); }
    }
    function dataLoad(silent) {
      if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) {
        var d = copy(savedDatas.value[selectedDataIndex.value]);
        timeline.events = d.timeline.events || []; timeline.gcd = d.timeline.gcd || []; timeline.skills = d.timeline.skills || {}; timeline.infoWidth = d.timeline.infoWidth || 500; timeline.length = d.timeline.length || 3000;
        gcdSetting.cd = d.gcdSetting.cd || 2.5; gcdSetting.addIsInsert = d.gcdSetting.addIsInsert || false; gcdSetting.dragAllMove = d.gcdSetting.dragAllMove || true; gcdSetting.abilities = d.gcdSetting.abilities || {}; gcdSetting.skills = d.gcdSetting.skills || {};
        gcdSkills.value = d.gcdSkills || []; skills.value = d.skills || [];
      } else if (!silent) alert("请选择一个存档");
    }
    function dataDelete() {
      if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) { if (confirm("是否确认删除该存档[" + savedDatas.value[selectedDataIndex.value].name + "]?")) { savedDatas.value.splice(selectedDataIndex.value, 1); localStorage.setItem("CCINO_TIMELINE", JSON.stringify(savedDatas.value)); } }
      else alert("请选择一个存档");
    }
    function clearAll() {
      if (confirm("此功能将清除全部保存的数据，用于不明情况造成的白屏错误。是否继续？")) {
        var input = prompt("将清除此页面全部数据，输入 DEL 确认");
        if (!input) return;
        if (input.toLowerCase() === "del") {
          localStorage.clear();
          autoSave = false;
          alert("数据已清除");
          location.reload();
        }
      }
    }
    function dataShare() { sharing.value = true; if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) sharingText.value = JSON.stringify(savedDatas.value[selectedDataIndex.value], null, 2); }
    function clearData() { sharingText.value = ""; }
    function importData() { try { var d = JSON.parse(sharingText.value); savedDatas.value.push(d); sharing.value = false; alert("导入成功"); localStorage.setItem("CCINO_TIMELINE", JSON.stringify(savedDatas.value)); } catch(e) { alert("数据格式不正确"); } }
    function isRegex(re) { try { new RegExp(re); return true; } catch(e) { return false; } }
    function init() { svgContainer = document.getElementById("svg_container"); }

    function loadUserDefinedData() {
      var d = localStorage.getItem("CCINO_TIMELINE_USERDEFINED_DATA");
      if (!d) return;
      try { d = JSON.parse(d); if (!d) return; } catch(e) { console.error(e); return; }
      if (d.userDefinedSkills) userDefinedSkills.value = d.userDefinedSkills;
      if (d.userDefinedjobTypeSkill) { Object.keys(d.userDefinedjobTypeSkill).forEach(function(k) { userDefinedjobTypeSkill[k] = d.userDefinedjobTypeSkill[k]; }); }
      if (d.userDefinedJobSkill) { Object.keys(d.userDefinedJobSkill).forEach(function(k) { userDefinedJobSkill[k] = d.userDefinedJobSkill[k]; }); }
      if (d.skills) skills.value = d.skills;
      if (d.gcdSkills) gcdSkills.value = d.gcdSkills;
      if (d.setting) { Object.keys(d.setting).forEach(function(k) { setting[k] = d.setting[k]; }); }
      if (d.gcdSetting) { Object.keys(d.gcdSetting).forEach(function(k) { gcdSetting[k] = d.gcdSetting[k]; }); }
      if (d.timeline) { timeline.events = d.timeline.events || []; timeline.gcd = d.timeline.gcd || []; timeline.skills = d.timeline.skills || {}; }
      var sel = setting.skillSelectSet.selectedSkills;
      for (var k in sel) sel[k] = sel[k].filter(function(a) { return a; });
    }

    // ===== LIFECYCLE =====
    onMounted(function() {
      loadUserDefinedData();
      dials.lastLineIndex = -99999;
      init();
      setting.reserveCols = 1;

      window.addEventListener("beforeunload", saveUserDefinedData);
      window.addEventListener("resize", function() { option.svg.height = window.innerHeight - 20; });

      document.addEventListener('keydown', function(evt) {
        var code = evt.code; if (!code) return;
        var sc = code.substr(0, 5);
        if (sc === "Digit") code = code.substr(5);
        else if (sc === "Numpa") { var r = code.substr(6); code = r && r.length === 1 ? "Num " + r : "Num " + evt.key; }
        else if (sc === "Arrow") code = code.substr(5);
        else { code = evt.key; if (code.length === 1) code = code.toUpperCase(); }
        var str = (evt.ctrlKey ? "Ctrl+" : "") + (evt.shiftKey ? "Shift+" : "") + (evt.altKey ? "Alt+" : "") + code;
        if (evt.key !== "Control" && evt.key !== "Shift" && evt.key !== "Alt") console.log(str);
        if (str === "Delete" && setting.pressDeleteKeyDeleteSelectedObject) { if (setting.eventSet.event) deleteSelectedEvent(); if (setting.selectedSkill) deleteSelectedSkill(); }
        return false;
      }, false);
    });

    // ===== RETURN =====
    return {
      versions, showPannel, setting, jobSkillSetting, option,
      userDefinedJobSkillRef, skillOption, timeline, dials, drag, hover,
      selectedDataIndex, newDataName, savedDatas, sharing, sharingText,
      skills, gcdSkills, gcdSetting, userDefinedJobSkill, userDefinedjobTypeSkill, userDefinedSkills,
      temp: {
        hoverSkill: tempHoverSkill, selectedActLogFile: tempSelectedActLogFile,
        parseDatas: tempParseDatas, importDataTypes: tempImportDataTypes,
        parseDataEventSource: tempParseDataEventSource, parseDatasSkillSet: tempParseDatasSkillSet,
        importActLogSet: tempImportActLogSet, importLogsSet: tempImportLogsSet,
        importEventSet: tempImportEventSet
      },
      timelineOffset, dialsLines, svgHeight, shownSkillInfo,
      time2y, y2time, second2y, time2yOffset,
      timeFormat, skillNameFilter, getSkillIcon, getGcdIcon,
      onSvgMouseMove, onSvgScroll, selectLine, onMouseWheelScale,
      onMouseDrag, onMouseDragSimple, onMouseDragSimpleCheck, gcdOnMouseDrag, skillOnMouseDrag,
      skillDurationSliderOnMouseDrag, scrollOnMouseDrag, selectTimeRange,
      computeSelectedRangeDmg, skillOnHover, cancelAllSelect,
      onSelectSkillType, onSelectSkill, onSkillRightClick, deleteSelectedSkill,
      onEventClick, deleteSelectedEvent, onSelectMark, addMarkOnSkill,
      onClearInput, enterEvent, insertEvent, insertNew, insertSkill,
      savePicked, unpickSkill, pickSkill, onSkillHover, onMouseRightClickInPickedSkill,
      pickedSkillDrag, pickedSkillDrop, selectUserDefinedSkill,
      addNewUserDefinedSkill, cancelSaveUserDefinedSkill, saveNewUserDefinedSkill,
      saveUserDefinedData, checkSkillTime, checkAbilityTime,
      computeSkillTimeCount, checkSkillCount,
      alignToStart, batchExportEvent, batchImportEvent, batchExportSkill, batchImportSkill,
      parseActLogFile, importActLogFile,
      downLoadLogsData, cancelCurrentDownload, downloadSelectedFight,
      parseDownloadedLogFight, importSelectedFight,
      addGcdSkill, addGcdSkillAtTime, deleteGcd, changeGcdTime, getGcdCd, getLastGcdSkill, getNextGcdSkill,
      dataSave, dataLoad, dataDelete, clearAll, dataShare, clearData, importData, getAllData,
      init, isRegex, setTick
    };
  }
};
