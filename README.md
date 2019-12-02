# act_dps_show
for ff14 
dps美化模板，时不时的会更新。
使用方式：
 1. 打开ACT->插件->伤害统计美化
 2. 美化模板路径里填写 https://ccinos.gitee.io/act_dps_show/
 3. 点击重新加载
![使用方式](https://ccinos.gitee.io/act_dps_show/readme/settoact.png)

目前功能：
 1. 点击圆点可以最小化，只保留标题行
 2. 双击标题行可以进入设置页面，自定义展示内容
 3. 标题行显示的内容是：  #自己dps排名 自己dps/全队dps

默认样式:  
![默认样式](https://ccinos.gitee.io/act_dps_show/readme/default.png)
 
最小化:  
![最小化](https://ccinos.gitee.io/act_dps_show/readme/minitype.png)

按职业排序:  
![按职业排序](https://ccinos.gitee.io/act_dps_show/readme/sortbyjob.png)

使用职业颜色代替职能颜色:  
![使用职业颜色代替职能颜色](https://ccinos.gitee.io/act_dps_show/readme/colorbyjob.png)

动画效果:  
![动画效果](https://ccinos.gitee.io/act_dps_show/readme/animate.gif)

自定义显示内容设置:  
![自定义显示内容设置](https://ccinos.gitee.io/act_dps_show/readme/setting.png)

---
### 有建议可以发送到 5327373@qq.com 直接加q也可以


# 推荐配置

## 导入配置方法

![导入](https://ccinos.gitee.io/act_dps_show/readme/optionimport.png)
![导入](https://ccinos.gitee.io/act_dps_show/readme/importpage.png)

### 极简配置
![极简配置](https://ccinos.gitee.io/act_dps_show/readme/sortbyjob.png)
```json
{"nameColumnWidth":20,"series":[{"name":"伤害","showColumnHeader":true,"columns":[
{"name":"DPS","value":"dps","round":true,"size":"25","textAlign":"center"},
{"name":"HPS","value":"enchps","prefix":"","size":"25","round":true,"textAlign":"center"},
{"name":"死","value":"deaths","suffix":"","textAlign":"center","size":"20"}],
"orderBy":0,"orderAsc":false}]}
```
---
### 综合显示
![默认样式](https://ccinos.gitee.io/act_dps_show/readme/default.png)
```json
{"nameColumnWidth":30,"series":[{"name":"综合","columns":
[{"value":"dps","name":"DPS","round":true,"size":"15","textAlign":"center"},
{"name":"HPS","value":"enchps","round":true,"size":"15","textAlign":"center"},
{"name":"过量","value":"OverHealPct","prefix":"过","size":"12","textAlign":"center"},
{"name":"承伤","value":"damagetaken-*","prefix":"承","size":"12","textAlign":"center"},
{"name":"倒地","value":"deaths","suffix":"死","textAlign":"center","size":"10"}],
"orderBy":0,"orderAsc":false}]}
```

# 配置详解

```javascript
{
    fontSize:13,  //字体大小(px)
    showColumnHeader:false, //是否显示列的标题
    nameColumnWidth:30, //名字列宽度
    backgroundAlpha:30, //数据条透明度（0完全透明 100不透明）
    useJobColor:false,  //使用职业颜色（false:职能颜色）
    orderByJob:false, //根据职业排序（false:使用排序列排序，例如dps）
    jobColor:{ //职业颜色配置
        Blm:"#A579D6", //黑魔
        Mnk:"#d69c00", //武僧
        Sam:"#e46d04", //武士
        Mch:"#6EE1D6", //机工
        Nin:"#AF1964", //忍者
        Drg:"#4164CD", //龙骑
        Smn:"#2D9B78", //召唤
        Brd:"#91BA5E", //诗人
        Dnc:"#E2B0AF", //舞者
        Rdm:"#e87b7b", //赤魔
        Gnb:"#796D30", //枪刃
        Pld:"#A8D2E6", //骑士
        War:"#cf2621", //战士
        Drk:"#D126CC", //暗骑
        Whm:"#FFF0DC", //白魔
        Sch:"#8657FF", //学者
        Ast:"#FFE74A" //占星
    },
    colors:{ //颜色配置
        tank:"#8080ff", //职能颜色 T
        dps:"#ff8080", //职能颜色 dps
        healer:"#80ff80", //职能颜色 奶
        background:"rgba(0,0,0,0.2)" //整体背景颜色
    },
    series:[{ //系列
            name:"伤害", //系列名（如果有多个系列，则会在标题上显示可点击切换的系列名）
            columns:[{ //系列字段
                    name:"DPS", //字段名（如果显示列标题，则会显示在最上面）
                    value:"dps", //显示属性
                    round:true, //是否取整
                    size:20, //宽度% （图标5%+名字宽度+列宽度=100%）
                },{
                    name:"直击",
                    value:"DirectHitPct",
                    prefix:"直", //前缀
                    size:15,
                },{
                    name:"暴击",
                    value:"crithit%",
                    prefix:"暴",
                    size:15,
                },{
                    name:"倒地",
                    value:"deaths",
                    suffix:"死", //后缀
                    textAlign:"center" //文字对齐 left center right
                }
            ],
            orderBy:0, //排序列序号 从0开始
            orderAsc:false, //true从小到大 false从大到小
        },{
            name:"奶量",
            showColumnHeader:true, //该系列强制显示标题
            columns:[{
                    name:"HPS",
                    value:"enchps",
                    round:true,
                    size:20,
                },{
                    name:"过量",
                    value:"OverHealPct",
                    prefix:"过",
                    size:15,
                },{
                    name:"承伤",
                    value:"damagetaken-*",
                    prefix:"承",
                    size:15,
                },{
                    name:"倒地",
                    value:"deaths",
                    suffix:"死",
                    textAlign:"center"
                }
            ],
            orderBy:0,
            orderAsc:false,
        }
    ]
}
```

