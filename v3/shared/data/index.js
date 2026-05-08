// 技能数据动态加载器 - 从 official 文件夹加载官方数据
// 提供 window.loadSkillData() 函数，按需加载各职业技能
// 用法: loadSkillData().then(function(data) { ... })
//   data = { allSkills, allSkillMap, jobTypeSkill, jobSkill, jobTypeJob }

(function() {
  "use strict";

  // 职业名称映射：英文名 -> 中文名
  var JOB_NAME_MAP = {
    'astrologian': '占星术士',
    'bard': '诗人',
    'blackmage': '黑魔',
    'dancer': '舞者',
    'darkknight': '暗黑骑士',
    'dragoon': '龙骑',
    'gunbreaker': '绝枪战士',
    'machinist': '机工',
    'monk': '武僧',
    'ninja': '忍者',
    'paladin': '骑士',
    'reaper': '钐镰客',
    'redmage': '赤魔',
    'sage': '贤者',
    'samurai': '武士',
    'scholar': '学者',
    'summoner': '召唤',
    'warrior': '战士',
    'whitemage': '白魔',
    'viper': '蝰蛇剑士',
    'pictomancer': '绘灵法师'
  };

  // 职业类型映射
  var JOB_TYPE_MAP = {
    'astrologian': '奶妈', 'sage': '奶妈', 'scholar': '奶妈', 'whitemage': '奶妈',
    'bard': '远敏', 'dancer': '远敏', 'machinist': '远敏',
    'blackmage': '魔法', 'redmage': '魔法', 'summoner': '魔法', 'pictomancer': '魔法',
    'darkknight': '坦克', 'gunbreaker': '坦克', 'paladin': '坦克', 'warrior': '坦克',
    'dragoon': '近战', 'monk': '近战', 'ninja': '近战', 'reaper': '近战', 'samurai': '近战', 'viper': '近战'
  };

  // 工具函数：从字符串提取数字
  function getNum(v, d) {
    var match = /(\d+(?:\.\d+)?)/.exec(v);
    return match ? parseFloat(match[1]) : (d || 0);
  }

  // 工具函数：提取dot威力（持续伤害）
  function getDot(c) {
    var match = /(持续.*?)威力：\s*(\d+)/.exec(c);
    return match ? parseInt(match[2], 10) : undefined;
  }

  // 工具函数：提取技能威力（非持续伤害）
  function getDmg(c) {
    var content = c || '';
    // 先移除持续伤害部分，再提取威力
    var temp = content.replace(/持续.*?威力：\s*\d+/g, '');
    var match = /威力：\s*(\d+)/.exec(temp);
    return match ? parseInt(match[1], 10) : undefined;
  }

  // 工具函数：提取持续时间
  function getDur(c) {
    var match = /持续时间：\s*(\d+(?:\.\d+)?)/.exec(c);
    return match ? parseFloat(match[1]) : 0;
  }

  // 工具函数：提取积蓄次数
  function getCnt(c) {
    var match = /积蓄次数：\s*(\d+)/.exec(c);
    return match ? parseInt(match[1], 10) : undefined;
  }

  // 工具函数：提取通用减伤（不包含魔法/物理限定词）
  function getReduceDmg(c) {
    var content = c || '';
    var temp = content.replace(/魔法伤害(?:减轻|降低)\d+%/g, '');
    temp = temp.replace(/物理伤害(?:减轻|降低)\d+%/g, '');
    var match = /伤害(?:减轻|降低)(\d+)%/.exec(temp);
    return match ? parseInt(match[1], 10) : undefined;
  }

  // 工具函数：提取魔法减伤
  function getReduceMagic(c) {
    var match = /魔法伤害(?:减轻|降低)(\d+)%/.exec(c || '');
    return match ? parseInt(match[1], 10) : undefined;
  }

  // 工具函数：提取物理减伤
  function getReduceNormal(c) {
    var match = /物理伤害(?:减轻|降低)(\d+)%/.exec(c || '');
    return match ? parseInt(match[1], 10) : undefined;
  }

  // 工具函数：提取物理增伤（攻击=物理伤害）
  function getIncreaseNormal(c) {
    var content = c || '';
    var temp = content.replace(/魔法攻击造成的伤害提高\d+%/g, '');
    temp = temp.replace(/魔法伤害提高\d+%/g, '');
    var match = /(?:物理)?攻击(?:造成的)?伤害提高(\d+)%/.exec(temp);
    if (match) return parseInt(match[1], 10);
    var physMatch = /物理伤害提高(\d+)%/.exec(temp);
    return physMatch ? parseInt(physMatch[1], 10) : undefined;
  }

  // 工具函数：提取魔法增伤
  function getIncreaseMagic(c) {
    var content = c || '';
    var match = /魔法攻击造成的伤害提高(\d+)%/.exec(content);
    if (match) return parseInt(match[1], 10);
    var magicMatch = /魔法伤害提高(\d+)%/.exec(content);
    return magicMatch ? parseInt(magicMatch[1], 10) : undefined;
  }

  // 工具函数：提取增加暴击百分比
  function getIncreaseCri(c) {
    var match = /暴击发动率提高(\d+)%/.exec(c || '');
    return match ? parseInt(match[1], 10) : undefined;
  }

  // 工具函数：提取防护罩抵消伤害量
  function getAddShield(c) {
    var content = c || '';
    var match = /能够抵消相当于(\d+)恢复力的伤害量/.exec(content);
    if (match) return parseInt(match[1], 10);
    match = /能够抵消相当于恢复力(\d+)的伤害量/.exec(content);
    if (match) return parseInt(match[1], 10);
    match = /能够抵消相当于最大体力(\d+)%的伤害量/.exec(content);
    if (match) return parseInt(match[1], 10);
    match = /能够抵消相当于治疗量(\d+)%的伤害/.exec(content);
    if (match) return parseInt(match[1], 10);
    return undefined;
  }

  // 工具函数：提取伤害类型
  function getDmgType(c) {
    var content = c || '';
    if (/魔法攻击/.test(content)) return '魔法';
    if (/物理攻击/.test(content)) return '物理';
    return undefined;
  }

  // 将官方技能数据转换为内部格式
  function convertSkill(officialSkill) {
    var content = officialSkill.content || '';
    var intro = content.replace(/<BR>/g, '\n').replace(/<br>/g, '\n');

    var skill = {
      name: officialSkill.name || '',
      lv: officialSkill.tnum ? getNum(officialSkill.tnum.replace('Lv', '')) : 0,
      type: officialSkill.classification || '',
      read: officialSkill.cast === '即时' ? 0 : getNum(officialSkill.cast),
      cd: getNum(officialSkill.recast),
      cost: officialSkill.cost === '-' ? '' : officialSkill.cost,
      dmg: getDmg(content),
      dot: getDot(content),
      duration: getDur(content),
      count: getCnt(content),
      intro: intro
    };

    var reduceDmg = getReduceDmg(content);
    if (reduceDmg !== undefined) skill.reduceDmg = reduceDmg;

    var reduceMagic = getReduceMagic(content);
    if (reduceMagic !== undefined) skill.reduceMagic = reduceMagic;

    var reduceNormal = getReduceNormal(content);
    if (reduceNormal !== undefined) skill.reduceNormal = reduceNormal;

    var increaseNormal = getIncreaseNormal(content);
    if (increaseNormal !== undefined) skill.increaseNormal = increaseNormal;

    var increaseMagic = getIncreaseMagic(content);
    if (increaseMagic !== undefined) skill.increaseMagic = increaseMagic;

    var increaseCri = getIncreaseCri(content);
    if (increaseCri !== undefined) skill.increaseCri = increaseCri;

    var addShield = getAddShield(content);
    if (addShield !== undefined) skill.addShield = addShield;

    var dmgType = getDmgType(content);
    if (dmgType !== undefined) skill.dmgType = dmgType;

    return skill;
  }

  /**
   * 动态加载 JS 文件
   * @param {string} src - 脚本文件 URL
   * @returns {Promise}
   */
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = function() { resolve(); };
      script.onerror = function(err) { reject(new Error("Failed to load: " + src)); };
      document.head.appendChild(script);
    });
  }

  /**
   * 动态加载所有职业技能数据，组合为 5 个全局变量
   * @returns {Promise<{allSkills, allSkillMap, jobTypeSkill, jobSkill, jobTypeJob}>}
   */
  function loadSkillData() {
    // 如果已经加载过，直接返回
    if (window.jobSkill) {
      return Promise.resolve({
        allSkills: window.allSkills,
        allSkillMap: window.allSkillMap,
        jobTypeSkill: window.jobTypeSkill,
        jobSkill: window.jobSkill,
        jobTypeJob: window.jobTypeJob
      });
    }

    // 正在加载中，返回同一个 Promise
    if (window.__skillDataLoading) {
      return window.__skillDataLoading;
    }

    var basePath = "./shared/data/";
    
    // 尝试从当前页面 URL 计算正确路径
    if (window.location && window.location.href) {
      var pageUrl = window.location.href;
      // 尝试找到 act_dps_show 目录作为基准
      var projectMatch = pageUrl.match(/(.*[\\/]act_dps_show[\\/])/);
      if (projectMatch) {
        basePath = projectMatch[1] + "v3/shared/data/";
      } else {
        // 尝试找到 v3 目录作为基准
        var v3Match = pageUrl.match(/(.*[\\/]v3[\\/])/);
        if (v3Match) {
          basePath = v3Match[1] + "shared/data/";
        }
      }
    }
    
    // 如果页面 URL 方法失败，尝试从已加载的脚本中查找
    if (basePath === "./shared/data/") {
      var scripts = document.getElementsByTagName('script');
      for (var s = 0; s < scripts.length; s++) {
        var scriptSrc = scripts[s].src;
        if (scriptSrc) {
          var match = scriptSrc.match(/(.*[\\/]shared[\\/]data[\\/])/);
          if (match) {
            basePath = match[1];
            break;
          }
        }
      }
    }

    var jobKeys = Object.keys(JOB_NAME_MAP);

    window.__skillDataLoading = Promise.resolve()
      .then(function() { return loadScript(basePath + "roleSkills.js"); })
      .then(function() {
        // 并行加载所有官方职业文件
        return Promise.all(jobKeys.map(function(key) {
          return loadScript(basePath + "official/" + key + ".js");
        }));
      })
      .then(function() {
        // 所有文件加载完毕，组合数据
        var roleSkills = window.__skillRoleSkills || {};

        var allSkills = [];
        var allSkillMap = {};
        var jobTypeSkill = {};
        var roleKeys = ["奶妈","远敏","魔法","坦克","近战"];
        for (var ri = 0; ri < roleKeys.length; ri++) {
          jobTypeSkill[roleKeys[ri]] = roleSkills[roleKeys[ri]];
        }

        var jobSkill = {};
        var jobTypeJob = {
          "奶妈":["占星术士","贤者","学者","白魔"],
          "远敏":["诗人","舞者","机工"],
          "魔法":["黑魔","赤魔","召唤","绘灵法师"],
          "坦克":["暗黑骑士","绝枪战士","骑士","战士"],
          "近战":["龙骑","武僧","忍者","钐镰客","武士","蝰蛇剑士"]
        };

        // 遍历所有职业
        for (var i = 0; i < jobKeys.length; i++) {
          var jobKey = jobKeys[i];
          var jobName = JOB_NAME_MAP[jobKey];
          var officialData = window[jobKey];

          if (!officialData || !officialData.pve) {
            // 如果数据加载失败，设置默认空对象
            jobSkill[jobName] = {
              type: JOB_TYPE_MAP[jobKey] || '近战',
              list: [],
              gcd: [],
              skills: {
                jobType: [],
                job: [],
                gcd: []
              }
            };
            continue;
          }

          var jobType = JOB_TYPE_MAP[jobKey] || '近战';
          var subArry = officialData.pve.subArry || [];

          // 收集技能
          var roleSkillObjects = [];
          var jobSkillObjects = [];  // 仅存储能力技
          var gcdSkillObjects = [];
          var list = [];  // 能力列表
          var gcd = [];   // GCD列表

          for (var j = 0; j < subArry.length; j++) {
            var section = subArry[j];
            var jobArry = section.jobArry || [];
            var isRoleSkill = section.subTitle === '职能技能';

            for (var k = 0; k < jobArry.length; k++) {
              var officialSkill = jobArry[k];
              
              // 跳过特性（classification为空且不是技能）
              if (!officialSkill.classification && !isRoleSkill) {
                continue;
              }

              var skill = convertSkill(officialSkill);

              if (isRoleSkill) {
                roleSkillObjects.push(skill);
              } else {
                // 判断是GCD还是能力
                // 能力 = 能力技（非GCD），战技/魔法 = GCD技能
                if (officialSkill.classification === '能力') {
                  jobSkillObjects.push(skill);  // 职业技能只包含能力技
                  list.push(skill.name);
                } else {
                  gcd.push(skill.name);
                  gcdSkillObjects.push(skill);
                }
              }
            }
          }

          // 添加到全局映射
          for (var m = 0; m < roleSkillObjects.length; m++) {
            var sk = roleSkillObjects[m];
            if (!allSkillMap[sk.name]) {
              allSkillMap[sk.name] = sk;
              allSkills.push(sk);
            }
          }
          for (var n = 0; n < jobSkillObjects.length; n++) {
            var sk = jobSkillObjects[n];
            if (!allSkillMap[sk.name]) {
              allSkillMap[sk.name] = sk;
              allSkills.push(sk);
            }
          }

          jobSkill[jobName] = {
            type: jobType,
            list: list,
            gcd: gcd,
            skills: {
              jobType: roleSkillObjects,
              job: jobSkillObjects,
              gcd: gcdSkillObjects
            }
          };
        }

        // 挂载到 window
        window.allSkills = allSkills;
        window.allSkillMap = allSkillMap;
        window.jobTypeSkill = jobTypeSkill;
        window.jobSkill = jobSkill;
        window.jobTypeJob = jobTypeJob;

        return { allSkills: allSkills, allSkillMap: allSkillMap, jobTypeSkill: jobTypeSkill, jobSkill: jobSkill, jobTypeJob: jobTypeJob };
      });

    return window.__skillDataLoading;
  }

  // 暴露到全局
  window.loadSkillData = loadSkillData;
})();
