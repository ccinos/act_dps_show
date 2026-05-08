(function () {
  window.viper = {
    // PVE数据========
    pve: {
      // 页面配色 blue green red
      bgcolor: "red",
      // 更新时间
      upTime: "2026/04/28",
      // 日本时间下描述
      job__notes__lv80caution:
        "各个技能和特性的内容，是以Lv100时显示的相应内容为主的。<br>由于版本还在不断修正改善中，具体内容以实际更新后版本为准。",
      subArry: [
        {
          subTitle: "专用技能",
          // 可取值 8 3 2   表示当前表格列数
          subTabNum: 8,
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType:"update",
          // 标题下的描述
          subDes: "",
          //  底部注意事项
          subNotes: "",
          // 列表数据
          // 1."range"=0 rangetype配置无效 小圆
          // 2."range" !=0 并且rangetype==空 大圆
          // 3."range" !=0 并且rangetype== zhixian 直线范围
          // 4."range" !=0 并且rangetype== houshan 后方扇形
          // 5."range" !=0 并且rangetype== qianshan 前方扇形
          jobArry: [
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/4c17f1a64284635f1483f205f9aea15be9bd1a16.png",
              "name": "咬噬尖齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv1",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：200<BR>咬噬锐牙状态中威力：300<BR>追加效果：穿裂锐牙<BR>持续时间：60秒<BR>穿裂锐牙效果：穿裂尖齿的威力提升100，穿裂尖牙的威力提升20<BR>无法与咬噬锐牙效果共存	",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/3b2aea9fa0be73f01aeb45b7eff15fd344776af0.png",
              "name": "猛袭利齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv5",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：300<BR>追加效果：猛袭<BR>持续时间：40秒<BR>猛袭效果：自身发动攻击造成的伤害提高10%<BR>发动条件：咬噬尖齿或穿裂尖齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，咬噬尖齿变为猛袭利齿",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/0763edc3238365b4076dba5d28b8f5c68be1d3de.png",
              "name": "穿裂尖齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv10",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：200<BR>穿裂锐牙状态中威力：300<BR>追加效果：咬噬锐牙<BR>持续时间：60秒<BR>咬噬锐牙效果：咬噬尖齿的威力提升100，咬噬尖牙的威力提升20<BR>无法与穿裂锐牙效果共存",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/251a98740164ae526be0e23bf9477abb8e28fe94.png",
              "name": "飞蛇之牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv15",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "20",
              "range": "0",
              "content": "对目标发动远距离物理攻击　威力：200",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/75a4621d0d002a4b18c59acfdfb097424ff88a5b.png",
              "name": "疾速利齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv20",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：300<BR>追加效果：疾速<BR>持续时间：40秒<BR>疾速效果：自身的自动攻击间隔、战技与魔法的咏唱及复唱时间缩短15%<BR>发动条件：咬噬尖齿或穿裂尖齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，穿裂尖齿变为疾速利齿",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/8b9f63b988cfb7be43914b31ff5551ee41c99ffa.png",
              "name": "咬噬尖牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv25",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "・威力从100变更为120。<br>・咬噬锐牙状态中的威力从120变更为140。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：120<BR>咬噬锐牙状态中威力：140<BR>追加效果：穿裂锐牙<BR>持续时间：60秒<BR>穿裂锐牙效果：穿裂尖齿的威力提升100，穿裂尖牙的威力提升20<BR>无法与咬噬锐牙效果共存",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/05bf152b3b5ac3ed319b5cdcbbdca1db4006cd96.png",
              "name": "侧击獠齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv30",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：340<BR>侧面攻击威力：400<BR>侧击锐牙状态下威力提升100<BR>追加效果：背击锐牙<BR>持续时间：60秒<BR>背击锐牙效果：背击獠齿的威力提升100<BR>无法与其他锐牙效果共存<BR>追加效果：获得10点灵力值<BR>发动条件：猛袭利齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，猛袭利齿变为侧击獠齿",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/24777f7ac5f5169f3ebf6b656d7cedf54d57e9a6.png",
              "name": "侧裂獠齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv30",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：340<BR>侧面攻击威力：400<BR>侧裂锐牙状态下威力提升100<BR>追加效果：背裂锐牙<BR>持续时间：60秒<BR>背裂锐牙效果：背裂獠齿的威力提升100<BR>无法与其他锐牙效果共存<BR>追加效果：获得10点灵力值<BR>发动条件：猛袭利齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，疾速利齿变为侧裂獠齿",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/c0524362f22ecb3fe78015685d2385c1cfbbe811.png",
              "name": "背击獠齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv30",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：340<BR>背面攻击威力：400<BR>背击锐牙状态下威力提升100<BR>追加效果：侧裂锐牙<BR>持续时间：60秒<BR>侧裂锐牙效果：侧裂獠齿的威力提升100<BR>无法与其他锐牙效果共存<BR>追加效果：获得10点灵力值<BR>发动条件：疾速利齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，猛袭利齿变为背击獠齿",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/2ca132552615abcd4f962ec2b32eb8b0ef6ccd50.png",
              "name": "背裂獠齿",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv30",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：340<BR>背面攻击威力：400<BR>背裂锐牙状态下威力提升100<BR>追加效果：侧击锐牙<BR>持续时间：60秒<BR>侧击锐牙效果：侧击獠齿的威力提升100<BR>无法与其他锐牙效果共存<BR>追加效果：获得10点灵力值<BR>发动条件：疾速利齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，疾速利齿变为背裂獠齿",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/d5b0fd312dbb29775aba54246dc487805eb045e7.png",
              "name": "穿裂尖牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv35",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "・威力从100变更为120。<br>・穿裂锐牙状态中的威力从120变更为140。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：120<BR>穿裂锐牙状态中威力：140<BR>追加效果：咬噬锐牙<BR>持续时间：60秒<BR>咬噬锐牙效果：咬噬尖齿的威力提升100，咬噬尖牙的威力提升20<BR>无法与穿裂锐牙效果共存",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/7ebdd1c17d9bfe7e52641396ee2c0ff944aea319.png",
              "name": "蛇行",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv40",
              "classification": "能力",
              "cast": "即时",
              "recast": "30秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "20",
              "range": "0",
              "content":
                "指定一名敌人或队员为目标，自身快速移动到目标身边<BR>积蓄次数：3<BR>止步状态下无法发动",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/2117aa184918197d460d34352b715a239d27af1d.png",
              "name": "猛袭利牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv40",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "威力从130变更为180。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：180<BR>追加效果：猛袭<BR>持续时间：40秒<BR>猛袭效果：自身发动攻击造成的伤害提高10%<BR>发动条件：咬噬尖牙或穿裂尖牙命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，咬噬尖牙变为猛袭利牙",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/c45c309beb82894d97fdb3a01afe3673cc1ec5b0.png",
              "name": "疾速利牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv45",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "威力从130变更为180。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：180<BR>追加效果：疾速<BR>持续时间：40秒<BR>疾速效果：自身的自动攻击间隔、战技与魔法的咏唱及复唱时间缩短15%<BR>发动条件：咬噬尖牙或穿裂尖牙命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，穿裂尖牙变为疾速利牙",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/a7c0917ef2eebad0e74ffceccb472348016fcb79.png",
              "name": "乱击獠牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv50",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "・威力从140变更为180。<br>・乱击锐牙状态中的威力从160变更为220。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：180<BR>乱击锐牙状态下威力提升40<BR>追加效果：乱裂锐牙<BR>持续时间：60秒<BR>乱裂锐牙效果：乱裂獠牙的威力提升40<BR>无法与其他锐牙效果共存<BR>追加效果：获得10点灵力值<BR>发动条件：猛袭利牙或疾速利牙命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，猛袭利牙变为乱击獠牙",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/6715225127c0d7b81affb5d8cbdbb81dbaac8744.png",
              "name": "乱裂獠牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv50",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "・威力从140变更为180。<br>・乱裂锐牙状态中的威力从160变更为220。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：180<BR>乱裂锐牙状态下威力提升40<BR>追加效果：乱击锐牙<BR>持续时间：60秒<BR>乱击锐牙效果：乱击獠牙的威力提升40<BR>无法与其他锐牙效果共存<BR>追加效果：获得10点灵力值<BR>发动条件：猛袭利牙或疾速利牙命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，疾速利牙变为乱裂獠牙",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/462326b75ba66828eb96e0f2d64ef7542daccf38.png",
              "name": "蛇尾术",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv55",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "0",
              "range": "0",
              "content":
                "满足发动条件后，该技能变为蛇尾击、蛇尾闪、祖灵之蛇一式、祖灵之蛇二式、祖灵之蛇三式、祖灵之蛇四式中的一种",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/42670e7db3e339182d5d65c29f7acee4319d5360.png",
              "name": "蛇尾击",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv55",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "5",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：280<BR>发动条件：侧击獠齿、侧裂獠齿、背击獠齿、背裂獠齿命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，蛇尾术变为蛇尾击",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/6931cd1152c69f96360689e0e61a8c6cabfafe46.png",
              "name": "蛇尾闪",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv60",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "威力从100变更为120。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：120<BR>发动条件：乱击獠牙或乱裂獠牙命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，蛇尾术变为蛇尾闪",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/7958ea7095b37de74593fd6d1426d74177e46536.png",
              "name": "强碎灵蛇",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv65",
              "classification": "战技",
              "cast": "即时",
              "recast": "40秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "威力从500变更为540。",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：540<BR>追加效果：飞蛇之魂<BR>最大档数：3档<BR>积蓄次数：2<BR>该战技不仅有单独计算的复唱时间，还会与强碎灵蝰共享复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/a9a91ec0b652e92408c4211e510ffca14d7498cd.png",
              "name": "猛袭盘蛇",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv65",
              "classification": "战技",
              "cast": "即时",
              "recast": "3秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "・威力从570变更为630。<br>・侧面攻击时的威力从620变更为680。",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：630<BR>侧面攻击威力：680<BR>追加效果：猛袭<BR>持续时间：40秒<BR>猛袭效果：自身发动攻击造成的伤害提高10%<BR>追加效果：连击双锐牙<BR>持续时间：30秒<BR>连击双锐牙效果：双牙连击的威力提升50<BR>追加效果：获得5点灵力值<BR>该技能命中后，双牙连术变为双牙连击，双牙乱术变为双牙乱击，可以发动2次变化后的技能<BR>发动条件：发动强碎灵蛇或疾速盘蛇<BR>该战技有单独计算的复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/2ff8a8c9e5710f229b6d3dc3e19ea40c7908cb50.png",
              "name": "疾速盘蛇",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv65",
              "classification": "战技",
              "cast": "即时",
              "recast": "3秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "・威力从570变更为630。<br>・背面攻击时的威力从620变更为680。",
              "distant": "3",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：630<BR>背面攻击威力：680<BR>追加效果：疾速<BR>持续时间：40秒<BR>疾速效果：自身的自动攻击间隔、战技与魔法的咏唱及复唱时间缩短15%<BR>追加效果：乱击双锐牙<BR>持续时间：30秒<BR>乱击双锐牙效果：双牙乱击的威力提升50<BR>追加效果：获得5点灵力值<BR>该技能命中后，双牙连术变为双牙连击，双牙乱术变为双牙乱击，可以发动2次变化后的技能<BR>发动条件：发动强碎灵蛇或猛袭盘蛇<BR>该战技有单独计算的复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/13c9698f33d48e95d53bb67e7eef68bfff122e14.png",
              "name": "强碎灵蝰",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv70",
              "classification": "战技",
              "cast": "即时",
              "recast": "40秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "威力从220变更为250。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：250<BR>追加效果：飞蛇之魂<BR>最大档数：3档<BR>积蓄次数：2<BR>该战技不仅有单独计算的复唱时间，还会与强碎灵蛇共享复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/d807e8e444e8cb313a14e04f5c4d9f3af91b9706.png",
              "name": "猛袭盘蝰",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv70",
              "classification": "战技",
              "cast": "即时",
              "recast": "3秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "威力从280变更为300。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：300<BR>追加效果：猛袭<BR>持续时间：40秒<BR>猛袭效果：自身发动攻击造成的伤害提高10%<BR>追加效果：连闪双锐牙<BR>持续时间：30秒<BR>连闪双锐牙效果：双牙连闪的威力提升30<BR>追加效果：获得5点灵力值<BR>该技能命中后，双牙连术变为双牙连闪，双牙乱术变为双牙乱闪，可以发动2次变化后的技能<BR>发动条件：发动强碎灵蝰或疾速盘蝰<BR>该战技有单独计算的复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/2425fc375286fe6776b09f0db2f020faec679bfd.png",
              "name": "疾速盘蝰",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv70",
              "classification": "战技",
              "cast": "即时",
              "recast": "3秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "威力从280变更为300。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：300<BR>追加效果：疾速<BR>持续时间：40秒<BR>疾速效果：自身的自动攻击间隔、战技与魔法的咏唱及复唱时间缩短15%<BR>追加效果：乱闪双锐牙<BR>持续时间：30秒<BR>乱闪双锐牙效果：双牙乱闪的威力提升30<BR>追加效果：获得5点灵力值<BR>该技能命中后，双牙连术变为双牙连闪，双牙乱术变为双牙乱闪，可以发动2次变化后的技能<BR>发动条件：发动强碎灵蝰或猛袭盘蝰<BR>该战技有单独计算的复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/c0a3ce4ca4284759ef6ac5592b351f6985fe4edd.png",
              "name": "双牙连术",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv75",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "0",
              "range": "0",
              "content":
                "满足发动条件后，该技能变为双牙连击、双牙连闪、飞蛇连尾击中的一种",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/0093aca28c0a2877e6fb631b24af1d0b77c46f92.png",
              "name": "双牙乱术",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv75",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "0",
              "range": "0",
              "content":
                "满足发动条件后，该技能变为双牙乱击、双牙乱闪、飞蛇乱尾击中的一种",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/7f157bebbaa01d92600ee604fbce64f969730966.png",
              "name": "双牙连击",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv75",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "5",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：120<BR>连击双锐牙状态中威力：170<BR>追加效果：猛袭盘蛇后立即发动，为自身附加乱击双锐牙状态　持续时间：30秒<BR>发动条件：猛袭盘蛇或疾速盘蛇命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，双牙连术变为双牙连击",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/d2e6fe2cd7f5e0ac0170f7aeb78639533e4f7cc7.png",
              "name": "双牙乱击",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv75",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "5",
              "range": "0",
              "content":
                "对目标发动物理攻击　威力：120<BR>乱击双锐牙状态中威力：170<BR>追加效果：疾速盘蛇后立即发动，为自身附加连击双锐牙状态　持续时间：30秒<BR>发动条件：猛袭盘蛇或疾速盘蛇命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，双牙乱术变为双牙乱击",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/94a94c69ef3f58b4b0601e1f04fdef144ad2830f.png",
              "name": "双牙连闪",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv80",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：50<BR>连闪双锐牙状态中威力：80<BR>追加效果：猛袭盘蝰后立即发动，为自身附加乱闪双锐牙状态　持续时间：30秒<BR>发动条件：猛袭盘蝰或疾速盘蝰命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，双牙连术变为双牙连闪",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/29c3f69d1f38de7049262c99da58d8ff8ba8607d.png",
              "name": "双牙乱闪",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv80",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：50<BR>乱闪双锐牙状态中威力：80<BR>追加效果：疾速盘蝰后立即发动，为自身附加连闪双锐牙状态　持续时间：30秒<BR>发动条件：猛袭盘蝰或疾速盘蝰命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，双牙乱术变为双牙乱闪",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/9b1b65c7abae88ab3c5ba775a7eda8e6afccf3b2.png",
              "name": "飞蛇之尾",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv82",
              "classification": "战技",
              "cast": "即时",
              "recast": "3.5秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "攻击复数敌人时，对目标之外的敌人威力衰减率从60％变更为75％。",
              "distant": "20",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：680<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>追加效果：连尾锐尾<BR>持续时间：60秒<BR>连尾锐尾效果：飞蛇连尾击的威力提升50<BR>该技能命中后，双牙连术变为飞蛇连尾击，双牙乱术变为飞蛇乱尾击，可以发动2次变化后的技能<BR>发动条件：飞蛇之魂<BR>该战技有单独计算的复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/07ad6a7df65952f604f164eb4ac1cb99238dd871.png",
              "name": "蛇灵气",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv86",
              "classification": "能力",
              "cast": "即时",
              "recast": "120秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "",
              "distant": "0",
              "range": "0",
              "content":
                "为自身附加飞蛇之魂状态<BR>同时附加祖灵降临预备状态<BR>持续时间：30秒<BR>发动条件：自身处于战斗状态",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/747eae977c8adbe87254c934e1e890fc54a85b50.png",
              "name": "祖灵降临",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv90",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.2秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "0",
              "range": "5",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：750<BR>攻击复数敌人时，对第一个之外的敌人威力降低75%<BR>追加效果：5档祖灵力<BR>持续时间：30秒<BR>发动条件：灵力值50点<BR>该战技有单独计算的复唱时间",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/0669ed905da6f1885333d21619a678cf6b382a72.png",
              "name": "祖灵之牙一式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv90	",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒			",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "3",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：480<BR>使用祖灵降临后发动该技能，威力提高到680<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵力<BR>该战技有单独计算的复唱时间<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，咬噬尖齿和咬噬尖牙变为祖灵之牙一式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/0c534882c858afef2cee59ccf78664dac5f5d28e.png",
              "name": "祖灵之牙二式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv90	",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒			",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "3",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：480<BR>使用祖灵之牙一式后发动该技能，威力提高到680<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵力<BR>该战技有单独计算的复唱时间<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，穿裂尖齿和穿裂尖牙变为祖灵之牙二式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/bac0b9c0fc9068b083e47d645b2db52d8888ae7e.png",
              "name": "祖灵之牙三式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv90	",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "3",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：480<BR>使用祖灵之牙二式后发动该技能，威力提高到680<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵力<BR>该战技有单独计算的复唱时间<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，猛袭盘蛇和猛袭盘蝰变为祖灵之牙三式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/718f70f8e5f985309a09171ba83bcf34fba0cbf9.png",
              "name": "祖灵之牙四式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv90	",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒			",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "3",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：480<BR>使用祖灵之牙三式后发动该技能，威力提高到680<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵力<BR>该战技有单独计算的复唱时间<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，疾速盘蛇和疾速盘蝰变为祖灵之牙四式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/fb4eb443e7d759b2e6e01ead35aa6b6dd73abf4c.png",
              "name": "飞蛇连尾击",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv92",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒			",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"",
              "changeCont": "攻击复数敌人时，对目标之外的敌人威力衰减率从60％变更为75％。",
              "distant": "20",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：120<BR>连尾锐尾状态中威力：170<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>追加效果：乱尾锐尾<BR>持续时间：60秒<BR>发动条件：飞蛇之尾命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，双牙连术变为飞蛇连尾击",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/eb4f394f15241c1820a674ba2f671d005ab431cf.png",
              "name": "飞蛇乱尾击",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv92		",
              "classification": "能力	",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "distant": "20",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：120<BR>乱尾锐尾状态中威力：170<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：飞蛇之尾命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，双牙乱术变为飞蛇乱尾击",
              "type":"",
              "changeCont": "攻击复数敌人时，对目标之外的敌人威力衰减率从60％变更为75％。",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/9c66e4147b2a5467f541734d3aedc5e0f1522b07.png",
              "name": "祖灵大蛇牙",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv96",
              "classification": "战技",
              "cast": "即时",
              "recast": "3秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "3",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：1150<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动后祖灵降临状态消失<BR>发动条件：祖灵力1档以上<BR>该战技有单独计算的复唱时间<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，祖灵降临变为祖灵大蛇牙",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/a7750d692ef417ce934373dab4f71214ca5d6676.png",
              "name": "祖灵之蛇一式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv100		",
              "classification": "能力	",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "distant": "5",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：320<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵之牙一式命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，蛇尾术变为祖灵之蛇一式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/845aa0a62b6afed88ac65e36b63ec0e171526aa4.png",
              "name": "祖灵之蛇二式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv100",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "5",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：320<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵之牙二式命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，蛇尾术变为祖灵之蛇二式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/6fbd15532cd7c980e0f5c55b40d641d64c849b17.png",
              "name": "祖灵之蛇三式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv100",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "5",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：320<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵之牙三式命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，蛇尾术变为祖灵之蛇三式",
            },
            {
              "ndes": "",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/479c9e0777b6a210f15ef8215c2bac81c1c5ffb0.png",
              "name": "祖灵之蛇四式",
              "tiurl":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
              "tnum": "Lv100",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "rangetype": '',
              "ticon": "",
              "tname": "蝰蛇剑士",
              "cost": "-",
              "type":"update",
              "changeCont": "攻击复数敌人时，对目标之外敌人的威力衰减率从80％变更为75％。",
              "distant": "5",
              "range": "5",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：320<BR>攻击复数敌人时，对目标之外的敌人威力降低75%<BR>发动条件：祖灵之牙四式命中时<BR><BR>※该技能无法设置到热键栏<BR>满足发动条件后，蛇尾术变为祖灵之蛇四式",
            },
          ]
        },
        {
          subTitle: "职能技能",
          // 可取值 8 3 2   表示当前表格列数
          subShowIcon: "true",
          // true边侧栏显示图标，false边侧栏不显示图标
          subTabNum: 8,
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType: "",
          // 标题下的描述
          subDes: "职能技能是根据职业和特职的区别所习得的各种技能。",
          //  底部注意事项
          subNotes: "",
          // 列表数据
          // 1."range"=0 rangetype配置无效 小圆
          // 2."range" !=0 并且rangetype==空 大圆
          // 3."range" !=0 并且rangetype== zhixian 直线范围
          // 4."range" !=0 并且rangetype== houshan 后方扇形
          // 5."range" !=0 并且rangetype== qianshan 前方扇形
          jobArry: [
            {
             "name": "内丹",
             "ndes": "",
             "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/2pih1KRjQsYAb_j4w7GkRFyglk.png",
             "tiurl": "",
             "tname": "",
             "ticon": [
                   {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png','tname': '近战职业'},
                   {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/oWWxUIO2KagIEhDXy0541MRD7M.png','tname': '远程物理职业'}
                 ],
             "tnum": "",
             "classification": "能力",
             "cast": "即时",
             "recast": "120秒",
             "cost": "-",
             "distant": "0",
             "rangetype": '',
             "range": "0",
             "content": "恢复自身体力<br>恢复力：800",
             "type":"",
             "changeCont": "恢复力从500变更至800"
           },
           {
             "name": "扫腿",
             "ndes": "",
             "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/h-Vwg7qPNp0rAE9sbya2c9SGC4.png",
             "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png",
             "tname": "近战职业",
             "ticon": "",
             "tnum": "Lv10",
             "classification": "能力",
             "cast": "即时",
             "recast": "40秒",
             "cost": "-",
             "distant": "3",
             "rangetype": '',
             "range": "0",
             "content": "令目标陷入眩晕状态　<br>持续时间：3秒",
             "type":"",
             "changeCont": ""
           },
           {
             "name": "浴血",
             "ndes": "",
             "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/-V15O-XUiGmZcZZepHWlHSHngQ.png",
             "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png",
             "tname": "近战职业",
             "ticon": "",
             "tnum": "Lv12",
             "classification": "能力",
             "cast": "即时",
             "recast": "90秒",
             "cost": "-",
             "distant": "0",
             "rangetype": '',
             "range": "0",
             "content": "一定时间内，将自身物理攻击所造成伤害的一部分转化为自身的体力<BR>持续时间：20秒",
             "type":"",
             "changeCont": ""
           },
           {
             "name": "牵制",
             "ndes": "",
             "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/QZtAkrjZrFAcpoQbZ4PawsdbH4.png",
             "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png",
             "tname": "近战职业",
             "ticon": "",
             "tnum": "Lv22",
             "classification": "能力",
             "cast": "即时",
             "recast": "90秒",
             "cost": "-",
             "distant": "10",
             "rangetype": '',
             "range": "0",
             "content": "一定时间内，令目标物理攻击造成的伤害降低10%，魔法攻击造成的伤害降低5%<BR>持续时间：15秒",
             "type":"",
             "changeCont": "持续时间从10秒变更至15秒"
           },
           {
             "name": "亲疏自行",
             "ndes": "",
             "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/6Y_LOLWQWJSjGvQYoaGNhNaP-I.png",
             "tiurl": "",
             "tname": "",
             "ticon": [
                   {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/rFrCBcRe9YrmPvb4fZkuFksSLw.png','tname': '防护职业'},
                   {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png','tname': '近战职业'},
                   {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/oWWxUIO2KagIEhDXy0541MRD7M.png','tname': '远程物理职业'}
                 ],
             "tnum": "Lv32",
             "classification": "能力",
             "cast": "即时",
             "recast": "120秒",
             "cost": "-",
             "distant": "0",
             "rangetype": '',
             "range": "0",
             "content": "为自身张开一个防护罩，一定时间内令除特定攻击之外其他所有击退与吸引效果失效　<br>持续时间：6秒<BR>防护罩追加效果（受到物理攻击时，发动几率100%）：攻击者减速20%　<br>持续时间：15秒",
             "type":"",
             "changeCont": ""
           },
           {
             "name": "真北",
             "ndes": "",
             "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/XZP5ljS8oyG6Fc82vyjrpY36Uk.png",
             "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png",
             "tname": "近战职业",
             "ticon": "",
             "tnum": "Lv50",
             "classification": "能力",
             "cast": "即时",
             "recast": "45秒",
             "cost": "-",
             "distant": "0",
             "rangetype": '',
             "range": "0",
             "content": "一定时间内无视技能的方向要求　<br>持续时间：10秒<BR>积蓄次数：2",
             "type":"",
             "changeCont": ""
           }                    
          ]
        },
        {
          subTitle: "特性",
          // 可取值 8 3 2   表示当前表格列数
          subTabNum: 3,
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType: "",
          // 标题下的描述
          subDes: "",
          //  底部注意事项
          subNotes: "",
          // 列表数据
          // 1."range"=0 rangetype配置无效 小圆
          // 2."range" !=0 并且rangetype==空 大圆
          // 3."range" !=0 并且rangetype== zhixian 直线范围
          // 4."range" !=0 并且rangetype== houshan 后方扇形
          // 5."range" !=0 并且rangetype== qianshan 前方扇形
          jobArry: [{
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/9e14a796df9b3cae3544d8cb2d1854bc672ad210.png",
            "name": "齿系技能效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png",
            "tnum": "Lv55 ",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可以发动蛇尾击<BR>发动条件：侧击獠齿、侧裂獠齿、背击獠齿、背裂獠齿命中时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/09630c297ad9fe64beeca174d41e2cf8c8ed559d.png",
            "name": "牙系技能效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv60 ",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可以发动蛇尾闪<BR>发动条件：乱击獠牙或乱裂獠牙命中时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/bc58b07072e258883e9e584c4e45355d092da661.png",
            "name": "技能威力提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv74 ",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "部分技能的威力提高<BR><BR>咬噬尖齿的威力：200<BR>穿裂尖齿的威力：200<BR>猛袭利齿的威力：300<BR>疾速利齿的威力：300"
          },
          {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/4b105f04e744d6a65f6ed28c75a79ec5f0151a49.png",
            "name": "蛇系技能效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv75",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可以发动双牙连击和双牙乱击<BR>发动条件：猛袭盘蛇或疾速盘蛇命中时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/2122a2b003b6dd72cc260a13a93f22097ebe07af.png",
            "name": "蝰系技能效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv80",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可以发动双牙连闪和双牙乱闪<BR>发动条件：猛袭盘蝰或疾速盘蝰命中时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/5e6639d21fbec398ad534ae0c2fe19b5f3001b4b.png",
            "name": "飞蛇之魂",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv82",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "对自身附加飞蛇之魂状态<BR>发动条件：强碎灵蛇或强碎灵蝰命中时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/1e60ee225ffece4266216964ac996c1466a8b858.png",
            "name": "蛇行效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv84",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "蛇行的积蓄次数增加到3次"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/b60557edca3b093463f0f0c0c04dc3895855e9f8.png",
            "name": "技能威力提高II",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv84",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "部分技能的威力提高<BR><BR>侧击獠齿的威力：340<BR>侧裂獠齿的威力：340<BR>背击獠齿的威力：340<BR>背裂獠齿的威力：340"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/5a6e704cdb935de113fa46e137907d9a816e5194.png",
            "name": "飞蛇之魂效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv88",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "飞蛇之魂可以积累到3档"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/026131d5e2c5bb1aab3bb492c7329cc791cc8c39.png",
            "name": "祖灵之魂",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv90",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可获得灵力值量值<BR>同时，对自身附加祖灵降临预备状态<BR>持续时间：30秒<BR>发动条件：特定战技命中时或蛇灵气发动时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/1fd453ec378516f7b77ff959e7c0714be8f82c1e.png",
            "name": "飞蛇之尾效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv92",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可以发动飞蛇连尾击和飞蛇乱尾击<BR>发动条件：飞蛇之尾命中时"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/940beb1eff18a213456848f7d19318112040ea6e.png",
            "name": "祖灵之魂效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv96",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "祖灵力可以积累到5档<BR>同时，可以发动祖灵大蛇牙<BR>发动条件：祖灵降临状态中"
          }, {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/f06c1aae31dc1d1324391254870d3b0b0a1402ea.png",
            "name": "祖灵之牙精通",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/sS2MK2LmSHGjziXHE6DIOw7_4U.png ",
            "tnum": "Lv100",
            "ndes": "",
            "tname": "蝰蛇剑士",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "可以发动祖灵之蛇一式、祖灵之蛇二式、祖灵之蛇三式、祖灵之蛇四式<BR>发动条件：分别为祖灵之牙一式、祖灵之牙二式、祖灵之牙三式、祖灵之牙四式命中时"
          }
          ]
        },
        {
          subTitle: "职能特性",
          // 可取值 8 3 2   表示当前表格列数
          subTabNum: 3,
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType: "",
          // 标题下的描述
          subDes: "职能特性是各个不同的职业・特职根据职能类别所习得的特性。",
          //  底部注意事项
          subNotes: "",
          // 列表数据
          // 1."range"=0 rangetype配置无效 小圆
          // 2."range" !=0 并且rangetype==空 大圆
          // 3."range" !=0 并且rangetype== zhixian 直线范围
          // 4."range" !=0 并且rangetype== houshan 后方扇形
          // 5."range" !=0 并且rangetype== qianshan 前方扇形
          jobArry: [{
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220223ffjob/dccd320d548ebfe264816b020f67211d2a310bb9.png",
            "name": "内丹效果提高",
            "tiurl": "",
            "tnum": "Lv94",
            "ndes": "",
            "tname": "",
            "ticon": [
              {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png','tname': '近战职业'},
              {'url':'https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/oWWxUIO2KagIEhDXy0541MRD7M.png','tname': '远程物理职业'}
            ],
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "内丹的恢复力提高到800"
          },
          {
            "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220223ffjob/dda2a9e930cb141e91f00c4f2eda5fd5e1678e07.png",
            "name": "牵制效果提高",
            "tiurl": "https://static.web.sdo.com/jijiamobile/pic/ff14/20170901battle/9muqitiUXEK0W3qnM33Nb7sATk.png",
            "tnum": "Lv98",
            "ndes": "",
            "tname": "近战职业",
            "ticon": "",
            "classification": "",
            "recast": "",
            "cost": "",
            "distant": "",
            "rangetype": '',
            "range": "",
            "cast": "",
            "type":"",
            "changeCont": "",
            "content": "牵制的持续时间延长到15秒"
          }
          ]
        },
        //以下内容配置-显示在右侧导航！！！！！！！ 以下内容是固定项必须配置 subId
        {
          subTitle: "连击",
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType: "",
          // 此内容是固定项 必须配置 subId 格式: 当前导航名称 + _ +  pve或者pvp + _ + 数字（1开始）
          subId: "viper_pve_1",
        },
        {
          subTitle: "职业量谱",
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType: "",
          // 此内容是固定项 必须配置 subId 格式: 当前导航名称 + _ +  pve或者pvp + _ + 数字（1开始）
          subId: "viper_pve_2",
        },
      ],
    },

    // PVP数据========
    pvp: {
      // 页面配色 blue green red
      bgcolor: "red",
      // 更新时间
      upTime: "2026/04/28",
      // 日本时间下描述
      job__notes__lv80caution:
        "由于版本还在不断修正改善中，具体内容以实际更新后版本为准。",
      subArry: [
        {
          subTitle: "专用技能",
          // 可取值 7 8 3 2   表示当前表格列数
          subTabNum: 7,
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType:"update",
          // 标题下的描述
          subDes: "",
          //  底部注意事项
          subNotes: "",
          // 列表数据
          // 1."range"=0 rangetype配置无效 小圆
          // 2."range" !=0 并且rangetype==空 大圆
          // 3."range" !=0 并且rangetype== zhixian 直线范围
          // 4."range" !=0 并且rangetype== houshan 后方扇形
          // 5."range" !=0 并且rangetype== qianshan 前方扇形
          jobArry: [
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/15337c3d71d35597218e0409e01081633652d23f.png",
              "name": "咬噬尖齿",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从2.4秒变更为2秒。<br>威力从3000变更为5000。",
              "content":
                "对目标发动物理攻击　威力：5000<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/dfeba44b89c0d27641837c677bb18ff423b34d40.png",
              "name": "猛袭利齿",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从2.4秒变更为2秒。<br>威力从4000变更为6000。<br>删除“追加效果：猛袭”。",
              "content":
                "对目标发动物理攻击　威力：6000<BR>连击条件：咬噬尖齿<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/a0c368a4f7ebb14a8cea1d1a344e0fc916081a3f.png",
              "name": "咬击獠齿",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从2.4秒变更为2秒。<br>威力从5000变更为7000。",
              "content":
                "对目标发动物理攻击　威力：7000<BR>连击条件：猛袭利齿<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/e59eb58734d7a36986f811450ec692e626655bec.png",
              "name": "切割尖齿",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从2.4秒变更为2秒。<br>威力从3000变更为5000。",
              "content":
                "对目标发动物理攻击　威力：5000<BR>连击条件：咬击獠齿<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/ad647f94d46f0cb3284648c436fa967aadf989a1.png",
              "name": "疾速利齿",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从2.4秒变更为2秒。<br>威力从4000变更为6000。<br>删除“追加效果：疾速”。",
              "content":
                "对目标发动物理攻击　威力：6000<BR>连击条件：切割尖齿<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/9df032ccdca8feaf3e7288acfd2dd3fdb68def20.png",
              "name": "啮噬獠齿",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从2.4秒变更为2秒。<br>威力从5000变更为7000。",
              "content":
                "对目标发动物理攻击　威力：7000<BR>连击条件：疾速利齿<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "name": "血宴灵蛇",
              "ndes": "",
              "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20250216job/viper/1a805b094cbbf2d8cba34910f919e4ed395a2786.png",
              "tiurl": "",
              "tname": "",
              "ticon": "",
              "tnum": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "10秒",
              "cost": "-",
              "distant": "5",
            "rangetype": '',
              "range": "0",
              "content": "对目标发动物理攻击　威力：10000<BR>追加效果：恢复伤害量100%的体力<BR>该技能发动后变为血宴盘蛇",
              "type":"update",
              "changeCont": "威力从8,000变更为10,000。"
          },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/c9bf1d09821271fbe0d0fa58a70b9460eb72680c.png",
              "name": "飞蛇之尾",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "20秒",
              "cost": "-",
              "distant": "20",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "攻击复数敌人时，针对目标的威力从4,000变更为8,000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：8000<BR>攻击复数敌人时，对目标之外的敌人威力降为4000<BR>该战技有单独计算的复唱时间<BR>积蓄次数：2",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/c6b4fc449bc125b8df51956cd02b4721cd94e742.png",
              "name": "追击之牙",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "0",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "追加“飞蛇乱尾击”。",
              "content":
                "满足发动条件后，该技能变为蛇尾击、双牙连击、双牙乱击、飞蛇连尾击、飞蛇乱尾击、祖灵之蛇一式、祖灵之蛇二式、祖灵之蛇三式、祖灵之蛇四式中的一种",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/1558fe95bce595ce0219cc4d24631d922c72bb81.png",
              "name": "蛇行",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "12秒",
              "cost": "-",
              "distant": "20",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"update",
              "changeCont": "移动速度的上升量从25%变更为50%。",
              "content":
                "指定一名敌人或队员为目标，自身快速移动到目标身边<BR>追加效果：自身的移动速度提高50%<BR>持续时间：4秒<BR>积蓄次数：2<BR>止步状态下无法发动",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/e07af133f3aa974349eba0f4a938631964728177.png",
              "name": "蛇鳞术",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "30秒",
              "cost": "-",
              "distant": "0",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "・威力从8,000变更为12,000。<br>・「蛇血」状态下对自身周围6米内的敌人造成的伤害倍率修正从2倍变更为1.5倍。",
              "content":
                "为自身附加蛇鳞状态<BR>持续时间：4秒<BR>蛇鳞效果：自身所受的伤害减轻50%，同时，能通过净化解除的异常状态和击退、吸引效果失效<BR>另外，持续时间内该技能变为蛇鳞击<BR>此状态下无法移动<BR>追加效果：为自身附加能够抵御一定伤害的蛇鳞甲<BR>该防护罩能够抵消相当于恢复力4000的伤害量<BR>持续时间：4秒<BR>防护罩因吸收到足够的伤害而消失时，蝰蛇剑士自身附加蛇血状态<BR>持续时间结束或发动蛇鳞击后，对自身周围6米内的敌人发动范围物理攻击<BR>威力：12000<BR>蛇血状态下，攻击范围变为15米，同时，对自身周围6米内的敌人威力变为1.5倍",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/147f8d74ae9ae599fa971b0ab6080a4690220c4f.png",
              "name": "飞蛇之魂",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "45秒",
              "cost": "-",
              "distant": "0",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "复唱时间从60秒变更为45秒。<BR>击倒敌人或拿到助攻时，该技能的复唱时间缩短从10秒变更为15秒。",
              "content":
                "重置飞蛇之尾和蛇鳞术的复唱时间<BR>击倒敌人或拿到助攻时，该技能的复唱时间缩短15秒",
            },
            
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/8f5e873cc3e905162527647b1156f0ae740b442e.png",
              "name": "祖灵之牙一式",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "1.92秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "	威力从6,000变更为8,000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：8000<BR>连击条件：吞天巨蛇<BR>发动条件：祖灵降临状态中<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/af774179732ea48f9ce9c21b0e2a7f35d58330df.png",
              "name": "祖灵之牙二式",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "1.92秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从6,000变更为8,000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：8000<BR>连击条件：祖灵之牙一式<BR>发动条件：祖灵降临状态中<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/6b755b35b9d30313dbae0a1bc153fe714668b790.png",
              "name": "祖灵之牙三式",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "1.92秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "	威力从6,000变更为8,000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：8000<BR>连击条件：祖灵之牙二式<BR>发动条件：祖灵降临状态中<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/e71fea55bada906d1f752bdcb7f1cda184978532.png",
              "name": "祖灵之牙四式",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "1.92秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从6,000变更为8,000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：8000<BR>连击条件：祖灵之牙三式<BR>发动条件：祖灵降临状态中<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "name": "血宴盘蛇",
              "ndes": "",
              "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20250216job/viper/1842fa2852ed84e6b56cf7385caabd23312e47de.png",
              "tiurl": "",
              "tname": "",
              "ticon": "",
              "tnum": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "5",
            "rangetype": '',
              "range": "0",
              "content": "对目标发动物理攻击　威力：10000<BR>连击条件：血宴灵蛇<BR>追加效果：恢复伤害量100%的体力<BR><BR>※该技能无法设置到热键栏",
              "type":"update",
              "changeCont": "威力从8,000变更为10,000。"
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/e7971a6b1359d5fb936f931f07f362247061077c.png",
              "name": "祖灵大蛇牙",
              "ndes": "",
              "classification": "战技",
              "cast": "即时",
              "recast": "2.88秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "体力吸收量从伤害量的50%变更为与伤害量的100%。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：12000<BR>追加效果：恢复伤害量100%的体力<BR>发动后祖灵降临状态消失<BR>发动条件：祖灵降临状态中<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/071377e0e1e3711012d7e0db2dc7b84b74ca9714.png",
              "name": "蛇尾击",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。",
              "content":
                "对目标发动物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：咬击獠齿或啮噬獠齿命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/e87afcce9e10bc1bf6fabb5db22d3e5644af2688.png",
              "name": "双牙连击",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。<BR>发动条件变更为血宴灵蛇命中时。",
              "content":
                "对目标发动物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：血宴灵蛇命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/6bbb676b91db09777535491b7c2bbd236b693dcb.png",
              "name": "双牙乱击",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "0",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。<BR>发动条件变更为血宴盘蛇命中时。",
              "content":
                "对目标发动物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：血宴盘蛇命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/da71d25a9c4ec075ee870a2ad5434f54d5ec141d.png",
              "name": "飞蛇连尾击",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "0.7秒",
              "cost": "-",
              "distant": "20",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。<br>复唱时间从1秒变更为0.7秒。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：飞蛇之尾命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "name": "飞蛇乱尾击",
              "ndes": "",
              "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20250216job/viper/7988ba0a7efd3045918bd5237541ec5ddef6d57a.png",
              "tiurl": "",
              "tname": "",
              "ticon": "",
              "tnum": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "0.7秒",
              "cost": "-",
              "distant": "20",
            "rangetype": '',
              "range": "5",
              "content": "对目标及其周围敌人发动范围物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：飞蛇连尾击命中时<BR><BR>※该技能无法设置到热键栏",
              "type":"",
              "changeCont": ""
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/3eded561d986ef0d88cbddc58a1203bd13392e12.png",
              "name": "祖灵之蛇一式",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：祖灵之牙一式命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/754ccf3d14880402121e03e9d6406fb938558a7b.png",
              "name": "祖灵之蛇二式",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：祖灵之牙二式命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/9ab5ad729ec0e3b515a72f1f15dcdc64b159decd.png",
              "name": "祖灵之蛇三式",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：祖灵之牙三式命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/609221c5f7e2ab86304dcc9db03fef237f414985.png",
              "name": "祖灵之蛇四式",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "1秒",
              "cost": "-",
              "distant": "5",
              "range": "5",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "威力从3000变更为4000。",
              "content":
                "对目标及其周围敌人发动范围物理攻击　威力：4000<BR>该技能不受防御的效果影响<BR>追加效果：令自身的极限槽值增长3秒的量<BR>发动条件：祖灵之牙四式命中时<BR><BR>※该技能无法设置到热键栏",
            },
            {
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/6c01119dc0bdb81236252001d0c655ad929feed1.png",
              "name": "蛇鳞击",
              "ndes": "",
              "classification": "能力",
              "cast": "即时",
              "recast": "2秒",
              "cost": "-",
              "distant": "0",
              "range": "6",
              "tiurl": "",
              "tname": "蝰蛇剑士",
              "ticon": "",
              "tnum": "",
              "rangetype": '',
              "type":"",
              "changeCont": "・威力从8,000变更为12,000。<br>・「蛇血」状态下对自身周围6米内的敌人造成的伤害倍率修正从2倍变更为1.5倍。",
              "content":
                "对自身周围的敌人发动范围物理攻击　威力：12000<BR>追加效果：将攻击所造成伤害的50%转化为自身的体力<BR>蛇血状态下，攻击范围变为15米，同时，对自身周围6米内的敌人造成的伤害高至1.5倍<BR>发动后蛇鳞和蛇血状态消失<BR>发动条件：蛇鳞状态中<BR><BR>※该技能无法设置到热键栏",
            },
          ]
        },
        {
          subTitle: "极限技",
          // 可取值 8 3 2   表示当前表格列数
          subShowIcon: "true",
          // true边侧栏显示图标，false边侧栏不显示图标
          subTabNum: 6,
          // 可取值 '' 'update' 'new' 表示标题的图片
          subType: "update",
          // 标题下的描述
          subDes:
            "在PvP战斗中，会因为战斗状态或者其他行为，逐渐积攒极限槽。<br>当极限槽积攒到最大值时，便可使用极限技。",
          //  底部注意事项
          subNotes: "",
          // 列表数据
          // 1."range"=0 rangetype配置无效 小圆
          // 2."range" !=0 并且rangetype==空 大圆
          // 3."range" !=0 并且rangetype== zhixian 直线范围
          // 4."range" !=0 并且rangetype== houshan 后方扇形
          // 5."range" !=0 并且rangetype== qianshan 前方扇形
          jobArry: [
            {
              "name": "吞天巨蛇",
              "tnum": "",
              "ticon": "",
              "tname": "蝰蛇剑士",
              "nicon":
                "https://static.web.sdo.com/jijiamobile/pic/ff14/20240923job/viper/ed95dc742df4e9795e7c0a72e18eb72d0d00293a.png",
              "tiurl": "",
              "ndes": "",
              "classification": "",
              "cast": "即时",
              "recast": "10秒",
              "cost": "-",
              "distant": "20",
              "rangetype": "",
              "range": "5",
              "content":
                "冲向目标，对目标及其周围敌人发动范围物理攻击<BR>威力：15000<BR>追加效果：祖灵降临<BR>同时，自身移动速度提高50%<BR>持续时间：20秒<BR>持续时间内，齿牙体势连击变为祖灵之牙一式，血宴灵蛇变为祖灵大蛇牙<br>追加效果：将攻击所造成伤害的50%转化为自身的体力<BR>追加效果：对目标附加毒烈状态<BR>持续时间：12秒<BR>毒烈效果：自身对目标造成的伤害提高25%<BR>追加效果：令目标陷入75%加重状态<BR>持续时间：5秒<BR>发动条件：极限槽达到最大值<BR>积蓄时间：90秒",
              "type":"update",
              "changeCont": "追加「将攻击所造成伤害的50%转化为自身的体力」效果。",
            },
          ]
        },
        {
          'subTitle': '共通技能',
          // 可取值 8 3 2   表示当前表格列数
          'subShowIcon':'true',
          // true边侧栏显示图标，false边侧栏不显示图标
          'subTabNum': 7,  
          // 可取值 '' 'update' 'new' 表示标题的图片
          'subType':'update',
          // 标题下的描述
          'subDes': '全职业共通使用的技能',
          //  底部注意事项
          'subNotes': '',
          // 列表数据
              // 1.range=0 rangetype配置无效 小圆
              // 2.range !=0 并且rangetype==空 大圆
              // 3.range !=0 并且rangetype== zhixian 直线范围
              // 4.range !=0 并且rangetype== houshan 后方扇形
              // 5.range !=0 并且rangetype== qianshan 前方扇形
          'jobArry': [
                  {
                    "name": "军用圣灵药",
                    "ndes": "",
                    "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220807job/paladin/pvpcommononlyaction01.png",
                    "tiurl": "",
                    "tname": "",
                    "ticon": "",
                    "tnum": "",
                    "classification": "能力",
                    "cast": "4.5秒",
                    "recast": "5秒",
                    "cost": "-",
                    "distant": "0",
                    "range": "0",
                    "rangetype": '',
                    "content": "令自身的体力和魔力完全恢复<BR>咏唱时若受到敌人的攻击，咏唱就会被打断",
                    "type":"",
                    "changeCont": ""
                  },
                  {
                  "name": "自愈",
                  "ndes": "",
                  "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220807job/paladin/pvpcommononlyaction02.png",
                  "tiurl": "",
                  "tname": "",
                  "ticon": "",
                  "tnum": "",
                  "classification": "能力",
                  "cast": "即时",
                  "recast": "1秒",
                  "cost": "魔力2000",
                  "distant": "0",
                  "range": "0",
                  "rangetype": '',
                  "content": "恢复自身体力　恢复力：16000",
                  "type":"update",
                  "changeCont": "体力恢复力从15,000变更为16,000。"
                },
                {
                  "name": "净化",
                  "ndes": "",
                  "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220807job/paladin/pvpcommononlyaction03.png",
                  "tiurl": "",
                  "tname": "",
                  "ticon": "",
                  "tnum": "",
                  "classification": "能力",
                  "cast": "即时",
                  "recast": "4秒",
                  "cost": "魔力2000",
                  "distant": "0",
                  "range": "0",
                  "rangetype": '',
                  "content": "解除自身的眩晕、加重、止步、沉默、冻结、自然的奇迹状态<BR>追加效果：活性<BR>持续时间：2秒<BR>活性效果：能通过净化解除的异常状态和击退、吸引效果失效<BR>除特定状态外，即使自身处于异常状态下也可以发动该技能",
                  "type":"",
                  "changeCont": "・消耗魔力从0变更为2,000。<br>・复唱时间从24秒变更为4秒。<br>・「活性」状态的持续时间从3秒变更为2秒。"
                },
                {
                  "name": "防御",
                  "ndes": "",
                  "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220807job/paladin/pvpcommononlyaction04.png",
                  "tiurl": "",
                  "tname": "",
                  "ticon": "",
                  "tnum": "",
                  "classification": "能力",
                  "cast": "即时",
                  "recast": "30秒",
                  "cost": "-",
                  "distant": "0",
                  "range": "0",
                  "rangetype": '',
                  "content": "自身所受的伤害减轻99%<BR>同时，能通过净化解除的异常状态和击退、吸引效果失效　持续时间：4秒<BR>持续时间结束，或持续时间内再次使用此技能，或发动其他技能，则会解除防御<BR>防御状态下可以移动，不过移动速度会降低33%",
                  "type":"update",
                  "changeCont": "受到伤害的减轻量从90％变更为99％。"
                },
                {
                  "name": "冲刺",
                  "ndes": "",
                  "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20220807job/paladin/pvpcommononlyaction05.png",
                  "tiurl": "",
                  "tname": "",
                  "ticon": "",
                  "tnum": "",
                  "classification": "能力",
                  "cast": "即时",
                  "recast": "1.5秒",
                  "cost": "-",
                  "distant": "0",
                  "range": "0",
                  "rangetype": '',
                  "content": "提高自身的移动速度<BR>持续时间：永久<BR>持续时间内再次使用此技能或发动其他技能，冲刺状态解除",
                  "type":"",
                  "changeCont": ""
                }
                  
          ]
          },
          {
            'subTitle': '对战职能技能',
            // 可取值 8 3 2   表示当前表格列数
            'subShowIcon':'true',
            // true边侧栏显示图标，false边侧栏不显示图标
            'subTabNum': 7,  
            // 可取值 '' 'update' 'new' 表示标题的图片
            'subType':'update',
            // 标题下的描述
            'subDes': '对战职能技能为大规模玩家对战（纷争前线、烈羽争锋）专用技能。每个职能可以选择一个对战专用职能技能。',
            //  底部注意事项
            'subNotes': '',
            // 列表数据
                // 1.range=0 rangetype配置无效 小圆
                // 2.range !=0 并且rangetype==空 大圆
                // 3.range !=0 并且rangetype== zhixian 直线范围
                // 4.range !=0 并且rangetype== houshan 后方扇形
                // 5.range !=0 并且rangetype== qianshan 前方扇形
            'jobArry': [
                   
                    {
                      "name": "浴血",
                      "ndes": "",
                    "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20190917jobguid/20250623/meleedps/3f4e049b56fe58f93ddf61cec1e4157675ad7f02.png",
                      "tiurl": "",
                      "tname": "",
                      "ticon": "",
                      "tnum": "",
                      "classification": "能力",
                      "cast": "即时",
                      "recast": "45秒",
                      "cost": "-",
                      "distant": "0",
                      "rangetype": '',
                      "range": "0",
                      "content": "自身发动攻击造成的伤害提高25%，将攻击所造成伤害的100%转化为自身的体力<br>持续时间：10秒",
                      "type":"update",
                      "changeCont": "造成伤害提高量从10%变更为25%。"
                    },
                    {
                      "name": "敏捷",
                      "ndes": "",
                      "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20190917jobguid/20250623/meleedps/4c0e196518ec2d5f7f584cc2c9824930f303a531.png",
                      "tiurl": "",
                      "tname": "",
                      "ticon": "",
                      "tnum": "",
                      "classification": "能力",
                      "cast": "即时",
                      "recast": "30秒",
                      "cost": "-",
                      "distant": "0",
                      "rangetype": '',
                      "range": "0",
                      "content": "自身的移动速度提高100%<br>同时，能通过净化解除的异常状态和击退、吸引效果失效　持续时间：4秒<br>该效果在骑乘坐骑时失效",
                      "type":"",
                      "changeCont": ""
                    },
                    {
                      "name": "猛击",
                      "ndes": "",
                      "nicon": "https://static.web.sdo.com/jijiamobile/pic/ff14/20190917jobguid/20250623/meleedps/83978e6c6cfafeb1e30bf085e884b9c2030435db.png",
                      "tiurl": "",
                      "tname": "",
                      "ticon": "",
                      "tnum": "",
                      "classification": "能力",
                      "cast": "即时",
                      "recast": "15秒",
                      "cost": "-",
                      "distant": "10",
                      "rangetype": '',
                      "range": "0",
                      "content": "对目标发动物理攻击　威力：6000～18000<br>目标剩余体力越少威力越大，25%以下威力最高<BR>击倒敌人或拿到助攻时重置复唱时间<br>技能不受防御的效果影响",
                      "type":"update",
                      "changeCont": "追加「技能不受防御的效果影响」效果。"
                    }
            ]
            },

      ],
    },
  };
})();
