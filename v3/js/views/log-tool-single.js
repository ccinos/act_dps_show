'use strict';

var LogToolSingle = {
  template: `
    <div id="container" :style="{fontSize:option.fontSize+'px', 'background-color':option.colors.background}" @dblclick="openSetting">
      <template v-if="option.settingOnFrontpage.server">
        <ccino-select :options="serverList" :modelValue="option.selectedServer" @update:modelValue="onServerChange" v-slot:prefix="slotProps">
          本地服务器:
        </ccino-select>
      </template>
      <template v-if="option.settingOnFrontpage.zone">
        <ccino-select :options="zoneList" :modelValue="option.selectedZone" @update:modelValue="onZoneChange">
          <template v-slot:prefix="slotProps">区域: </template>
          <template v-slot:default="slotProps">
            <span v-if="slotProps.modelValue.brackets"><small>{{slotProps.modelValue.brackets.min}}.0</small></span> {{zoneName[slotProps.modelValue.id]}}
          </template>
        </ccino-select>
        <ccino-select :options="option.selectedZone.encounters" :modelValue="option.selectedEncounter" @update:modelValue="onEncounterChange">
          <template v-slot:prefix="slotProps">BOSS: </template>
          <template v-slot:default="slotProps">{{slotProps.modelValue.name}}</template>
        </ccino-select>
      </template>
      <div v-if="logData&&logData.character" style="margin-top:30px;">
        <ul>
          <li style="flex: 0 0 80%;text-align: left;">{{logData.character.name}}❀{{logData.character.server}}</li>
          <li style="flex: 0 0 20%;text-align: center;"><span class="log-data" :class="getLogsGrade(logData.highestLog)">{{logData.highestLog||"无"}}</span></li>
        </ul>
        <template v-if="option.logsInfoShowDetail">
          <div class="title-border"></div>
          <ul v-for="(ranks, encounterName) in logData.rankings_format" :key="encounterName">
            <li :style="{flex: '0 0 '+(option.logsInfoEncounterNameWidth||30)+'%'}" style="text-align: left;">{{encounterName}}</li>
            <li class="log-data" :style="{flex: '0 0 '+(100-(option.logsInfoEncounterNameWidth||30))+'%'}">
              <span v-for="rank in ranks" style="white-space: nowrap; display: inline-block;">
                <img class="log-job-img" :src="'../icons/'+(rank.job||'Err')+'.png'" onerror="this.style.opacity='0'"/>
                <span :class="getLogsGrade(rank.logs)" class="log-data">{{rank.logs}}</span>
                &nbsp;
              </span>
            </li>
          </ul>
        </template>
      </div>
    </div>
  `,
  setup() {
    const { ref, reactive, computed, onMounted, onUnmounted, watch } = Vue;

    // Prepare zone list
    for (var zi = 0; zi < zoneList.length; zi++) {
      if (!zoneList[zi].encounters) zoneList[zi].encounters = [];
      zoneList[zi].encounters.unshift({ name: "<未选择>" });
    }
    zoneList.sort(function(a, b) { return b.id - a.id; });

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

    function copy(o) { return JSON.parse(JSON.stringify(o)); }
    function getOption(opt) { return mergeObj(copy(defaultOption), opt || {}); }

    var savedOption = localStorage.getItem("CCINO_LOGS_OPTION");
    savedOption = savedOption ? JSON.parse(savedOption) : null;
    const option = reactive(getOption(savedOption));
    const logData = ref({});

    var timer = null;
    var settingWindow = null;
    var settingPollTimer = null;

    var logsCache = {};

    function getLogsGrade(log) {
      var grades = [100, 99, 95, 75, 50, 25];
      for (var i = 0; i < grades.length; i++) {
        if (log >= grades[i]) return 'log-' + grades[i];
      }
      return 'log-9';
    }

    function tts(msg) {
      if (window.callOverlayHandler) {
        callOverlayHandler({ call: 'cactbotSay', text: msg });
      }
    }

    function getCharacterName(fullname) {
      for (var i = 0; i < serverList.length; i++) {
        var server = serverList[i];
        if (fullname.substr(fullname.length - server.length) === server) {
          return [fullname.substr(fullname.length - server.length), fullname.substr(0, fullname.length - server.length)];
        }
      }
      return [undefined, fullname];
    }

    function updateLogData(ld) {
      ld.rankings_format = {};
      for (var i = 0; i < ld.rankings.length; i++) {
        var ranking = ld.rankings[i];
        if (!ld.rankings_format[ranking.encounterName]) {
          ld.rankings_format[ranking.encounterName] = [];
        }
        ld.rankings_format[ranking.encounterName].push({
          logs: ranking.percentile,
          job: jobNameCnToType[ranking.spec],
          spec: ranking.spec
        });
      }
      logData.value = ld;
      resetLogShowTimer();
    }

    function resetLogShowTimer() {
      if (timer) { clearInterval(timer); timer = null; }
      timer = setInterval(function() {
        clearInterval(timer);
        timer = null;
        logData.value = {};
      }, Math.round((option.logsInfoShownDuration || 10) * 1000));
    }

    function getRankings(fullname, callback) {
      if (!fullname) return;
      fullname = getCharacterName(fullname);
      var serverName = fullname[0], characterName = fullname[1];
      var opt = option;
      if (!serverName) serverName = opt.selectedServer;
      var cacheKey = serverName + '_' + characterName + '_' + opt.selectedZone.id + '_' + opt.selectedEncounter.id;
      if (logsCache[cacheKey]) {
        var ld = logsCache[cacheKey];
        updateLogData(ld);
        if (callback instanceof Function) callback(ld);
        return;
      }
      var character = { name: characterName, server: serverName };
      var encServerName = encodeURIComponent(serverName);
      var encCharacterName = encodeURIComponent(characterName);
      var url = 'https://cn.fflogs.com/v1/rankings/character/' + encCharacterName + '/' + encServerName + '/CN?timeframe=historical&api_key=' + opt.apiKey;
      if (opt.selectedZone && opt.selectedZone.id) {
        url += "&zone=" + opt.selectedZone.id;
        if (opt.selectedEncounter && opt.selectedEncounter.id) {
          url += "&encounter=" + opt.selectedEncounter.id;
        }
      }
      axios.get(url).then(function(res) {
        var highestLog = 0;
        var rankings = [];
        for (var i = 0; i < res.data.length; i++) {
          var r = res.data[i];
          r.percentile = Math.round(r.percentile);
          if ((r.encounterID >= 65) && r.difficulty != 101) continue;
          rankings.push(r);
          if (r.percentile > highestLog) highestLog = r.percentile;
        }
        var ld = { character: character, rankings: rankings, highestLog: highestLog };
        logsCache[cacheKey] = ld;
        updateLogData(ld);
        if (callback instanceof Function) callback(ld);
      }).catch(function(err) {
        tts(character.name + ":未找到");
        console.log(err);
      });
    }

    window.checkLogs = function(fullname) {
      getRankings(fullname, function(ld) {
        var speakLog = ld.highestLog || "无log";
        tts(ld.character.name + ":" + speakLog);
      });
    };

    window.resetLogShowTimer = resetLogShowTimer;

    window.setLogInfoSupport = function() {
      if (window.removeOverlayListener) {
        removeOverlayListener('onLogEvent', logInfoCallback);
      }
      if (window.addOverlayListener) {
        addOverlayListener('onLogEvent', logInfoCallback);
      }
    };

    function logInfoCallback(e) {
      for (var i = 0; i < e.detail.logs.length; i++) {
        var logLine = e.detail.logs[i];
        var r = logLine.match(/([^:]*?)加入了小队/);
        if (!r) r = logLine.match(/00:0038:logs\s+([^:\s]*)/);
        if (r) window.checkLogs(r[1]);
      }
    }

    function openSetting() {
      if (settingWindow && !settingWindow.closed) { settingWindow.focus(); return; }
      localStorage.setItem("CCINO_LOGS_OPTION", JSON.stringify(option));
      var base = window.location.href.split('#')[0];
      settingWindow = window.open(base + '#/log-tool-single/setting', '_blank',
        'height=300,innerHeight=300,width=960,innerWidth=960,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
      if (settingPollTimer) clearInterval(settingPollTimer);
      settingPollTimer = setInterval(function() {
        if (!settingWindow || settingWindow.closed) {
          clearInterval(settingPollTimer);
          settingPollTimer = null;
          settingWindow = null;
          var newOption = getOption(JSON.parse(localStorage.getItem("CCINO_LOGS_OPTION")));
          Object.keys(option).forEach(function(k) { delete option[k]; });
          Object.keys(newOption).forEach(function(k) { option[k] = newOption[k]; });
          window.setLogInfoSupport();
          resetLogShowTimer();
        }
      }, 300);
    }

    function onServerChange(val) {
      option.selectedServer = val;
      saveOption();
    }
    function onZoneChange(val) {
      option.selectedZone = val;
      saveOption();
    }
    function onEncounterChange(val) {
      option.selectedEncounter = val;
      saveOption();
    }
    function saveOption() {
      localStorage.setItem("CCINO_LOGS_OPTION", JSON.stringify(option));
    }

    onMounted(function() {
      window.setLogInfoSupport();
    });

    onUnmounted(function() {
      if (timer) clearInterval(timer);
      if (settingPollTimer) clearInterval(settingPollTimer);
    });

    return {
      option, logData,
      serverList: window.serverList,
      zoneList: window.zoneList,
      zoneName: window.zoneName,
      openSetting, saveOption,
      onServerChange, onZoneChange, onEncounterChange,
      getLogsGrade
    };
  }
};
