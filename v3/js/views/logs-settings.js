'use strict';

var LogsSettings = {
  template: `
    <div id="container" v-cloak>
      <div class="item">
        <div class="label">apiKey</div>
        <div class="value"><input type="text" v-model="option.apiKey"/></div>
      </div>
      <hr>
      <div class="item">
        <div class="label">字体大小</div>
        <div class="value"><input type="number" max="100" min="9" v-model="option.fontSize"/> px</div>
        <div class="label" style="width:150px;margin-left:50px;">背景透明度</div>
        <div class="value"><input type="range" max="100" min="0" v-model.number="backgroundAlpha"/>{{backgroundAlpha}}</div>
      </div>
      <hr>
      <div class="item">
        <div class="label" style="width:100px;">显示时间</div>
        <div class="value"><input type="number" min="1" v-model="option.logsInfoShownDuration" style="width:60px"/> 秒</div>
        <div class="label" style="margin-left:50px;">副本名宽度</div>
        <div class="value"><input type="range" max="70" min="0" v-model.number="option.logsInfoEncounterNameWidth"/>{{option.logsInfoEncounterNameWidth}}</div>
      </div>
      <hr>
      <div class="item">
        <div class="label">服务器</div>
        <div class="value">
          <select v-model="option.selectedServer">
            <option v-for="server in serverList" :value="server">{{server}}</option>
          </select>
        </div>
        <div class="label">区域副本</div>
        <div class="value">
          <select v-model="option.selectedZone">
            <option v-for="zone in zoneList" :value="zone">{{zoneName[zone.id]}}</option>
          </select>
        </div>
        <div class="value">
          <select v-model="option.selectedEncounter">
            <option v-for="encounter in option.selectedZone.encounters" :value="encounter">{{encounter.name}}</option>
          </select>
        </div>
      </div>
      <hr>
      <div class="item">
        <div class="label">前端显示配置</div>
        <div class="value"><label><input type="checkbox" v-model="option.settingOnFrontpage.server"/> 服务器</label></div>
        <div class="value"><label><input type="checkbox" v-model="option.settingOnFrontpage.zone"/> 副本区域</label></div>
      </div>
      <div class="item">
        <hr>
        <div class="label"></div>
        <div class="value">
          <button @click="save">保存</button>
          <button @click="revert">重置</button>
          <span style="margin:20px;"></span>
          <button @click="showImportOption">配置信息</button>
          <button @click="revertDefault">重置默认</button>
          <br>
          招待码【056x-ierk-k5xy-01hs】，登陆页面<a target="_blank" href='http://ff.sdo.com/entertain'>ff.sdo.com/entertain</a>，点击【被招待者】，在页面上输入招待码，马上结成招待关系！
        </div>
      </div>
      <div class="option-pad-mask" v-if="showOptionPad"></div>
      <div class="option-pad" v-if="showOptionPad" v-cloak>
        <span class="option-pad-close" @click="showOptionPad=false"></span>
        <textarea id="option_pad_textarea" v-model="optionStr" style="width:100%;height:calc(100% - 30px);resize:none"></textarea>
        <button @click="replaceOption" title="完全将配置替换为当前输入内容">覆盖配置</button>
        <button @click="importOption" title="将当前输入内容更新到当前配置中">导入配置</button>
        <span style="margin:20px;"></span>
        <button @click="selectAll">全选</button>
        <button @click="showOptionPad=false">关闭</button>
      </div>
    </div>
  `,
  setup() {
    const { ref, reactive, computed, nextTick } = Vue;

    var saved = localStorage.getItem("CCINO_LOGS_OPTION");
    var storedOption = saved ? JSON.parse(saved) : null;

    function copy(o) { return JSON.parse(JSON.stringify(o)); }

    var defaultOption = {
      fontSize: 13,
      colors: { background: "rgba(0,0,0,0.2)" },
      apiKey: "1dec8751508fa8e36cde7c53b550b69b",
      supportLogsInfo: true,
      logsInfoShownDuration: 10,
      logsInfoEncounterNameWidth: 30,
      logsInfoShowDetail: true,
      selectedZone: zoneList[zoneList.length - 4],
      selectedEncounter: zoneList[zoneList.length - 4].encounters[0],
      selectedServer: serverList[0],
      settingOnFrontpage: { server: true, zone: true }
    };

    var initOption = storedOption ? mergeObj(copy(defaultOption), storedOption) : copy(defaultOption);
    const option = reactive(initOption);
    const showOptionPad = ref(false);
    const optionStr = ref("");

    var backgroundAlpha = 30;
    if (initOption.colors && initOption.colors.background) {
      var match = /\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((.|\d)+)\s*\)/.exec(initOption.colors.background);
      if (match) backgroundAlpha = Math.round(Number(match[4]) * 100);
    }
    const bgAlpha = ref(backgroundAlpha);

    var originalOption = copy(initOption);

    function revertDefault() {
      var d = copy(defaultOption);
      Object.keys(d).forEach(function(k) { option[k] = d[k]; });
      bgAlpha.value = 30;
    }

    function selectAll() {
      var dom = document.getElementById("option_pad_textarea");
      if (dom) { dom.focus(); dom.select(); dom.scrollTo(0, 0); }
    }

    function showImportOptionFn() {
      optionStr.value = JSON.stringify(option, null, 2);
      showOptionPad.value = true;
      nextTick(function() { selectAll(); });
    }

    function replaceOption() {
      if (confirm("是否确认进行导入?\n导入后会完全替换为现有配置")) {
        try {
          var newOption = JSON.parse(optionStr.value);
          Object.keys(option).forEach(function(k) { delete option[k]; });
          Object.keys(newOption).forEach(function(k) { option[k] = newOption[k]; });
          alert("导入成功");
        } catch(e) {
          console.error(e);
          alert("该数据存在异常无法导入:\n" + ((typeof e == "string") ? e : ""));
        }
      }
    }

    function importOption() {
      if (confirm("是否确认进行导入?\n会将内容属性更新到现有配置中")) {
        try {
          var newOption = JSON.parse(optionStr.value);
          var merged = mergeObj(copy(option), newOption);
          Object.keys(merged).forEach(function(k) { option[k] = merged[k]; });
          alert("导入成功");
        } catch(e) {
          console.error(e);
          alert("该数据存在异常无法导入:\n" + ((typeof e == "string") ? e : ""));
        }
      }
    }

    function save() {
      var toSave = copy(option);
      if (!toSave.colors) toSave.colors = {};
      toSave.colors.background = "rgba(0,0,0," + (bgAlpha.value / 100) + ")";
      toSave._knownSetting = true;
      localStorage.setItem("CCINO_LOGS_OPTION", JSON.stringify(toSave));
      originalOption = copy(option);
    }

    function revert() {
      var saved = localStorage.getItem("CCINO_LOGS_OPTION");
      if (saved) {
        var o = JSON.parse(saved);
        Object.keys(o).forEach(function(k) { option[k] = o[k]; });
      }
    }

    return {
      option, showOptionPad, optionStr, backgroundAlpha: bgAlpha,
      save, revert, revertDefault, showImportOption: showImportOptionFn,
      replaceOption, importOption, selectAll,
      serverList: window.serverList,
      zoneList: window.zoneList,
      zoneName: window.zoneName
    };
  }
};
