'use strict';

var SimpleTimeline = {
  template: `
    <div id="container" style="padding:10px;">
      <div class="share-container" v-if="sharing">
        <button class="btn btn-success" @click="importData">导入</button>
        <button class="btn btn-default" @click="clearData">清空</button>
        <button class="btn btn-danger" @click="sharing=false">关闭</button>
        <textarea class="form-control" style="width:100%;height:90%;resize:none;margin-top:10px;">{{sharingText}}</textarea>
      </div>
      <select class="form-control" style="width:260px;display:inline-block;" v-model="selectedDataIndex">
        <option v-for="(data, i) in savedDatas" :value="i">
          {{data.name}} (技能{{data.skills.length}} 事件{{data.timeline.length}})
        </option>
      </select>
      <input class="form-control" style="width:100px;display:inline-block;" v-model="newDataName" placeholder="新名称">
      <button class="btn btn-success" @click="dataSave">保存</button>
      <button class="btn btn-primary" @click="dataLoad">读取</button>
      <button class="btn btn-danger" @click="dataDelete">删除</button>
      <button class="btn btn-info" @click="dataShare">分享</button>
      <span style="margin-left:50px">
        技能冲突处理：
        <select class="form-control" style="width:260px;display:inline-block;" v-model="howToDoOnConflict">
          <option value="0">提醒</option>
          <option value="1">取消冲突技能</option>
          <option value="2">忽略本次设置</option>
        </select>
      </span>
      <span>时间轴安排高级版已发布：<a href="#/timeline">点击进入</a></span>
      <table class="table table-striped table-hover table-bordered" style="margin-top:10px;">
        <tr>
          <td width="100px">时间</td>
          <td width="500px">事件</td>
          <td width="120px" v-for="(skill, i) in skills">
            <div style="position:relative;">
              {{skill.name}} <button class="btn btn-xs btn-danger del-btn" @click="delSkill(skill, i)">X</button>
              <div class="desc">
                <template v-if="skill.duration">{{skill.duration}} /</template>
                {{skill.cd}}
              </div>
            </div>
          </td>
          <td width="150px">
            <input title="技能名称" v-model="newSkill.name" class="form-control" placeholder="+ 新技能" @keydown.enter="enterNewSkill">
          </td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">
            <input class="form-control" @keydown.enter="enterLine" placeholder="0:00 开始" v-model="inputText" @blur="inputErrMsg=''">
            <span v-if="inputErrMsg" style="color:red;">{{inputErrMsg}}</span>
          </td>
          <td v-for="skill in skills">
            <div class="skill-info">
              <div><input title="持续时间" min="0" class="form-control" v-model.number="skill.duration"></div>
              <div><input title="冷却时间" min="0" class="form-control" v-model.number="skill.cd" @change="onSkillChange(skill)"></div>
            </div>
          </td>
          <td>
            <div class="skill-info">
              <div><input title="持续时间" min="0" class="form-control" v-model.number="newSkill.duration" placeholder="持续" @keydown.enter="enterNewSkill"></div>
              <div><input title="冷却时间" min="0" class="form-control" v-model.number="newSkill.cd" placeholder="冷却" @keydown.enter="enterNewSkill"></div>
            </div>
          </td>
        </tr>
        <tr v-for="(line, index) in timeline">
          <td>
            <div class="time-col">
              {{timeFormat(line.time)}}
              <button class="btn btn-xs btn-danger del-btn" @click="delLine(index)">X</button>
            </div>
          </td>
          <td @dblclick="modifyLineTitle(line)">{{line.title}}</td>
          <td v-for="skill in skills" class="skill-info">
            <div class="skill-info">
              <div title="持续状态" class="skill-info-show"
                :class="{'skill-duration':line.actions[skill.name]&&line.actions[skill.name].duration>0}">&nbsp;</div>
              <div title="冷却状态" class="skill-info-show"
                :class="{'skill-active':line.actions[skill.name]&&line.actions[skill.name].use,
                  'skill-invalid':line.actions[skill.name]&&!line.actions[skill.name].use&&line.actions[skill.name].cd>0}"
                @click="useSkill(line, skill, index)">&nbsp;</div>
            </div>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  `,
  setup() {
    const { ref, reactive, onMounted } = Vue;

    function copy(data) { return JSON.parse(JSON.stringify(data)); }
    function saveToStorage(alldata) { localStorage.setItem("CCINO_SIMPLE_TIMELINE", JSON.stringify(alldata)); }
    function loadFromStorage() {
      var data = localStorage.getItem("CCINO_SIMPLE_TIMELINE");
      if (data) {
        try { data = JSON.parse(data); } catch(e) { console.error(e); data = []; }
      } else { data = []; }
      return data;
    }

    var defaultSkills = [
      { name: "铁壁", cd: 90, duration: 20 },
      { name: "预警", cd: 120, duration: 10 },
      { name: "血仇", cd: 60, duration: 5 }
    ];

    function timeFormat(time) {
      var d = new Date(time);
      return window.formatDate(d, "mm:ss.fff");
    }

    const sharing = ref(false);
    const sharingText = ref("");
    const selectedDataIndex = ref(0);
    const newDataName = ref("");
    const howToDoOnConflict = ref("0");
    const savedDatas = ref(loadFromStorage());
    const timeline = ref(copy([
      { time: 0, type: "event", title: "开始", actions: {} }
    ]));
    const skills = ref(copy(defaultSkills));
    const inputErrMsg = ref("");
    const inputText = ref("");
    const newSkill = reactive({ name: "", cd: null, duration: null });

    function getAllData() {
      return { timeline: copy(timeline.value), skills: copy(skills.value) };
    }

    function dataSave() {
      if (newDataName.value && newDataName.value.length > 0) {
        var d = copy(getAllData());
        d.name = newDataName.value;
        savedDatas.value.push(d);
        selectedDataIndex.value = savedDatas.value.length - 1;
        newDataName.value = "";
        saveToStorage(savedDatas.value);
      } else {
        if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) {
          var nm = savedDatas.value[selectedDataIndex.value].name;
          var sd = copy(getAllData());
          savedDatas.value[selectedDataIndex.value] = sd;
          sd.name = nm;
          saveToStorage(savedDatas.value);
        }
      }
    }

    function dataLoad(silent) {
      if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) {
        var sd = copy(savedDatas.value[selectedDataIndex.value]);
        timeline.value = sd.timeline;
        skills.value = sd.skills;
      } else {
        if (!silent) alert("请选择一个存档");
      }
    }

    function dataDelete() {
      if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) {
        var sd = savedDatas.value[selectedDataIndex.value];
        if (confirm("是否确认删除该存档[" + sd.name + "] ?")) {
          savedDatas.value.splice(selectedDataIndex.value, 1);
          saveToStorage(savedDatas.value);
        }
      } else { alert("请选择一个存档"); }
    }

    function dataShare() {
      sharing.value = true;
      if (selectedDataIndex.value >= 0 && selectedDataIndex.value < savedDatas.value.length) {
        sharingText.value = JSON.stringify(savedDatas.value[selectedDataIndex.value], null, 2);
      }
    }

    function clearData() { sharingText.value = ""; }

    function importData() {
      try {
        var d = JSON.parse(sharingText.value);
        savedDatas.value.push(d);
        sharing.value = false;
        alert("导入成功");
        saveToStorage(savedDatas.value);
      } catch(e) { alert("数据格式不正确"); }
    }

    function delLine(index) { timeline.value.splice(index, 1); }

    function delSkill(skill, i) {
      if (confirm("是否删除该技能?")) {
        skills.value.splice(i, 1);
        for (var j = 0; j < timeline.value.length; ++j) {
          delete timeline.value[j].actions[skill.name];
        }
      }
    }

    function enterNewSkill() {
      if (newSkill.name && newSkill.name.length > 0) {
        for (var i = 0; i < skills.value.length; i++) {
          if (skills.value[i].name === newSkill.name) { alert("技能名不可以重复"); return; }
        }
        if (newSkill.cd == null) newSkill.cd = 0;
        if (newSkill.duration == null) newSkill.duration = 0;
        skills.value.push(JSON.parse(JSON.stringify(newSkill)));
        newSkill.name = "";
      }
    }

    function onSkillChange(skill) {
      var needReuse = [];
      for (var i = 0; i < timeline.value.length; ++i) {
        var line = timeline.value[i];
        var action = line.actions[skill.name];
        if (action && action.use) needReuse.push({ line: line, index: i });
      }
      for (var j = 0; j < 2; ++j) {
        for (var k = 0; k < needReuse.length; ++k) {
          useSkill(needReuse[k].line, skill, needReuse[k].index, true);
        }
      }
    }

    function enterLine(e) {
      if (insertLine(inputText.value)) {
        inputText.value = "";
        inputErrMsg.value = "";
      } else { inputErrMsg.value = "格式错误"; }
    }

    function insertLine(lineStr) {
      var reg = /^\s*(\d+)[:：](\d{1,2})([.:：](\d+))?\s+(.*)/.exec(lineStr);
      if (reg) {
        var min = +reg[1], sec = +reg[2], millis = +reg[4], info = reg[5];
        if (isNaN(min)) min = 0; if (isNaN(sec)) sec = 0; if (isNaN(millis)) millis = 0;
        var time = millis + sec * 1000 + min * 60 * 1000;
        if (info) info = info.trim();
        var idx;
        for (idx = 0; idx < timeline.value.length; ++idx) {
          if (timeline.value[idx].time > time) break;
        }
        var actions = {};
        if (idx >= 1) {
          var prevLine = timeline.value[idx - 1];
          if (prevLine) {
            var dt = time - prevLine.time;
            for (var prop in prevLine.actions) {
              var act = prevLine.actions[prop];
              var cd = act.cd - time;
              var dur = act.duration - time;
              if (cd > 0 || dur > 0) {
                actions[prop] = { cd: cd > 0 ? cd : 0, duration: dur > 0 ? dur : 0 };
              }
            }
          }
        }
        timeline.value.splice(idx, 0, { time: time, type: "event", title: info, actions: actions });
        return true;
      }
      return false;
    }

    function useSkill(line, skill, index, silent) {
      var thisAction = line.actions[skill.name];
      if (thisAction) { if (!thisAction.use && thisAction.cd > 0) return; }
      var cdTime = line.time + skill.cd * 1000;
      for (var i = index + 1; i < timeline.value.length && timeline.value[i].time < cdTime; ++i) {
        var act = timeline.value[i].actions[skill.name];
        if (act && act.use) {
          if (howToDoOnConflict.value === "0") {
            if (silent || confirm("与后面技能冲突，是否取消后续冲突技能的施放？")) {
              useSkill(timeline.value[i], skill, i);
            } else { return; }
          } else if (howToDoOnConflict.value === "1") {
            useSkill(timeline.value[i], skill, i);
          } else { return; }
        }
      }
      var cancel = thisAction && thisAction.use;
      if (cancel) {
        line.actions[skill.name] = undefined;
      } else {
        line.actions[skill.name] = { use: true, cd: skill.cd * 1000, duration: skill.duration * 1000 };
      }
      var cd = skill.cd * 1000, duration = skill.duration * 1000;
      var thisLine = line;
      var curIdx = index;
      while (++curIdx < timeline.value.length) {
        var nextLine = timeline.value[curIdx];
        var nextAction = nextLine.actions[skill.name];
        if (nextAction && nextAction.use) break;
        if (cancel) {
          if (nextAction && !nextAction.use) nextLine.actions[skill.name] = undefined;
        } else {
          var dt = nextLine.time - thisLine.time;
          cd -= dt; duration -= dt;
          if (cd > 0 || duration > 0) {
            nextLine.actions[skill.name] = { cd: cd > 0 ? cd : 0, duration: duration > 0 ? duration : 0 };
          }
        }
        thisLine = nextLine;
      }
    }

    function modifyLineTitle(line) {
      var title = prompt("请输入要设置的内容", line.title);
      if (title) line.title = title;
    }

    onMounted(function() { dataLoad(true); });

    return {
      sharing, sharingText, selectedDataIndex, newDataName, howToDoOnConflict,
      savedDatas, timeline, skills, inputErrMsg, inputText, newSkill,
      timeFormat,
      dataSave, dataLoad, dataDelete, dataShare, clearData, importData,
      delLine, delSkill, enterNewSkill, onSkillChange, enterLine, useSkill, modifyLineTitle
    };
  }
};
