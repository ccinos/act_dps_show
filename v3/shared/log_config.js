'use strict';
var jobNameCnToType = {};
var zoneList = [
  {
    "id": 2,
    "name": "Dungeons (Endgame)",
    "frozen": true,
    "encounters": [
      {
        "id": 4500,
        "name": "空中神域不获岛"
      },
      {
        "id": 4501,
        "name": "博物战舰无限回廊"
      },
      {
        "id": 4502,
        "name": "圣茉莱娜的植物园"
      },
      {
        "id": 4503,
        "name": "天狼星之塔（困难难度）"
      },
      {
        "id": 4504,
        "name": "倒吊之塔"
      },
      {
        "id": 4505,
        "name": "神圣遗迹无限城市街古迹"
      },
      {
        "id": 4506,
        "name": "天龙宫殿忆罪宫"
      },
      {
        "id": 4507,
        "name": "黑涡传说破舰岛"
      },
      {
        "id": 4508,
        "name": "险峻峡谷塞尔法特尔溪谷"
      },
      {
        "id": 4509,
        "name": "秘本宝库迦巴勒幻想图书馆"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 4,
    "name": "Trials (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1027,
        "name": "俾斯麦"
      },
      {
        "id": 1028,
        "name": "罗波那"
      },
      {
        "id": 1029,
        "name": "骑神托尔丹"
      },
      {
        "id": 1031,
        "name": "萨菲洛特"
      },
      {
        "id": 1033,
        "name": "尼德霍格"
      },
      {
        "id": 1034,
        "name": "索菲娅"
      },
      {
        "id": 1035,
        "name": "祖尔宛"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 5,
    "name": "Void Ark",
    "frozen": true,
    "encounters": [
      {
        "id": 2000,
        "name": "刻托"
      },
      {
        "id": 2001,
        "name": "天柱树"
      },
      {
        "id": 2002,
        "name": "丘库雷因"
      },
      {
        "id": 2003,
        "name": "艾奇德娜"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 6,
    "name": "Alexander: Gordias (Story)",
    "frozen": true,
    "encounters": [
      {
        "id": 14,
        "name": "压迫者"
      },
      {
        "id": 15,
        "name": "戈耳狄俄斯之袖"
      },
      {
        "id": 16,
        "name": "有生命活水"
      },
      {
        "id": 17,
        "name": "操纵者"
      },
      {
        "id": 5000,
        "name": "浮士德"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 7,
    "name": "Alexander: Gordias (Savage)",
    "frozen": true,
    "encounters": [
      {
        "id": 18,
        "name": "压迫者"
      },
      {
        "id": 19,
        "name": "戈耳狄俄斯之袖"
      },
      {
        "id": 20,
        "name": "有生命活水"
      },
      {
        "id": 21,
        "name": "操纵者"
      },
      {
        "id": 5001,
        "name": "浮士德"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 8,
    "name": "The Weeping City of Mhach",
    "frozen": true,
    "encounters": [
      {
        "id": 2004,
        "name": "阿剌克涅"
      },
      {
        "id": 2005,
        "name": "弗加尔"
      },
      {
        "id": 2006,
        "name": "奥兹玛"
      },
      {
        "id": 2007,
        "name": "卡洛菲斯提莉"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 9,
    "name": "Alexander: Midas (Story)",
    "frozen": true,
    "encounters": [
      {
        "id": 22,
        "name": "奇才 拉特芬克斯"
      },
      {
        "id": 23,
        "name": "环旋者"
      },
      {
        "id": 24,
        "name": "万事通 奎克辛克斯"
      },
      {
        "id": 25,
        "name": "残暴正义号"
      },
      {
        "id": 5002,
        "name": "新型浮士德"
      },
      {
        "id": 5003,
        "name": "爆破者"
      },
      {
        "id": 5004,
        "name": "争斗者"
      },
      {
        "id": 5005,
        "name": "欺诈者"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 10,
    "name": "Alexander: Midas (Savage)",
    "frozen": true,
    "encounters": [
      {
        "id": 26,
        "name": "奇才 拉特芬克斯"
      },
      {
        "id": 27,
        "name": "弥达斯之袖"
      },
      {
        "id": 28,
        "name": "万事通 奎克辛克斯"
      },
      {
        "id": 29,
        "name": "残暴正义号"
      },
      {
        "id": 5006,
        "name": "霍摩福斯特"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 12,
    "name": "Alexander: The Creator (Story)",
    "frozen": true,
    "encounters": [
      {
        "id": 30,
        "name": "废品翻新装置"
      },
      {
        "id": 31,
        "name": "佣兵雷姆普里克斯"
      },
      {
        "id": 32,
        "name": "巡航驱逐者"
      },
      {
        "id": 33,
        "name": "至尊亚历山大"
      },
      {
        "id": 5007,
        "name": "终极浮士德"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 13,
    "name": "Alexander: The Creator (Savage)",
    "frozen": true,
    "encounters": [
      {
        "id": 34,
        "name": "废品翻新装置"
      },
      {
        "id": 35,
        "name": "佣兵雷姆普里克斯"
      },
      {
        "id": 36,
        "name": "巡航驱逐者"
      },
      {
        "id": 37,
        "name": "至尊亚历山大"
      },
      {
        "id": 5008,
        "name": "终极浮士德"
      }
    ],
    "brackets": {
      "min": 3,
      "max": 3.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 14,
    "name": "Dungeons (Endgame)",
    "frozen": true,
    "encounters": [
      {
        "id": 4510,
        "name": "鏖战红莲阿拉米格"
      },
      {
        "id": 4511,
        "name": "恶党孤城黄金阁"
      },
      {
        "id": 4512,
        "name": "修行古刹星导寺"
      },
      {
        "id": 4513,
        "name": "沉没神殿斯卡拉遗迹"
      },
      {
        "id": 4514,
        "name": "红玉火山狱之盖"
      },
      {
        "id": 4515,
        "name": "疯狂战舰无限回廊"
      },
      {
        "id": 4516,
        "name": "风水灵庙岩燕庙"
      },
      {
        "id": 4517,
        "name": "死亡大地终末焦土"
      },
      {
        "id": 4518,
        "name": "污染庭园圣茉夏娜植物园"
      },
      {
        "id": 4519,
        "name": "国境战线基姆利特暗区"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 15,
    "name": "Trials (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1036,
        "name": "须佐之男"
      },
      {
        "id": 1037,
        "name": "吉祥天女"
      },
      {
        "id": 1038,
        "name": "神龙"
      },
      {
        "id": 1040,
        "name": "白虎"
      },
      {
        "id": 1041,
        "name": "月读"
      },
      {
        "id": 1043,
        "name": "朱雀"
      },
      {
        "id": 1044,
        "name": "青龙"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 16,
    "name": "Omega: Deltascape (Story)",
    "frozen": true,
    "encounters": [
      {
        "id": 38,
        "name": "老者"
      },
      {
        "id": 39,
        "name": "灾变者"
      },
      {
        "id": 40,
        "name": "哈利卡纳苏斯"
      },
      {
        "id": 41,
        "name": "艾克斯迪司"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 17,
    "name": "Omega: Deltascape (Savage)",
    "frozen": true,
    "encounters": [
      {
        "id": 42,
        "name": "老者"
      },
      {
        "id": 43,
        "name": "灾变者"
      },
      {
        "id": 44,
        "name": "哈利卡纳苏斯"
      },
      {
        "id": 45,
        "name": "艾克斯迪司"
      },
      {
        "id": 46,
        "name": "新生艾克斯迪司"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 18,
    "name": "The Royal City of Rabanastre",
    "frozen": true,
    "encounters": [
      {
        "id": 2008,
        "name": "背德皇帝马提乌斯"
      },
      {
        "id": 2009,
        "name": "统治者哈修马利姆"
      },
      {
        "id": 2010,
        "name": "人马王洛弗卡勒"
      },
      {
        "id": 2011,
        "name": "冷血剑阿加斯"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 19,
    "name": "The Unending Coil of Bahamut",
    "frozen": true,
    "encounters": [
      {
        "id": 1039,
        "name": "巴哈姆特绝境战"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 20,
    "name": "Omega: Sigmascape (Story)",
    "frozen": true,
    "encounters": [
      {
        "id": 47,
        "name": "魔列车"
      },
      {
        "id": 48,
        "name": "恶魔查达奴克"
      },
      {
        "id": 49,
        "name": "守护者"
      },
      {
        "id": 50,
        "name": "凯夫卡"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 21,
    "name": "Omega: Sigmascape (Savage)",
    "frozen": true,
    "encounters": [
      {
        "id": 51,
        "name": "魔列车"
      },
      {
        "id": 52,
        "name": "恶魔查达奴克"
      },
      {
        "id": 53,
        "name": "守护者"
      },
      {
        "id": 54,
        "name": "凯夫卡"
      },
      {
        "id": 55,
        "name": "神圣凯夫卡"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 22,
    "name": "The Ridorana Lighthouse",
    "frozen": true,
    "encounters": [
      {
        "id": 2012,
        "name": "暗黑之云法姆弗里特"
      },
      {
        "id": 2013,
        "name": "魔人贝利亚斯"
      },
      {
        "id": 2014,
        "name": "劳动七号"
      },
      {
        "id": 2015,
        "name": "鬼龙雅兹玛特"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 23,
    "name": "The Weapon's Refrain",
    "frozen": true,
    "encounters": [
      {
        "id": 1042,
        "name": "究极神兵绝境战"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 24,
    "name": "Omega: Alphascape (Story)",
    "frozen": true,
    "encounters": [
      {
        "id": 56,
        "name": "卡奥斯"
      },
      {
        "id": 57,
        "name": "尘世幻龙"
      },
      {
        "id": 58,
        "name": "欧米茄"
      },
      {
        "id": 59,
        "name": "双生欧米茄"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 25,
    "name": "Omega: Alphascape (Savage)",
    "frozen": true,
    "encounters": [
      {
        "id": 60,
        "name": "卡奥斯"
      },
      {
        "id": 61,
        "name": "尘世幻龙"
      },
      {
        "id": 62,
        "name": "欧米茄"
      },
      {
        "id": 63,
        "name": "双生欧米茄"
      },
      {
        "id": 64,
        "name": "至尊欧米茄"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 26,
    "name": "The Orbonne Monastery",
    "frozen": true,
    "encounters": [
      {
        "id": 2016,
        "name": "机工士姆斯塔迪奥"
      },
      {
        "id": 2017,
        "name": "圣骑士阿格莉亚丝"
      },
      {
        "id": 2018,
        "name": "雷神西德"
      },
      {
        "id": 2019,
        "name": "圣天使阿尔蒂玛"
      }
    ],
    "brackets": {
      "min": 4,
      "max": 4.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 27,
    "name": "Dungeons (Endgame)",
    "frozen": true,
    "encounters": [
      {
        "id": 4520,
        "name": "末日暗影亚马乌罗提"
      },
      {
        "id": 4521,
        "name": "异界遗构希尔科斯孪晶塔"
      },
      {
        "id": 4522,
        "name": "创造机构阿尼德罗学院"
      },
      {
        "id": 4523,
        "name": "魔法宫殿宇宙宫"
      },
      {
        "id": 4524,
        "name": "黑风海底 阿尼德罗追忆馆"
      },
      {
        "id": 4525,
        "name": "漆黑决战"
      },
      {
        "id": 4526,
        "name": "魔术工房玛托雅工作室"
      },
      {
        "id": 4527,
        "name": "黄金平原帕戈尔赞草原"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 28,
    "name": "Trials I (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1045,
        "name": "缇坦妮雅"
      },
      {
        "id": 1046,
        "name": "无瑕灵君"
      },
      {
        "id": 1049,
        "name": "哈迪斯"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 29,
    "name": "Eden's Gate",
    "frozen": true,
    "encounters": [
      {
        "id": 65,
        "name": "至尊伊甸"
      },
      {
        "id": 66,
        "name": "虚空行者"
      },
      {
        "id": 67,
        "name": "利维亚桑"
      },
      {
        "id": 68,
        "name": "泰坦"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 30,
    "name": "Ultimates (Stormblood)",
    "frozen": true,
    "encounters": [
      {
        "id": 1047,
        "name": "巴哈姆特绝境战"
      },
      {
        "id": 1048,
        "name": "究极神兵绝境战"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 31,
    "name": "The Copied Factory",
    "frozen": true,
    "encounters": [
      {
        "id": 2020,
        "name": "多关节型：司令机"
      },
      {
        "id": 2021,
        "name": "霍布斯"
      },
      {
        "id": 2022,
        "name": "昂格士"
      },
      {
        "id": 2023,
        "name": "9S：接入多脚战车"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 32,
    "name": "Ultimates",
    "frozen": true,
    "encounters": [
      {
        "id": 1050,
        "name": "亚历山大绝境战"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 33,
    "name": "Eden's Verse",
    "frozen": true,
    "encounters": [
      {
        "id": 69,
        "name": "拉姆"
      },
      {
        "id": 70,
        "name": "伊弗利特与迦楼罗"
      },
      {
        "id": 71,
        "name": "暗黑心象"
      },
      {
        "id": 72,
        "name": "希瓦"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 34,
    "name": "Trials II (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1051,
        "name": "红宝石神兵1"
      },
      {
        "id": 1052,
        "name": "红宝石神兵 II"
      },
      {
        "id": 1053,
        "name": "瓦厉斯·耶·加尔乌斯"
      },
      {
        "id": 1054,
        "name": "光之战士"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 35,
    "name": "The Puppets' Bunker",
    "frozen": true,
    "encounters": [
      {
        "id": 2024,
        "name": "813P：装备据点防卫装置"
      },
      {
        "id": 2025,
        "name": "强化型飞行单位"
      },
      {
        "id": 2026,
        "name": "905P：重战单位"
      },
      {
        "id": 2027,
        "name": "2P：融合体"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 36,
    "name": "Trials (Unreal)",
    "frozen": true,
    "encounters": [
      {
        "id": 3001,
        "name": "希瓦"
      },
      {
        "id": 3002,
        "name": "泰坦"
      },
      {
        "id": 3003,
        "name": "利维亚桑"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 37,
    "name": "Trials III (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1056,
        "name": "绿宝石神兵 I"
      },
      {
        "id": 1055,
        "name": "绿宝石神兵 II"
      },
      {
        "id": 1057,
        "name": "钻石神兵"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 38,
    "name": "Eden's Promise",
    "frozen": true,
    "encounters": [
      {
        "id": 73,
        "name": "暗黑之云"
      },
      {
        "id": 74,
        "name": "影之王"
      },
      {
        "id": 75,
        "name": "绝命战士"
      },
      {
        "id": 76,
        "name": "伊甸之约"
      },
      {
        "id": 77,
        "name": "暗之巫女"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 39,
    "name": "Delubrum Reginae",
    "frozen": true,
    "encounters": [
      {
        "id": 2028,
        "name": "求道之三位一体"
      },
      {
        "id": 2029,
        "name": "女王护卫"
      },
      {
        "id": 2030,
        "name": "誓约之三位一体"
      },
      {
        "id": 2031,
        "name": "天佑女王"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 40,
    "name": "The Tower at Paradigm's Breach",
    "frozen": true,
    "encounters": [
      {
        "id": 2032,
        "name": "杰克"
      },
      {
        "id": 2033,
        "name": "韩塞尔与格雷特"
      },
      {
        "id": 2034,
        "name": "红衣少女"
      },
      {
        "id": 2035,
        "name": "伪造的神明"
      },
      {
        "id": 2036,
        "name": "开花的神明"
      }
    ],
    "brackets": {
      "min": 5,
      "max": 5.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 41,
    "name": "Dungeons (Endgame)",
    "frozen": true,
    "encounters": [
      {
        "id": 4528,
        "name": "最终幻想末世终迹"
      },
      {
        "id": 4529,
        "name": "乐园都市笑笑镇"
      },
      {
        "id": 4530,
        "name": "电脑梦境斯提格玛四"
      },
      {
        "id": 4531,
        "name": "近东秘宝阿尔扎达尔海底遗迹群"
      },
      {
        "id": 4532,
        "name": "异界孤城特罗亚宫廷"
      },
      {
        "id": 4534,
        "name": "雪山奥窟冥魂石洞"
      },
      {
        "id": 4535,
        "name": "间歇灵泉哈姆岛"
      },
      {
        "id": 4537,
        "name": "异界深渊月面地下溪谷"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 42,
    "name": "Trials I (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1058,
        "name": "佐迪亚克"
      },
      {
        "id": 1059,
        "name": "海德林"
      },
      {
        "id": 1063,
        "name": "讴歌终结之物"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 43,
    "name": "Ultimates (Legacy)",
    "frozen": true,
    "encounters": [
      {
        "id": 1060,
        "name": "巴哈姆特绝境战"
      },
      {
        "id": 1061,
        "name": "究极神兵绝境战"
      },
      {
        "id": 1062,
        "name": "亚历山大绝境战"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 44,
    "name": "Asphodelos",
    "frozen": true,
    "encounters": [
      {
        "id": 78,
        "name": "埃里克特翁尼亚斯"
      },
      {
        "id": 79,
        "name": "鱼尾海马怪"
      },
      {
        "id": 80,
        "name": "菲尼克司"
      },
      {
        "id": 81,
        "name": "赫斯珀洛斯"
      },
      {
        "id": 82,
        "name": "赫斯珀洛斯 II"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 45,
    "name": "Dragonsong's Reprise",
    "frozen": true,
    "encounters": [
      {
        "id": 1065,
        "name": "幻想龙诗绝境战"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 46,
    "name": "Trials (Unreal)",
    "frozen": true,
    "encounters": [
      {
        "id": 3004,
        "name": "究极神兵"
      },
      {
        "id": 3005,
        "name": "萨菲洛特"
      },
      {
        "id": 3006,
        "name": "索菲娅"
      },
      {
        "id": 3007,
        "name": "祖尔宛"
      },
      {
        "id": 3008,
        "name": "托尔丹"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 47,
    "name": "Aglaia",
    "frozen": true,
    "encounters": [
      {
        "id": 2037,
        "name": "比尔格"
      },
      {
        "id": 2038,
        "name": "拉尔戈"
      },
      {
        "id": 2039,
        "name": "阿泽玛"
      },
      {
        "id": 2040,
        "name": "纳尔札尔"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 48,
    "name": "Delubrum Reginae",
    "frozen": true,
    "encounters": [
      {
        "id": 2041,
        "name": "求道之三位一体"
      },
      {
        "id": 2042,
        "name": "女王护卫"
      },
      {
        "id": 2043,
        "name": "誓约之三位一体"
      },
      {
        "id": 2044,
        "name": "天佑女王"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 49,
    "name": "Abyssos",
    "frozen": true,
    "encounters": [
      {
        "id": 83,
        "name": "原型宝石兽"
      },
      {
        "id": 84,
        "name": "赫革摩涅"
      },
      {
        "id": 85,
        "name": "阿格狄斯提斯"
      },
      {
        "id": 86,
        "name": "赫淮斯托斯"
      },
      {
        "id": 87,
        "name": "赫淮斯托斯 II"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 50,
    "name": "Trials II (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1066,
        "name": "巴尔巴莉希亚"
      },
      {
        "id": 1067,
        "name": "卢比坎特"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 51,
    "name": "Dungeons (Criterion)",
    "frozen": true,
    "encounters": [
      {
        "id": 4533,
        "name": "异闻希拉狄哈水道"
      },
      {
        "id": 4536,
        "name": "异闻六根山"
      },
      {
        "id": 4538,
        "name": "异闻阿罗阿罗岛"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 52,
    "name": "Euphrosyne",
    "frozen": true,
    "encounters": [
      {
        "id": 2045,
        "name": "诺菲卡"
      },
      {
        "id": 2046,
        "name": "阿尔基克&妮美雅"
      },
      {
        "id": 2047,
        "name": "哈罗妮"
      },
      {
        "id": 2048,
        "name": "梅茵菲娜"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 53,
    "name": "The Omega Protocol",
    "frozen": true,
    "encounters": [
      {
        "id": 1068,
        "name": "欧米茄绝境验证战"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 54,
    "name": "Anabaseios",
    "frozen": true,
    "encounters": [
      {
        "id": 88,
        "name": "科库托斯"
      },
      {
        "id": 89,
        "name": "万魔殿"
      },
      {
        "id": 90,
        "name": "特弥斯"
      },
      {
        "id": 91,
        "name": "雅典娜"
      },
      {
        "id": 92,
        "name": "帕拉斯雅典娜"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 55,
    "name": "Trials III (Extreme)",
    "frozen": true,
    "encounters": [
      {
        "id": 1069,
        "name": "高贝扎"
      },
      {
        "id": 1070,
        "name": "泽罗姆斯"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 56,
    "name": "Thaleia",
    "frozen": true,
    "encounters": [
      {
        "id": 2049,
        "name": "沙利亚克"
      },
      {
        "id": 2050,
        "name": "利姆莱茵"
      },
      {
        "id": 2051,
        "name": "奥修昂"
      },
      {
        "id": 2052,
        "name": "欧罗基亚"
      }
    ],
    "brackets": {
      "min": 6,
      "max": 6.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 57,
    "name": "Dungeons (Endgame)",
    "frozen": false,
    "encounters": [
      {
        "id": 4539,
        "name": "亚历山德里亚"
      },
      {
        "id": 4540,
        "name": "仙人刺谷"
      },
      {
        "id": 4541,
        "name": "噩梦乐园迷途鬼区"
      },
      {
        "id": 4545,
        "name": "废弃据点玉韦亚瓦塔实验站"
      },
      {
        "id": 4546,
        "name": "王城古迹永护塔底"
      },
      {
        "id": 4547,
        "name": "永久幽界中央终端"
      },
      {
        "id": 4549,
        "name": "遗忘行路雾之迹"
      },
      {
        "id": 4551,
        "name": "The Clyteum"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 58,
    "name": "Trials I (Extreme)",
    "frozen": false,
    "encounters": [
      {
        "id": 1071,
        "name": "艳翼蛇鸟"
      },
      {
        "id": 1072,
        "name": "佐拉加"
      },
      {
        "id": 1078,
        "name": "永恒女王"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 59,
    "name": "Ultimates (Legacy)",
    "frozen": false,
    "encounters": [
      {
        "id": 1073,
        "name": "巴哈姆特绝境战"
      },
      {
        "id": 1074,
        "name": "究极神兵绝境战"
      },
      {
        "id": 1075,
        "name": "亚历山大绝境战"
      },
      {
        "id": 1076,
        "name": "幻想龙诗绝境战"
      },
      {
        "id": 1077,
        "name": "欧米茄绝境验证战"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 60,
    "name": "Delubrum Reginae",
    "frozen": false,
    "encounters": [
      {
        "id": 2053,
        "name": "求道之三位一体"
      },
      {
        "id": 2054,
        "name": "女王护卫"
      },
      {
        "id": 2055,
        "name": "誓约之三位一体"
      },
      {
        "id": 2056,
        "name": "天佑女王"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 61,
    "name": "Dungeons (Criterion Legacy)",
    "frozen": false,
    "encounters": [
      {
        "id": 4542,
        "name": "异闻希拉狄哈水道"
      },
      {
        "id": 4543,
        "name": "异闻六根山"
      },
      {
        "id": 4544,
        "name": "异闻阿罗阿罗岛"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 62,
    "name": "AAC Light-Heavyweight",
    "frozen": false,
    "encounters": [
      {
        "id": 93,
        "name": "黑猫"
      },
      {
        "id": 94,
        "name": "蜂蜂小甜心"
      },
      {
        "id": 95,
        "name": "野蛮爆弹狂人"
      },
      {
        "id": 96,
        "name": "狡雷"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 63,
    "name": "Jeuno: The First Walk",
    "frozen": false,
    "encounters": [
      {
        "id": 2057,
        "name": "遥远的咒缚 普利修"
      },
      {
        "id": 2058,
        "name": "法芙尼尔"
      },
      {
        "id": 2059,
        "name": "方舟天使"
      },
      {
        "id": 2060,
        "name": "暗之王"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 64,
    "name": "Trials (Unreal)",
    "frozen": false,
    "encounters": [
      {
        "id": 3009,
        "name": "白虎"
      },
      {
        "id": 3010,
        "name": "朱雀"
      },
      {
        "id": 3011,
        "name": "青龙"
      },
      {
        "id": 3012,
        "name": "月读"
      },
      {
        "id": 3013,
        "name": "Shinryu"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 65,
    "name": "Futures Rewritten",
    "frozen": false,
    "encounters": [
      {
        "id": 1079,
        "name": "光暗未来绝境战"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 66,
    "name": "Alliance Raids (Chaotic)",
    "frozen": false,
    "encounters": [
      {
        "id": 2061,
        "name": "暗黑之云"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 67,
    "name": "Trials II (Extreme)",
    "frozen": false,
    "encounters": [
      {
        "id": 1080,
        "name": "泽莲尼娅"
      },
      {
        "id": 1081,
        "name": "永远之暗"
      },
      {
        "id": 1082,
        "name": "护锁刃龙"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 68,
    "name": "AAC Cruiserweight",
    "frozen": false,
    "encounters": [
      {
        "id": 97,
        "name": "热舞绿光"
      },
      {
        "id": 98,
        "name": "狂热糖潮"
      },
      {
        "id": 99,
        "name": "野蛮恨心"
      },
      {
        "id": 100,
        "name": "剑嚎"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 69,
    "name": "The Forked Tower: Blood",
    "frozen": false,
    "encounters": [
      {
        "id": 2062,
        "name": "恶魔板"
      },
      {
        "id": 2063,
        "name": "星头三兄弟"
      },
      {
        "id": 2065,
        "name": "大理石龙"
      },
      {
        "id": 2066,
        "name": "魔陶洛斯"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 70,
    "name": "San d'Oria: The Second Walk",
    "frozen": false,
    "encounters": [
      {
        "id": 2067,
        "name": "信仰之麒麟"
      },
      {
        "id": 2068,
        "name": "阿尔蒂玛与欧米茄"
      },
      {
        "id": 2069,
        "name": "卡姆拉纳特"
      },
      {
        "id": 2070,
        "name": "埃尔德纳修"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 71,
    "name": "Deep Dungeons",
    "frozen": false,
    "encounters": [
      {
        "id": 4548,
        "name": "卓异的悲寂"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 72,
    "name": "Trials III (Extreme)",
    "frozen": false,
    "encounters": [
      {
        "id": 1083,
        "name": "格莱杨拉波尔"
      },
      {
        "id": 1084,
        "name": "Enuo"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 73,
    "name": "AAC Heavyweight",
    "frozen": false,
    "encounters": [
      {
        "id": 101,
        "name": "致命美人"
      },
      {
        "id": 102,
        "name": "极限兄弟"
      },
      {
        "id": 103,
        "name": "霸王"
      },
      {
        "id": 104,
        "name": "林德布鲁姆"
      },
      {
        "id": 105,
        "name": "林德布鲁姆 II"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 74,
    "name": "Dungeons (Criterion)",
    "frozen": false,
    "encounters": [
      {
        "id": 4550,
        "name": "它商传奇"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  },
  {
    "id": 75,
    "name": "Windurst: The Third Walk",
    "frozen": false,
    "encounters": [
      {
        "id": 2071,
        "name": "Shantotto the Demon"
      },
      {
        "id": 2072,
        "name": "Alexander Resurrected"
      },
      {
        "id": 2073,
        "name": "Promathia"
      },
      {
        "id": 2074,
        "name": "Hollow King"
      }
    ],
    "brackets": {
      "min": 7,
      "max": 7.1,
      "bucket": 0.1,
      "type": "版本"
    }
  }
];
var serverList = [
  "红玉海",
  "神意之地",
  "拉诺西亚",
  "幻影群岛",
  "萌芽池",
  "宇宙和音",
  "沃仙曦染",
  "晨曦王座",
  "白银乡",
  "白金幻象",
  "神拳痕",
  "潮风亭",
  "旅人栈桥",
  "拂晓之间",
  "龙巢神殿",
  "紫水栈桥",
  "延夏",
  "静语庄园",
  "摩杜纳",
  "海猫茶屋",
  "柔风海湾",
  "琥珀原"
];
var zoneName = {
  "2": "迷宫挑战(60级)",
  "4": "讨伐歼灭战：高难度(60级)",
  "5": "魔航船虚无方舟",
  "6": "亚历山大机神城：启动之章",
  "7": "亚历山大零式机神城：启动之章",
  "8": "禁忌城邦玛哈",
  "9": "亚历山大机神城：律动之章",
  "10": "亚历山大零式机神城：律动之章",
  "12": "亚历山大机神城：天动之章",
  "13": "亚历山大零式机神城：天动之章",
  "14": "迷宫挑战(70级)",
  "15": "讨伐歼灭战：高难度(70级)",
  "16": "欧米茄时空狭缝：德尔塔之章",
  "17": "欧米茄零式时空狭缝：德尔塔之章",
  "18": "失落之都拉巴纳斯塔",
  "19": "巴哈姆特绝境战",
  "20": "欧米茄时空狭缝：西格玛之章",
  "21": "欧米茄零式时空狭缝：西格玛之章",
  "22": "封闭圣塔黎铎拉纳大灯塔",
  "23": "究极神兵绝境战",
  "24": "欧米茄时空狭缝：阿尔法之章",
  "25": "欧米茄零式时空狭缝：阿尔法之章",
  "26": "乐欲之所瓯博讷修道院",
  "27": "迷宫挑战(80级)",
  "28": "讨伐歼灭战I：高难度(80级)",
  "29": "伊甸希望乐园",
  "30": "究极(红莲)",
  "31": "复制工厂废墟",
  "32": "究极",
  "33": "伊甸零式希望乐园：共鸣之章",
  "34": "讨伐歼灭战II：高难度(80级)",
  "35": "人偶军事基地",
  "36": "讨伐歼灭战：幻难度",
  "37": "讨伐歼灭战III：高难度(80级)",
  "38": "伊甸零式希望乐园：再生之章",
  "39": "女王古殿",
  "40": "希望之炮台",
  "41": "迷宫挑战(90级)",
  "42": "讨伐歼灭战I：高难度(90级)",
  "43": "究极(上古)",
  "44": "万魔殿：边狱之章",
  "45": "幻想龙诗绝境战",
  "46": "讨伐歼灭战：幻难度",
  "47": "灿烂神域阿格莱亚",
  "48": "女王古殿",
  "49": "万魔殿零式：炼狱之章",
  "50": "讨伐歼灭战II：高难度(90级)",
  "51": "迷宫挑战(异闻)",
  "52": "喜悦神域欧芙洛绪涅",
  "53": "欧米茄绝境验证战",
  "54": "万魔殿零式：天狱之章",
  "55": "讨伐歼灭战III：高难度(90级)",
  "56": "荣华神域塔利亚",
  "57": "迷宫挑战(100级)",
  "58": "讨伐歼灭战I：高难度(100级)",
  "59": "究极(传承)",
  "60": "女王古殿",
  "61": "迷宫挑战(异闻传承)",
  "62": "AAC轻量级",
  "63": "朱诺：第一巡行",
  "64": "讨伐歼灭战：幻难度",
  "65": "改写未来",
  "66": "团队副本(混沌)",
  "67": "讨伐歼灭战II：高难度(100级)",
  "68": "AAC次重量级",
  "69": "分叉之塔：血",
  "70": "桑多瑞亚：第二巡行",
  "71": "深层迷宫",
  "72": "讨伐歼灭战III：高难度(100级)",
  "73": "AAC重量级",
  "74": "迷宫挑战(异闻)",
  "75": "温达斯特：第三巡行"
};