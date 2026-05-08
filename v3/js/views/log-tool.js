'use strict';

var LogTool = {
  template: `
    <div id="container" :style="{fontSize:option.fontSize+'px', 'background-color':option.colors.background}">
      <div v-if="logData&&logData.character">
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
                <img class="log-job-img"
                  :src="'../icons/'+(rank.job||'Err')+'.png'"
                  onerror="this.style.opacity='0'"/>
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
    const { ref, reactive, onMounted, onUnmounted } = Vue;
    var defaultOption = {
      fontSize: 13,
      colors: { background: "rgba(0,0,0,0.2)" },
      supportLogsInfo: true,
      logsInfoShownDuration: 10,
      logsInfoEncounterNameWidth: 30,
      logsInfoShowDetail: true,
    };
    var savedOption = localStorage.getItem("CCINO_DPS_OPTION");
    if (savedOption) savedOption = JSON.parse(savedOption);
    var mergedOption = mergeObj(JSON.parse(JSON.stringify(defaultOption)), savedOption || {});

    const option = reactive(mergedOption);
    const logData = ref({});
    var timer = null;

    function getLogsGrade(log) {
      var grades = [100, 99, 95, 75, 50, 25];
      for (var i = 0; i < grades.length; i++) {
        if (log >= grades[i]) return 'log-' + grades[i];
      }
      return 'log-9';
    }

    function resetLogShowTimer() {
      if (timer) { clearInterval(timer); timer = null; }
      timer = setInterval(function() {
        clearInterval(timer);
        timer = null;
        logData.value = {};
      }, Math.round((option.logsInfoShownDuration || 10) * 1000));
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

    window.resetLogShowTimer = resetLogShowTimer;

    window.setLogInfoSupport = function() {
      if (window.addOverlayListener) {
        addOverlayListener('onLogEvent', logInfoCallback);
      }
    };

    function logInfoCallback(e) {
      for (var i = 0; i < e.detail.logs.length; i++) {
        var r = e.detail.logs[i].match('^CCINO_LOG_TOOL_INFO:(.*)');
        if (r) updateLogData(JSON.parse(r[1]));
      }
    }

    onMounted(function() {
      window.setLogInfoSupport();
    });

    onUnmounted(function() {
      if (timer) clearInterval(timer);
    });

    return { option, logData, getLogsGrade };
  }
};
