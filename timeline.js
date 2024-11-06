'use strict';

(function(){ //增加axios缓存机制
    if(axios){
        let axiosCache={};
        axios.getUseCache=function(url,cacheKey){
            if(!cacheKey) cacheKey=url;
            var data=axiosCache[cacheKey];
            if(data){
                return Promise.resolve(data);
            }else{
                return new Promise(function(resolve,reject){
                    axios.get(url).then(function(res){
                        axiosCache[cacheKey]=res;
                        resolve(res);
                    }).catch(function(e){
                        reject(e);
                    })
                })
            }
        }
    }
}())

var TIME_ZONE_OFFSET=new Date().getTimezoneOffset()*60000;

Array.prototype.insertSort=function(obj,handler){
    if(!(handler instanceof Function)){
        handler=function(a,b){ return a.time<b.time }
    }
    for(var i=this.length-1;i>=0;--i){
        var t=this[i];
        if(handler(t,obj)){
            this.splice(i+1,0,obj);
            return i+1;
        }
    }
    this.splice(0,0,obj);
    return 0;
}
function copy(src,dest){
    if(dest){
        for(var prop in src){
            if(src.hasOwnProperty(prop)){
                dest[prop]=src[prop];
            }
        }
        return dest;
    }
    return JSON.parse(JSON.stringify(src));
}
function save(alldata){
    localStorage.setItem("CCINO_TIMELINE",JSON.stringify(alldata));
}
function load(){
    var data=localStorage.getItem("CCINO_TIMELINE");
    if(data){
        try{
            data=JSON.parse(data);
        }catch(e){
            console.error(e);
            data=[];
        }
    }else{
        data=[];
    }
    return data;
}
var defaultOption={
    svg:{
        width: 1200,
        height:window.innerHeight-20,
    },
    skill:{
        cd:20,
        cdOffset:0,
        width:20,
        duration:20,
        durationOffset:0,
        nameOffset:10,
        margin:20,

    }
}
var skillNameIcon={
    "翅膀":"武装戍卫",
    "幕帘":"圣光幕帘",
    "血仇":"雪仇",
    "雪仇(10)":"雪仇",
}
var autoSave=true; //自动保存，如果设置成false，则本次不会保存
var svgContainer;
var vueapp = new Vue({
    el: "#container",
    data: {
        versions:[
            {
                ver:"0.35",
                type:"update",
                date:"2024.11.06 10:00",
                info:"粗略更新一下各类技能，以及图标",
            },
            {
                ver:"0.34.51",
                type:"update",
                date:"2021.11.22 20:10",
                info:"什么意思 www.ffxivlog.cn->cn.fflogs.com",
            }
            ,{
                ver:"0.34.5",
                type:"update",
                date:"2021.11.16 14:35",
                info:"修复fflogs导入报错问题",
            },
            {
                ver:"0.34.2",
                type:"update",
                date:"2021.07.28 17:05",
                info:"1、右侧面板可以隐藏。2、修复页面整体缩小时出现的错误。",
            },
            {
                ver:"0.34.1",
                type:"update",
                date:"2021.06.09 10:46",
                info:"导入导出技能文本支持“以秒显示刻度”，由该选项控制。",
            },
            {
                ver:"0.34",
                type:"update",
                date:"2021.06.08 09:30",
                info:"增加技能打标签的功能，可以在技能上一个相对时间点做一个文本标记。",
            },
            {
                ver:"0.33",
                type:"update",
                date:"2021.06.07 18:15",
                info:"技能相关的设定修改，需要在技能设置里重新选择一次技能才可以生效。1.增加支持拖拽持续时间的功能，增加技能“圣光幕帘”的拖拽持续时间设置。2.增加多段CD显示的功能，增加技能“地星”、“天宫图”的分段CD显示设置。3.增加技能轴提取（在批量导入事件的功能里）。",
            },
            {
                ver:"0.32.2",
                type:"update",
                date:"2020.10.01 19:45",
                info:"修复了自定义技能同名无法保存的问题。",
            },
            {
                ver:"0.32.1",
                type:"update",
                date:"2020.06.22 10:20",
                info:"部分修复了插入不到技能的情况。自定义技能可以设置全部设置项。增加了用于数据清除的选项（解决奇怪的白屏问题）。修复单独冷却的GCD技能无法正常计算的问题。",
            },
            {
                ver:"0.31.5",
                type:"update",
                date:"2020.01.19 19:20",
                info:"增加按秒显示刻度功能，威力计算增加能力技。增加按alt单击增加新数据（双击可能不太好使）。增加fflogs导入外服数据支持。增加时间轴提前量。事件可以进行过滤。支持事件伤害，计算减伤等等。盾值尚未加入。",
            },
            {
                ver:"0.30",
                type:"update",
                date:"2020.01.18 17:39",
                info:"计算选择区域内的GCD技能威力（测试功能）。打开计算区域GCD威力开关后，鼠标左键选择一个区域，可以计算出技能威力。（注意，威力计算假定你所有技能达成连击要求）",
            },
            {
                ver:"0.26",
                type:"update",
                date:"2020.01.17 15:39",
                info:"增加了对积蓄次数技能的支持（测试中），这个真实伤脑细胞，最后算是兼顾效率和展示，但可能会有BUG。如果该类技能已经加到已选技能列表里，需要重新添加一次才会生效！",
            },
            {
                ver:"0.25.6",
                type:"update",
                date:'2020.01.15 10:17',
                info:"对学者和召唤的重复技能做了区分，修复了召唤技能数据不对的BUG。"
            },
            {
                ver:"0.25.4",
                type:"update",
                date:'2020.01.14 10:07',
                info:"logs数据导入增加临时缓存，现在可以导入BOSS开始读条事件（可选）。"
            },
            {
                ver:"0.25.3",
                type:"update",
                date:'2020.01.13 16:58',
                info:"增加LOGS网站数据导入功能（测试中）。增加右键拖拽画布功能。"
            },
            {
                ver:"0.24",
                type:"update",
                date:'2020.01.12 17:29',
                info:"ACT LOGS文件解析重新匹配，现在已经可以正确解析事件。增加物件对齐到开始功能。"
            },
            {
                ver:"0.23",
                type:"update",
                date:'2020.01.12 12:18',
                info:"增加批量导入事件功能，把多行事件一起导入。"
            },
            {
                ver:"0.22",
                type:"update",
                date:'2020.01.12 11:57',
                info:"增加从ACT LOGS文件中导入技能施放数据功能（测试中），发现日志中的施放时间都是整数秒，所以与实际时间肯定有较大差异，请自行调整。"
            },
            {
                ver:"0.21",
                type:"update",
                date:'2020.01.12 08:15',
                info:"已选的技能界面可拖动调整排序，可选择两个相同技能（需要修改别名）"
            },
            {
                ver:"0.20",
                type:"update",
                date:'2020.01.12 03:15',
                info:"增加了GCD安排功能，可以方便大家对应BOSS上天安排循环之类的（看看到底BOSS上天能打出几个GCD），增加了预设技能，做了一些美化。本次更新较大可能会有bug。"
            },
            {
                ver:"0.11",
                type:"update",
                date:"2020.01.10",
                info:"放大缩小时按照鼠标所在位置进行调整，事件和技能设置位置修改。增加了图表宽度设置。所有内容都可以拖动改变时间。"
            },
            {
                ver:"0.10",
                type:"create",
                date:"2020.01.09",
                info:"第一个版本以后还会在此基础上增加一系列功能，例如循环安排之类的。现在这么点功能已经用了我整整10个小时，累了吃饭了，以后再加功能把。因为是第一版，出现BUG也是正常的！"
            }
        ],
        showPannel:true,
        Math:Math,
        setting:{
            reserveCols:1, //预留技能列数量
            showTimeBySecond:false,
            inputText:"",
            inputErrMsg:"",
            selectedSkill:null,
            selectedSkillType:null,
            lastSkillIsGcd:false,
            selectRangeComputeDmg:true,
            pressDeleteKeyDeleteSelectedObject:true,
            skillSet:{
                enable:false,
                x:100,y:100,
                selectedMark:null,
                markTime:0,
            },
            eventSet:{
                enable:false,
                x:100, y:100, event:{},
            },
            importLogEventFilterRegex:"攻击",
            skillSelectSet:{
                enable:false,
                jobName:"骑士",
                userDefinedSkill:{
                    enable:false,
                    name:null, cd:null, skillType:"gcd", duration:null,new:false
                },
                selectedUserDefinedSkill:null,
                selectedSkills:{
                    job:[],jobType:[],gcd:[]
                },
                gcdDuration:2.5,
            }
        },
        jobSkillSetting:jobSkill,
        option:defaultOption,
        allGcdSkillMap:allSkillMap, //GCD技能字典
        userDefinedDatas:["userDefinedSkills","userDefinedjobTypeSkill","userDefinedJobSkill",
            "skills","gcdSkills","setting","gcdSetting","timeline"],
        userDefinedSkills:[], //用户定义的技能列表
        userDefinedjobTypeSkill:{
            坦克:[],
            奶妈:[],
            近战:[],
            远敏:[],
            魔法:[]
        },
        userDefinedJobSkill:{}, // 骑士: {  job:[], gcd:[] }
        sharingDatas:["timeline","gcdSetting","gcdSkills","skills"],
        gcdSkills:[ //已经选择的GCD技能列表
        ],
        skills:[ //已经选择的技能列表
        ],
        gcdSetting:{
            cd:2.5, //秒
            addIsInsert:false,
            dragAllMove:true, //是否可以一个GCD技能推动其他技能一起
            abilities:{//能力技能
            },
            skills:{ //gcd技能
            },
            buffs:{ //gcd产生的buff信息
            }
        },
        timeline:{
            infoWidth:500, //左侧信息宽度
            length:3000, //时间轴长度(秒)
            offset:50, //时间轴偏移量
            events:[ //事件
            ],
            skills:{ //技能
            },
            gcd:[ //gcd轴
            ],
            abilities:[ //能力技轴
            ],
            buff:[ //buff轴(指gcd产生的buff)
            ],
            buffList:[ //buff产生的增益轴

            ]
        },
        dials:{
            left:0,
            settingTick:60,
            tick: 10, //每秒多少像素
            tickRange: 10, //每条线宽度(秒)
            minLineDistance:70, //最小线间距
            maxTick:120, //最大每秒多少像素
            lines:[],
            // miniLines:[],
            lastLineIndex:-1,
            mouseY:0,
            selectedLineY:null,
            selectedRange:null,
            skillShown:null,
            top:0,
            height:2000,
        },
        drag:{
            enable:false,
            lastY:-1,
            lastX:-1,
            movingData:null,
            handler:{
                getTimeHandler:null,setTimeHandler:null,checkTimeHandler:null,mouseUpHandler:null
            },
            dragingPickedSkill:{
                index:0, type:null,
            },
            scrollingTo:null,
            scrolling:false,
        },
        hover:{
            rect:{
                enable:false,
                x:null,
                width:null,
                type:null, //event/skill
                skillIndex:null, //如果是skill
            }
        },
        selectedDataIndex:0,
        newDataName:null,
        savedDatas:load(),
        sharing:null,
        sharingText:null,
        temp:{
            hoverSkill:{
                enable:false,
                x:null, y:null
            },  //{}
            selectedActLogFile:null,
            parseDatas:null,
            importDataTypes:{
                gcd:true, job:true, event:true
            },
            parseDataEventSource:null,
            parseDatasSkillSet:{
                gcd:{},job:{}
            },
            importActLogSet:{
                enable:false
            },
            importLogsSet:{
                enable:false,
                code:"",
                selectedCode:"",
                error:{
                    status:null,error:"",
                },
                apiKey:"184a0cc2cd961346f91397dae0f38630",
                import:{
                    job:true,
                    gcd:true,
                    event:true,
                    begincast:false,
                },
                importSource:{
                    job:{},
                    gcd:{},
                    event:[],
                },
                report:{
                    fights:null,
                    selectedFight:null,
                    players:null,
                    targets:null,
                    boss:null,
                    npc:null,
                    downloading:false,
                    downloaded:false,
                    downloadedCasts:null,
                    downloadedEvents:null,
                    parsedPlayerData:null,
                },
                progress:{
                    casts:0,
                    events:0,
                }
            },
            importEventSet:{
                enable:false,
                text:"",
            }
        },
    },
    methods: {
        clearAll:function(){
            if(confirm("此功能将清除全部保存的数据，用于不明情况造成的白屏错误。是否继续？")){
                var input=prompt("将清除此页面全部数据，输入 DEL 确认");
                if(!input) return;
                if(input.toLowerCase()=="del"){
                    localStorage.clear();
                    autoSave=false;
                    alert("数据已清除");
                    location.reload();
                }
            }
        },
        importSelectedFight:function(){
            if(vueapp.temp.importLogsSet.import.event){
                vueapp.timeline.events=[];
            }
            if(vueapp.temp.importLogsSet.import.job){
                vueapp.timeline.skills={};
            }
            if(vueapp.temp.importLogsSet.import.gcd){
                vueapp.timeline.gcd=[];
            }
            var report=this.temp.importLogsSet.report;
            var importSource=this.temp.importLogsSet.importSource;
            if(vueapp.temp.importLogsSet.import.job||vueapp.temp.importLogsSet.import.gcd){
                for(var tempData of ["job","gcd"]){
                    for(var skillName in importSource[tempData]){
                        var playerId=importSource[tempData][skillName];
                        if(!playerId) continue;
                        var list=report.parsedPlayerData[playerId][tempData][skillName];
                        if(list){
                            for(var item of list){
                                if(tempData=="job"){
                                    if(!vueapp.timeline["skills"][skillName]){
                                        vueapp.timeline["skills"][skillName]=[];
                                    }
                                    vueapp.timeline["skills"][skillName].insertSort(item);
                                }else{
                                    vueapp.timeline[tempData].insertSort(item);
                                }

                            }
                        }
                    }
                }
            }
            //--事件
            if(vueapp.temp.importLogsSet.import.event){
                for(var eventSource of importSource.event){
                    for(var event of report.parsedPlayerData[eventSource].events){
                        vueapp.timeline.events.insertSort(event);
                    }
                }
            }
            alert("导入成功");
            this.cancelCurrentDownload();
            this.temp.importLogsSet.enable=false;
        },
        parseDownloadedLogFight:function(){ //解析数据
            var report=this.temp.importLogsSet.report;
            var fight=this.temp.importLogsSet.report.selectedFight;
            var importEnable=vueapp.temp.importLogsSet.import;
            var importSource=vueapp.temp.importLogsSet.importSource;
            var startTime=fight.start_time;
            var hasBeginCase=importEnable.begincast;
            // 解析为当前数据
            // 记录每个玩家事件、每个玩家各个技能数据
            report.parsedPlayerData={};
            for(var player of report.targets){
                if(!player) continue;
                report.parsedPlayerData[player.id]={
                    events:[],job:{},gcd:{}
                };
            }
            var skillTimeCache={}; // {  playerId:{skillName:time} }
            var castType={
                "cast":"施放",
                "begincast":"开始读条"
            }
            var allSkills={
                player:{},
                boss:[]
            };
            var dict={};
            if(report.fights.lang!="cn"){
                dict=skillLangDict[report.fights.lang]||{};
            }
            var regex;
            try{
                regex=new RegExp(this.setting.importLogEventFilterRegex||"攻击");
            }catch(e){
                regex=/攻击/;
            }
            for(var dataSeries of [[report.downloadedCasts,0],[report.downloadedEvents,1]]){
                var type=dataSeries[1];
                var datas=dataSeries[0];
                if(!datas) continue;
                for(var dList of datas){
                    for(var d of dList.events){
                        if(d.type=="cast"||(hasBeginCase&&d.type=="begincast")){
                            var skillName=d.ability.name;
                            var upperSkillName=skillName.toUpperCase(); //转换大写用于匹配技能字典
                            if(dict[upperSkillName]){
                                skillName=dict[upperSkillName].name;
                            }
                            if(!skillName||regex.test(skillName)){
                                continue;
                            }
                            if(report.boss[d.sourceID]){
                                if(allSkills.boss.indexOf(skillName)==-1){
                                    allSkills.boss.push(skillName);
                                }
                            }else{
                                if(!allSkills.player[d.sourceID]){
                                    allSkills.player[d.sourceID]=[];
                                }
                                if(allSkills.player[d.sourceID].indexOf(skillName)==-1){
                                    allSkills.player[d.sourceID].push(skillName);
                                }
                            }

                            //判断重复技能时间
                            if(!skillTimeCache[d.sourceID]){
                                skillTimeCache[d.sourceID]={};
                            }
                            if(d.timestamp<skillTimeCache[d.sourceID][skillName]+1000){
                                continue;
                            }
                            skillTimeCache[d.sourceID][skillName]=d.timestamp;
                            //判断重复技能时间 ---end

                            var time=d.timestamp-startTime;
                            if(type==1){
                                if(importEnable.event){
                                    if(!(report.boss[d.sourceID]||report.npc[d.sourceID])) continue;
                                    report.parsedPlayerData[d.sourceID].events.push({
                                        time:time,
                                        castType:d.type,
                                        skillName: skillName,
                                        text: report.targets[d.sourceID].name + " "+castType[d.type]+" ["+skillName+"]",
                                    })
                                    // vueapp.timeline.events.push();
                                }
                            }
                            if(type==0){
                                //根据技能名，查找技能设定的读取人员
                                if(importEnable.job||importEnable.gcd){
                                    for(var skill of vueapp.skills){
                                        if((skill.fullname||skill.name)==skillName){
                                            if(!report.parsedPlayerData[d.sourceID].job[skill.name]){
                                                report.parsedPlayerData[d.sourceID].job[skill.name]=[];
                                            }
                                            //加入job
                                            report.parsedPlayerData[d.sourceID].job[skill.name].insertSort({
                                                time:time
                                            })
                                        }
                                    }
                                    for(var skill of vueapp.gcdSkills){
                                        if((skill.fullname||skill.name)==skillName){
                                            if(!report.parsedPlayerData[d.sourceID].gcd[skill.name]){
                                                report.parsedPlayerData[d.sourceID].gcd[skill.name]=[];
                                            }
                                            //加入job
                                            report.parsedPlayerData[d.sourceID].gcd[skill.name].insertSort({
                                                time:time, skill:skill.name
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //---预选 report.players
            for(var skill of vueapp.skills){
                var maxCount=0;
                var maxPlayerId=null;
                for(var i in vueapp.temp.importLogsSet.report.parsedPlayerData){
                    var playerData=vueapp.temp.importLogsSet.report.parsedPlayerData[i];
                    var list=playerData.job[skill.name];
                    if(!list) continue;
                    var count=list.length;
                    if(count>maxCount){
                        maxCount=count;
                        maxPlayerId=i;
                    }
                }
                vueapp.temp.importLogsSet.importSource.job[skill.name]=maxPlayerId;
            }
            for(var skill of vueapp.gcdSkills){
                var maxCount=0;
                var maxPlayerId=null;
                for(var i in vueapp.temp.importLogsSet.report.parsedPlayerData){
                    var playerData=vueapp.temp.importLogsSet.report.parsedPlayerData[i];
                    var list=playerData.gcd[skill.name];
                    if(!list) continue;
                    var count=list.length;
                    if(count>maxCount){
                        maxCount=count;
                        maxPlayerId=i;
                    }
                }
                vueapp.temp.importLogsSet.importSource.gcd[skill.name]=maxPlayerId;
            }
            vueapp.temp.importLogsSet.importSource.event=[];
            for(var b of report.boss){
                if(!b) continue;
                vueapp.temp.importLogsSet.importSource.event.push(b.id);
            }
            report.downloaded=true; //下载完成
        },
        downloadSelectedFight:function(){ //下载选择的战斗数据
            var report=this.temp.importLogsSet.report;
            var fight=this.temp.importLogsSet.report.selectedFight;
            if(fight){
                report.downloading=true;
                var code=this.temp.importLogsSet.selectedCode;
                var startTime=fight.start_time;
                var endTime=fight.end_time;
                var apiKey=this.temp.importLogsSet.apiKey;
                vueapp.temp.importLogsSet.progress.casts=0;
                vueapp.temp.importLogsSet.progress.events=0;
                vueapp.temp.importLogsSet.importSource={job:{},gcd:{},event:[]};
                //casts 事件
                var getPagedData=function(start,hostility,callback,translate,dataList){
                    // if(hostility==0){
                    //     return new Promise(r=>r(testSkillData));
                    // }else{
                    //     return new Promise(r=>r(testEventData));
                    // }
                    if(!report.downloading) throw "停止下载";
                    if(!start) start=0;
                    if(!hostility) hostility=0;
                    if(dataList==null) dataList=[];
                    if(callback instanceof Function) callback(start,startTime,endTime);
                    var url="https://cn.fflogs.com/v1/report/events/casts/"+code+"?hostility="+hostility+"&start="+start+"&end="+endTime+"&api_key="+apiKey;
                    if(translate){
                        url+="&translate=true";
                    }
                    return axios.getUseCache(url).then(function(res){
                        var data=res.data;
                        dataList.push(data);
                        if(data.nextPageTimestamp){
                            return getPagedData(data.nextPageTimestamp,hostility,callback,translate,dataList);
                        }else{
                            if(callback instanceof Function) callback(endTime,startTime,endTime);
                            return dataList;
                        }
                    })
                }
                var promiseJobs=[];
                if(vueapp.temp.importLogsSet.import.job||vueapp.temp.importLogsSet.import.gcd){
                    var p=getPagedData(startTime,0,function(cur,start,end){
                        vueapp.temp.importLogsSet.progress.casts= Math.round((cur-start)/(end-start)*100);
                    }).then(function(d){
                        console.log(d); //技能数据
                        report.downloadedCasts=d;
                    });
                    promiseJobs.push(p);
                }

                if(vueapp.temp.importLogsSet.import.event){
                    var p=getPagedData(startTime,1,function(cur,start,end){
                        vueapp.temp.importLogsSet.progress.events= Math.round((cur-start)/(end-start)*100);
                    }).then(function(d){
                        console.log(d);
                        report.downloadedEvents=d;
                    });
                    promiseJobs.push(p);
                }

                Promise.all(promiseJobs).then(function(){
                    //解析数据
                    vueapp.parseDownloadedLogFight();
                }).catch(function(e){
                    console.error(e); //事件数据
                    report.downloading=false;
                    report.downloaded=false;
                    vueapp.temp.importLogsSet.error.error=e;
                })

            }
        },
        cancelCurrentDownload:function(){
            var report=this.temp.importLogsSet.report;
            report.downloading=false;
            report.downloaded=false;
            this.temp.importLogsSet.progress.casts=0;
            this.temp.importLogsSet.progress.events=0;
        },
        downLoadLogsData:function(){
            var report=this.temp.importLogsSet.report;
            report.selectedFight=null;
            vueapp.temp.importLogsSet.error={};
            vueapp.temp.importLogsSet.loading=true;
            this.cancelCurrentDownload();
            var code=this.temp.importLogsSet.code;
            var match=/reports\/(\w+)#/.exec(code);
            if(match){
                code=match[1];
            }
            if(!code){
                this.temp.importLogsSet.error={
                    error:"请输入LOGS战斗记录的CODE"
                }
                return;
            }
            this.temp.importLogsSet.selectedCode=code;
            var url="https://cn.fflogs.com/v1/report/fights/"+code+"?api_key="+this.temp.importLogsSet.apiKey;
            axios.get(url).then(function(res){
                // new Promise(r => r({data:testFightData})).then(function(res){
                vueapp.temp.importLogsSet.loading=false;
                report.fights=res.data;
                report.fights.fights.reverse();
                report.players=[];
                report.boss=[];
                report.targets=[];
                report.npc=[];
                for(var f of report.fights.friendlies){
                    if(f.type!="LimitBreak"){
                        report.players[f.id]=f;
                        report.targets[f.id]=f;
                    }
                }
                for(var f of report.fights.enemies){
                    if(f.type=="Boss"){
                        report.boss[f.id]=f;
                        report.targets[f.id]=f;
                    }else if(f.type=="NPC"){
                        report.npc[f.id]=f;
                        report.targets[f.id]=f;
                    }
                }
                vueapp.temp.importLogsSet.error={};
            }).catch(function(err){
                vueapp.temp.importLogsSet.error=err.response.data;
                vueapp.temp.importLogsSet.loading=false;
                console.error(err.response.data);
            })
        },
        alignToStart:function(type){
            if(!this.dials.selectedLineY){
                return;
            }
            var time=this.y2time(this.dials.selectedLineY-this.timelineOffset);
            var list;
            if(type=="gcd"){
                list=[this.timeline.gcd];
            }else if(type=="job"){
                list=[];
                for(var prop in this.timeline.skills){
                    var skillList=this.timeline.skills[prop];
                    list.push(skillList);
                }
            }else if(type=="event"){
                list=[this.timeline.events]
            }
            if(!list) return;

            for(var arr of list){
                for(var i=0;i<arr.length;++i){
                    var timedData=arr[i];
                    var newTime=timedData.time-time;
                    console.log(newTime,timedData.time,time);
                    if(newTime<0){
                        arr.splice(i--,1);
                    }else{
                        timedData.time=newTime;
                    }
                }
            }
        },
        batchExportSkill:function(){
            var lines=[];
            for(var skillName in this.timeline.skills){
                var skillList = this.timeline.skills[skillName];
                for(var skill of skillList){
                    lines.insertSort({time:skill.time, text:skillName});
                }
            }
            var showTimeBySecond=this.setting.showTimeBySecond;
            this.temp.importEventSet.text=lines.map(function(d){
                return (showTimeBySecond?(d.time/1000).toFixed(1):formatTime(d.time))+" \""+d.text+"\"";
            }).join("\n");
        },
        batchImportSkill:function(){
            var text=this.temp.importEventSet.text;
            var lines=text.split("\n");
            var count=0;
            let reg=/^\s*(\d+)[:：](\d{1,2})([.:：](\d+))?\s+\"(.+)\"/;
            for(var i=0;i<lines.length;++i){
                var lineStr=lines[i];
                let match=reg.exec(lineStr);
                if(match){
                    let min=+match[1];
                    let sec=+match[2];
                    let millis=+match[4];
                    let skill=match[5];
                    if(isNaN(min)) min=0;
                    if(isNaN(sec)) min=0;
                    if(isNaN(millis)) millis=0;
                    let time=millis+sec*1000+min*60*1000;
                    if(skill) skill=skill.trim();
                    if(skill){
                        if(this.insertSkill(skill, time)){
                            ++count;
                        }
                    }
                }else{
                    //可能是秒
                    var ls=lineStr.split(" ");
                    var time=+ls[0];
                    var skill=ls[1];
                    if(!skill) continue;
                    skill=skill.replace(/\"/g,"").trim();
                    if(isNaN(time)) continue;
                    if(this.insertSkill(skill, time*1000)){
                        ++count;
                    }
                }
            }
            alert("导入成功"+count+"条");
            this.temp.importEventSet.enable=false;
        },
        batchExportEvent:function(){
            var lines=[];
            for(var event of this.timeline.events){
                //lines.push(new Date(event.time+TIME_ZONE_OFFSET).format(getFormat(event.time))+" "+event.text);
                lines.push(formatTime(event.time)+" "+event.text);

            }
            this.temp.importEventSet.text=lines.join("\n");
        },
        batchImportEvent:function(){
            var text=this.temp.importEventSet.text;
            var lines=text.split("\n");
            var count=0;
            for(var i=0;i<lines.length;++i){
                if(this.insertEvent(lines[i])){
                    ++count;
                }
            }
            alert("导入成功"+count+"条");
            this.temp.importEventSet.enable=false;
        },
        importActLogFile:function(){
            if(confirm("是否确认导入？ 本次操作将完全替代现有时间轴内容。")){
                this.timeline.gcd=[];
                this.timeline.skills={};
                var skillNameSet={};

                for(var skill of this.skills){
                    skillNameSet[skill.fullname||skill.name]=skill.name;
                }
                var startTime=+vueapp.temp.parseDatas.startTimeCurrent;
                var endTime=+vueapp.temp.parseDatas.endTimeCurrent;
                for(var player in this.temp.parseDatas.datas){
                    var data=this.temp.parseDatas.datas[player];
                    var props=[];
                    if(this.temp.importDataTypes.job){
                        props.push("job");
                    }
                    if(this.temp.importDataTypes.gcd){
                        props.push("gcd");
                    }

                    for(var prop of props){
                        for(var s of data[prop]){
                            if(skill.time>endTime) break;
                            if(skill.time<startTime) continue;
                            var skill=copy(s);
                            skill.time-=startTime;
                            var name=skillNameSet[skill.name];
                            var skillPlayer=this.temp.parseDatasSkillSet[prop][skill.name];

                            if(skillPlayer==player){
                                if(prop=="gcd"){
                                    this.timeline.gcd.insertSort({
                                        time:skill.time,
                                        skill:skill.name
                                    });
                                }else{
                                    if(name&&name!=skill.name){
                                        skill.fullname=skill.name;
                                        skill.name=name;
                                    }
                                    if(!this.timeline.skills[name]){
                                        this.timeline.skills[name]=[];
                                    }
                                    this.timeline.skills[name].insertSort(skill);
                                }
                            }
                        }
                    }
                }
                //事件轴
                if(this.temp.importDataTypes.event&&this.temp.parseDataEventSource&&this.temp.parseDataEventSource.length>0){
                    for(var player of this.temp.parseDataEventSource){
                        console.log(player)
                        var checkCastLastTime={};
                        var skillList=this.temp.parseDatas.dataList[player];
                        for(var s of skillList){
                            if(s.time>endTime) break;
                            if(s.time<startTime) continue;
                            if(s.name=="攻击") continue;
                            if(s.time<checkCastLastTime[s.name]+1000){
                                continue;
                            }
                            checkCastLastTime[s.name]=s.time;
                            var skill=copy(s);
                            skill.time-=startTime;
                            this.timeline.events.push({
                                time: skill.time,
                                text: player+" 施放 ["+skill.name+"]"
                            })
                        }

                    }
                }

                if(endTime-startTime>this.timeline.length*1000){
                    this.timeline.length=(endTime-startTime)/1000+100;
                }
                this.temp.importActLogSet.enable=false;
            }
        },
        parseActLogFile:function(){
            var file=document.getElementById("actfile").files[0];
            if(file){
                var reader = new FileReader();
                //var regex = /00\|(.{33})\|\w{4}\|\|(.+)(发动了|咏唱了)“(.+)”。/;
                var regex = /21\|(.{33})\|\w{8}\|([^|]+)\|\w+\|([^|]+)\|/;
                //21|2019-12-13T23:23:58.5270000+08:00|100CD079|上条美琴|1D6B|铁壁
                reader.onload = function () {
                    let i=0,j=this.result.indexOf("\n");
                    let datas={},dataList={},allPlayers={};
                    let count=0,startTime=0,endTime;
                    // 允许记录的技能
                    let skillsEnable={};
                    for(let skill of vueapp.skills){
                        skillsEnable[skill.fullname||skill.name]=true;
                    }
                    let gcdSkillEnable={};
                    for(let skill of vueapp.gcdSkills){
                        gcdSkillEnable[skill.fullname||skill.name]=true;
                    }
                    //--------------
                    while(j!=-1){
                        var line=this.result.substring(i,j);
                        if(line.substr(0,3)=="21|"){
                            var match=regex.exec(line);
                            if(match){
                                var time=+new Date(match[1]);
                                if(count==0){
                                    startTime=time;
                                }
                                endTime=time;
                                var player=match[2];
                                var skill=match[3];
                                if(!datas[player]){
                                    datas[player]={
                                        gcd:[],job:[],
                                        gcdCount:{},jobCount:{}
                                    };
                                }
                                skill={
                                    time:time,
                                    name:skill
                                };
                                if(!allPlayers[player]){
                                    allPlayers[player]=0;
                                }
                                ++allPlayers[player];
                                var inserted=false;
                                if(skillsEnable[skill.name]){
                                    inserted=true;
                                    datas[player].job.push(skill);
                                    if(!datas[player].jobCount[skill.name]){
                                        datas[player].jobCount[skill.name]=0;
                                    }
                                    ++datas[player].jobCount[skill.name];
                                }
                                if(gcdSkillEnable[skill.name]){
                                    inserted=true;
                                    datas[player].gcd.push(skill);
                                    if(!datas[player].gcdCount[skill.name]){
                                        datas[player].gcdCount[skill.name]=0;
                                    }
                                    ++datas[player].gcdCount[skill.name];
                                }
                                if(!dataList[player]){
                                    dataList[player]=[];
                                }
                                dataList[player].push(skill);
                                ++count;
                            }
                        }
                        i=j+1;
                        j=this.result.indexOf("\n",i);
                    }
                    var players=[];
                    for(var p in datas){
                        players.push(p);
                    }
                    vueapp.temp.parseDatas={
                        dataList:dataList,
                        startTime:startTime,
                        endTime:endTime,
                        startTimeCurrent:startTime,
                        endTimeCurrent:endTime,
                        datas:datas,
                        players:players,
                        allPlayers:allPlayers
                    }
                    var skillSet={
                        gcd:{},job:{}
                    }
                    if(players.length>0){
                        var findMaxSkillPlayer=function(skill,type){
                            var name=skill.fullname||skill.name;
                            var maxCount=0,maxPlayer=players[0];
                            try{
                                for(var player of players){
                                    var count=vueapp.temp.parseDatas.datas[player][type+"Count"][name];
                                    if(count>maxCount){
                                        maxCount=count;
                                        maxPlayer=player;
                                    }
                                }
                            }catch(e){
                                console.error(e);
                            }
                            return maxPlayer;
                        }
                        for(var skill of vueapp.skills){
                            skillSet.job[skill.fullname||skill.name]=findMaxSkillPlayer(skill,"job");
                        }
                        for(var skill of vueapp.gcdSkills){
                            skillSet.gcd[skill.fullname||skill.name]=findMaxSkillPlayer(skill,"gcd");
                        }
                        Vue.set(vueapp.temp,"parseDatasSkillSet",skillSet);
                    }

                }
                reader.readAsText(file);
            }else{
                alert("请选择文件")
            }
        },
        pickedSkillDrag:function(e,i,type){
            this.drag.dragingPickedSkill.index=i;
            this.drag.dragingPickedSkill.type=type;
        },
        pickedSkillDrop:function(e,i,type){
            var oldI= this.drag.dragingPickedSkill.index;
            var oldType=  this.drag.dragingPickedSkill.type;
            if(type!=oldType){
                return;
            }
            if(i!=oldI){
                var dragingSkill=this.setting.skillSelectSet.selectedSkills[type].splice(oldI,1);
                if(i>oldI){ //后方插入
                    --i;
                }
                this.setting.skillSelectSet.selectedSkills[type].splice(i,0,dragingSkill[0]);
            }
            this.setting.skillSelectSet.selectedSkills[type] = this.setting.skillSelectSet.selectedSkills[type].filter(a => a);
        },
        onSkillHover:function(skill,e){
            this.temp.hoverSkill.enable=true;
            var newX=e.x+10;
            if(newX+320>=window.innerWidth){
                newX= window.innerWidth-320;
            }
            this.temp.hoverSkill.x=newX;
            this.temp.hoverSkill.y=e.y+10;
            this.temp.hoverSkill.skill=skill;
        },
        onMouseRightClickInPickedSkill:function(skill){
            var name=skill.name;
            name=prompt("请输入一个别名:",name);
            if(!name) return;
            while(this.setting.skillSelectSet.selectedSkills['job'].findIndex(function(a){return a.name==name})!=-1){
                name=prompt("名称重复，请输入一个别名:",name);
                if(!name) return;
            }
            if(!skill.fullname){
                skill.fullname=skill.name;
            }
            skill.name=name;
        },
        savePicked:function(){
            var selectedSkills=this.setting.skillSelectSet.selectedSkills;
            this.skills=copy(selectedSkills.job);
            this.gcdSkills=copy(selectedSkills.gcd);
            //添加gcdSetting.skills {}
            this.gcdSetting.skills={};
            for(var skill of this.gcdSkills){
                this.gcdSetting.skills[skill.name]=skill;
            }
            //gcd时间
            var gcdDuration=+this.setting.skillSelectSet.gcdDuration;
            if(!isNaN(this.gcdSetting.cd)){
                this.gcdSetting.cd=gcdDuration
            }

            //--清理timeline中无用的技能
            for(var name in this.timeline.skills){
                var i=this.skills.findIndex(function(e){
                    return e.name==name;
                });
                if(i==-1){
                    delete(this.timeline.skills[name])
                }
            }

            this.setting.skillSelectSet.enable=false;
            this.saveUserDefinedData();
        },
        unpickSkill:function(i,skillType){
            this.setting.skillSelectSet.selectedSkills[skillType].splice(i,1);
        },
        pickSkill:function(skill,skillType){
            skill=copy(skill);
            if(skill.name){
                skill.name=skill.name.replace(/@.+/,"");
            }
            var name=skill.name;
            if(skillType=="gcd"){
                if(this.setting.skillSelectSet.selectedSkills[skillType].findIndex(function(a){return a.name==name})!=-1){
                    return;
                }
            }else{
                skillType="job";
                if(!name) return;
                while(this.setting.skillSelectSet.selectedSkills['job'].findIndex(function(a){return a.name==name})!=-1){
                    name=prompt("技能重复，请输入一个别名:",name);
                    if(!name) return;
                }
                skill.fullname=skill.name;
                skill.name=name;
            }
            this.setting.skillSelectSet.selectedSkills[skillType].push(skill);
        },
        selectUserDefinedSkill:function(skill,skillType){
            this.setting.skillSelectSet.userDefinedSkill={}
            copy(skill, this.setting.skillSelectSet.userDefinedSkill);
            this.setting.skillSelectSet.userDefinedSkill.enable=true;
            this.setting.skillSelectSet.userDefinedSkill.new=false;
            this.setting.skillSelectSet.selectedUserDefinedSkill=skill;

        },
        saveUserDefinedData:function(){
            if(!autoSave) return;
            var userDefinedData={ }
            for(var dataName of vueapp.userDefinedDatas){
                userDefinedData[dataName]=vueapp[dataName];
            }
            localStorage.setItem("CCINO_TIMELINE_USERDEFINED_DATA",JSON.stringify(userDefinedData));
        },
        saveNewUserDefinedSkill:function(){
            var name=this.setting.skillSelectSet.userDefinedSkill.name;
            if(!name){
                alert("请输入技能名");
                return;
            }
            if(this.setting.skillSelectSet.userDefinedSkill.new){
                if(this.userDefinedSkills.findIndex(function(a){return a.name==name})!=-1){
                    alert("技能名不能重复");
                    return;
                }
                var newSkill=copy(this.setting.skillSelectSet.userDefinedSkill);
                this.userDefinedSkills.push(newSkill);
            }else if(this.setting.skillSelectSet.selectedUserDefinedSkill){
                //修改技能
                var skill=this.setting.skillSelectSet.selectedUserDefinedSkill;
                var newSkill=this.setting.skillSelectSet.userDefinedSkill;
                if(this.userDefinedSkills.findIndex(function(a){
                    return a.name==name&&a!=skill
                })!=-1){
                    alert("技能名不能重复");
                    return;
                }
                copy(newSkill,skill);
                var skillType=newSkill.skillType;
                //--列表中全部删除
                let deleteFunc=function(list){
                    let i=list.findIndex(function(e){ return e==skill.name});
                    if(i>=0) list.splice(i,1);
                }
                //职能技能
                for(let jobTypeName in this.userDefinedjobTypeSkill){
                    let jobList=this.userDefinedjobTypeSkill[jobTypeName];
                    deleteFunc(jobList);
                }
                //职业技能
                for(let jobTypeName in this.userDefinedJobSkill){
                    let jobSkill=this.userDefinedJobSkill[jobTypeName]
                    deleteFunc(jobSkill.job);
                    deleteFunc(jobSkill.gcd);
                }
                skill.name=newSkill.name;
            }
            //添加到列表中
            var skillType=this.setting.skillSelectSet.userDefinedSkill.skillType;
            var jobName=this.setting.skillSelectSet.jobName;
            if(skillType=="jobType"){
                var jobType=jobSkill[jobName].type;
                this.userDefinedjobTypeSkill[jobType].push(name);
            }else{
                if(!this.userDefinedJobSkill[jobName])
                    Vue.set(this.userDefinedJobSkill,jobName,{
                        job:[],gcd:[]
                    });
                this.userDefinedJobSkill[jobName][skillType].push(name);
            }
            this.setting.skillSelectSet.userDefinedSkill.name="";
            this.cancelSaveUserDefinedSkill();
            this.saveUserDefinedData();

        },
        cancelSaveUserDefinedSkill:function(){
            this.setting.skillSelectSet.userDefinedSkill.enable=false;
            this.setting.skillSelectSet.userDefinedSkill.new=false;
            this.setting.skillSelectSet.selectedUserDefinedSkill=null;
        },
        addNewUserDefinedSkill:function(){
            this.setting.skillSelectSet.userDefinedSkill={
                enable:true, name:null, cd:null, fullname:null,
                skillType:this.setting.skillSelectSet.userDefinedSkill.skillType,
                duration:null,new:true
            }
        },
        checkAbilityTime:function(time,name){ //判断能力技CD
            var ability=this.gcdSetting.abilities[name]||{};
            var offsetTime=(ability.cd||0)*1000;
            var maxTime=time+offsetTime; //该时间产生的技能CD的时间
            for(var i=0;i<this.timeline.abilities.length;++i){
                var abil=this.timeline.abilities[i];
                if(abil.ability!==name)  //判断是否相同技能
                    continue;
                var startTime=abil.time;
                var endTime=startTime+offsetTime;
                if(time>=startTime&&time<=endTime
                    || startTime>=time&&startTime<=maxTime){
                    return false;
                }
                if(maxTime<startTime){
                    break;
                }
            }
            return true;
        },
        deleteGcd:function(i){//删除GCD
            this.timeline.gcd.splice(i,1);
        },
        changeGcdTime:function(gcd,time,i,forceDown,dragAllMove){//改变GCD时间
            if(forceDown){
                var up=false;
                time=gcd.time;
            }else{
                if(time==gcd.time) return;
                var up=time<gcd.time;
            }
            var down=!up;
            if(up&&i>0 || down&&i<this.timeline.gcd.length-1){
                var newI=up?i-1:i+1;
                var g=this.timeline.gcd[newI];
                var cd=this.gcdSetting.cd*1000;
                var singleCd=this.getGcdCd(up?this.timeline.gcd[i-1].skill:gcd.skill);
                if(singleCd){//具有单独CD
                    cd=singleCd;
                }
                var checkTime=g.time+(up?cd:-cd);
                if(down^time<checkTime){
                    //无法移动
                    if(this.gcdSetting.dragAllMove||dragAllMove){ //推动全部
                        var t=this.changeGcdTime(g,time+(up?-cd:cd),newI,false,dragAllMove);
                        if(t<=0||t>=this.timeline.length*1000){
                            return -1;
                        }
                    }else{
                        return gcd.time;
                    }
                }
                //允许移动，检查相同GCD技能
                // if(gcdCd){ //具有单独gcd
                //     var siblingGcd;
                //     if(up){
                //         siblingGcd=this.getLastGcdSkill(gcd.skill,i,gcdCd);
                //     }else{
                //         siblingGcd=this.getNextGcdSkill(gcd.skill,i,gcdCd);
                //     }
                //     if(siblingGcd){ //时间范围内有相同GCD技能
                //         //无法移动
                //         if(this.gcdSetting.dragAllMove||dragAllMove){ //推动全部
                //             var t=this.changeGcdTime(siblingGcd[0],time+(up?-gcdCd:gcdCd),siblingGcd[1],false,dragAllMove);
                //             if(t<=0||t>=this.timeline.length*1000){
                //                 return -1;
                //             }
                //         }else{
                //             return gcd.time;
                //         }
                //     }
                // }
            }else{ //两侧可以直接移动
                if(time<0||time>this.timeline.length*1000){
                    return -1;
                }
            }
            gcd.time=time;;
            return time;
        },
        getGcdCd:function(gcdName){ //获得gcd技能的cd
            if(this.gcdSetting.skills[gcdName]){
                if(this.gcdSetting.skills[gcdName].cd){
                    return Math.floor(this.gcdSetting.skills[gcdName].cd*100)*10;
                }
            }
        },
        getLastGcdSkill:function(name,i,limit){
            //获得小于该索引的最近一条gcd技能
            var currentGcd=this.timeline.gcd[i];
            if(!limit) limit=currentGcd.time;
            for(--i;i>=0;--i){
                var gcd=this.timeline.gcd[i];
                if(currentGcd.time-gcd.time>limit)
                    break;
                if(gcd.skill==name){
                    return [gcd,i];
                }
            }
        },
        getNextGcdSkill:function(name,i,limit){
            var currentGcd=this.timeline.gcd[i];
            if(!limit) limit=this.timeline.gcd[this.timeline.gcd.length-1].time;
            for(++i;i<this.timeline.gcd.length;++i){
                var gcd=this.timeline.gcd[i];
                if(gcd.time-currentGcd.time>limit)
                    break;
                if(gcd.skill==name){
                    return [gcd,i];
                }
            }
        },
        /**
         * 在当前选择的时间点增加一条GCD技能
         * @param {String} name GCD技能名
         * @param {Boolean} isInsert 是否插入（如果插入，后续所有技能时间++)
         * @returns {Number} 实际插入的时间
         */
        addGcdSkill:function(name,isInsert){
            var y=this.dials.selectedLineY;
            if(!y) y=this.timelineOffset;
            var time=this.y2time(y-this.timelineOffset);
            time=this.addGcdSkillAtTime(time,name,isInsert);
            this.dials.selectedLineY=this.time2yOffset(time);
            return time;
        },
        /**
         * 在此时间增加一条GCD技能，会在此时间往后查找一个合适的空隙进行插入
         * 返回插入的确切时间
         * @param {Number} time 时间
         * @param {String} name GCD技能名
         * @param {Boolean} isInsert 是否插入（如果插入，后续所有技能时间++)
         * @returns {Number} 实际插入的时间
         */
        addGcdSkillAtTime:function(time,name,isInsert){
            for(var i=0,len=this.timeline.gcd.length;i<len;++i){
                var gcd=this.timeline.gcd[i];
                var gcdDuration=this.gcdSetting.cd*1000; //gcd时间
                var maxGcdTime=gcd.time+gcdDuration; //本次技能CD转好时间
                if(maxGcdTime<time){
                    continue;
                }
                var insertingCd=this.getGcdCd(name); //当前插入技能的CD
                var minGcdTime=gcd.time-gcdDuration;
                if(time<minGcdTime){
                    // 检查技能CD
                    if(insertingCd){ //具有单独的CD
                        var nextSameGcd=this.getNextGcdSkill(name,i,insertingCd);
                        if(nextSameGcd){ //CD时间内找到相同技能
                            time=nextSameGcd[0].time+insertingCd; //延后再试
                            continue;
                        }
                    }
                    break;
                }
                if(isInsert){
                    //将后续技能全部后调
                    var diff=time-minGcdTime;
                    var lastTime=time;
                    var lastCd=gcdDuration;
                    for(;i<len;++i){
                        gcd=this.timeline.gcd[i];
                        var dd=(gcd.time-(lastTime+lastCd));
                        lastTime=gcd.time;
                        if(diff-dd<=0){
                            break;
                        }else{
                            if(dd>0) diff-=dd;
                            gcd.time+=diff;
                        }
                        lastCd=Math.floor(((this.gcdSetting.skills[gcd.skill]||{}).cd||this.gcdSetting.cd||2.5) * 100)  * 10;
                    }
                    break;
                }else{
                    time=maxGcdTime;
                }
            }
            var insertedGcd={
                time:time,
                skill:name
            };
            var insertedIndex=this.timeline.gcd.insertSort(insertedGcd,function(a,b){return a.time<b.time})
            if(isInsert){
                this.changeGcdTime(insertedGcd,0,insertedIndex,true,true);
            }
            return time;
        },
        getSkillIcon:function(skill){
            if(!skill) return;
            if(skill.icon) return skill.icon;
            var iconname=skillNameIcon[skill.name]||skill.fullname||skill.name;
            iconname=iconname.replace(/@.+/,"");
            return "./icons/skill/"+iconname+".png";
        },
        getGcdIcon:function(skillName){
            if(skillName){
                skillName=skillName.replace(/@.+/,"");
            }
            return "./icons/skill/"+skillName+".png";
        },

        selectLine:function(){
            this.dials.selectedLineY=this.dials.mouseY;
        },
        onSelectMark:function(m){
            Vue.set(this.setting.selectedSkill,"selectedMark",m);
            this.setting.skillSet.markType=m.type;
            this.setting.skillSet.markTime=m.time;
            this.setting.skillSet.markText=m.text;
        },
        cancelAllSelect:function(){
            this.setting.selectedSkillType=null;
            this.setting.selectedSkill=null;
            this.setting.eventSet={enable:false};
            this.setting.skillSet={enable:false};
            this.dials.selectedLineY=null;
            this.dials.selectedRange=null;
        },
        onSelectSkillType:function(skill,i){
            this.cancelAllSelect();
            this.setting.selectedSkillType=skill;
        },
        deleteSelectedSkill:function(){
            if(this.setting.selectedSkill){
                var skill=this.setting.selectedSkill.skill;
                var skillList=this.timeline.skills[skill.name];
                var i=skillList.findIndex(function(a){return a==vueapp.setting.selectedSkill.skillInfo});
                if(i>=0){
                    skillList.splice(i,1);
                    if(skill.count>1){
                        vueapp.checkSkillTime(skill,skillList[i].time,i,true,skillList[i]);
                    }
                }
                this.cancelAllSelect();
            }
        },
        onSkillRightClick:function(skillInfo,skill,i){
            if(this.setting.selectedSkill && skillInfo==this.setting.selectedSkill.skillInfo){
                this.setting.selectedSkill=null;
            }
        },
        onSelectSkill:function(skillInfo,skill,i,evt){
            this.cancelAllSelect();
            this.setting.selectedSkill={
                skillInfo:skillInfo,
                skill:skill,
            }
            Object.assign(this.setting.skillSet,{
                enable:true,
                selectedMark:null,
                markTime:0,
                x:evt.x+this.option.skill.width,
                y:evt.y+20});
        },
        addMarkOnSkill:function(skillInfo,time,text,type){
            if(skillInfo==null){
                alert("请选择一个具体的技能");
                return;
            }
            if(time==null) time=0;
            if(text==null) text="";
            if(type==null) type="short";
            if(this.setting.selectedSkill.selectedMark){
                Object.assign(this.setting.selectedSkill.selectedMark,{
                    time:time, text:text, type:type
                })
            }else{
                if(skillInfo.marks==null)
                    Vue.set(skillInfo,"marks",[]);
                skillInfo.marks.push({
                    time:time, text:text, type:type
                });
            }
        },
        onClearInput:function(){
            this.setting.inputText="";
            this.setting.inputErrMsg="";
        },
        deleteSelectedEvent:function(){
            if(this.setting.eventSet.event){
                var event=this.setting.eventSet.event;
                var i=this.timeline.events.findIndex(function(e){return e==event});
                if(i>=0){
                    this.timeline.events.splice(i,1);
                }
                this.setting.eventSet={enable:false}
            }
        },
        onEventClick:function(e,evt){
            this.cancelAllSelect();
            Object.assign(this.setting.eventSet,{
                enable:true,
                x:100,
                y:evt.y+20,
                event:e});
        },
        enterEvent:function(){ //插入新事件
            if(this.insertEvent(this.setting.inputText)){
                this.setting.inputText="";
                this.setting.inputErrMsg="";
            }else{
                this.setting.inputErrMsg="格式错误";
            }
        },
        insertEvent:function(lineStr){ //插入新事件
            let reg=/^\s*(\d+)[:：](\d{1,2})([.:：](\d+))?\s+(.*)/.exec(lineStr);
            if(reg){
                let min=+reg[1];
                let sec=+reg[2];
                let millis=+reg[4];
                let info=reg[5];
                if(isNaN(min)) min=0;
                if(isNaN(sec)) min=0;
                if(isNaN(millis)) millis=0;
                let time=millis+sec*1000+min*60*1000;
                if(info) info=info.trim();
                if(info){
                    this.timeline.events.insertSort({
                        time:time,
                        text:info,
                    },function(a,b){ return a.time<b.time })
                    return true;
                }
            }
        },
        /**
         * 用于计算技能在某时间，某index插入数据，
         * 插入后的技能，具有多少累计使用次数
         * 如果返回值count<0 则说明累计次数不允许使用
         * 该方法不计算后续技能是否允许
         * @param {Skill} skill 技能实例
         * @param {*} time 时间点
         * @param {*} i 时间轴该时间的插入索引
         * @param {*} lastSkillData 上一次技能数据（如果给与此值，将忽略插入索引）
         */
        computeSkillTimeCount:function(skill,time,i,lastSkillData){
            var s={time:time};
            if(!skill) return s;
            if(skill.count>1){
                var cd=skill.cd*1000;
                if(lastSkillData||i>0){ //如果有上次技能
                    var list=this.timeline.skills[skill.name];
                    var lastSkillData=lastSkillData||list[i-1];
                    if(lastSkillData){
                        var diffTime=time-lastSkillData.time; //间隔时间
                        diffTime-=lastSkillData.remainToAdd;
                        if(diffTime>0){
                            var addCount=Math.floor(diffTime/(cd))+1+lastSkillData.count;
                            diffTime=diffTime%cd;
                            if(addCount>=skill.count){
                                s.count=skill.count-1;
                                s.remainToAdd=cd;
                            }else{
                                s.count=addCount-1;
                                s.remainToAdd=cd-diffTime;
                            }
                        }else{ //直接消耗
                            s.remainToAdd=-diffTime;
                            s.count=lastSkillData.count-1;
                        }
                    }
                }else{ //无上次技能，则直接设置为cd时间
                    s.count=(skill.count-1);
                    s.remainToAdd=cd;
                }
            }
            return s;
        },
        /**
         * 检测该技能时间轴后续技能是否符合count要求
         * @param {Skill} skill 技能实例
         * @param {*} data 时间轴数据
         * @param {*} i 索引
         */
        checkSkillCount:function(skill,data,i){
            if(data.count>=0){
                var list=this.timeline.skills[skill.name];
                var newList={}; //用于记录新数据
                while(i<list.length){
                    var s=list[i];
                    var newData=this.computeSkillTimeCount(skill,s.time,i,data);
                    newList[i]=newData;
                    if(newData.count>=skill.count){
                        break;
                    }
                    if(newData.count<0){
                        return false;
                    }
                    data=newData;
                    ++i;
                }
                //允许设置
                for(var i in newList){
                    var newData=newList[i];
                    list[i]=newData;
                }
                return true;
            }
            return false;
        },
        insertNew:function(){//插入新元素
            console.log("insertNew")
            //判断当前位置
            if(this.hover.rect.enable){
                if(this.dials.mouseY){
                    var time=this.y2time(this.dials.mouseY-this.timelineOffset);
                    if(this.hover.rect.type=="event"){
                        var text=prompt("输入事件内容","");
                        if(text){
                            this.timeline.events.insertSort({
                                time:time,
                                text:text,
                            },function(a,b){ return a.time<b.time })
                        }
                    }else if(this.hover.rect.type=="skill" && this.hover.rect.skillIndex>=0){
                        var skill=this.skills[this.hover.rect.skillIndex];
                        this.insertSkill(skill,time);
                    }
                }
            }
        },
        insertSkill:function(skill,time){//尝试插入技能，并返回是否成功
            if(typeof(skill)=="string"){
                var si=this.skills.findIndex(function(d){
                    return (d.name||d.fullname)==skill;
                });
                skill=this.skills[si];
            }
            if(skill){
                if(!this.timeline.skills[skill.name]){
                    this.timeline.skills[skill.name]=[];
                }
                var list=this.timeline.skills[skill.name];
                var index=list.findIndex(function(e){
                    return e.time>time;
                });
                var insertData={
                    time:time
                };
                if(!skill.cd){//无CD直接插入
                    list.insertSort(insertData,function(a,b){ return a.time<b.time });
                    return true;
                }
                if(index==-1) index=list.length;
                if(this.checkSkillTime(skill,time,index,false,insertData)){
                    list.insertSort(insertData,function(a,b){ return a.time<b.time });
                    return true;
                }
            }else{
                console.error("找不到技能");
            }
            return false;
        },
        setTick:function(tick){//设置每秒像素数
            if(tick<1) {
                tick=1;
            }else if(tick>this.dials.maxTick) {
                tick=this.dials.maxTick;
            }
            //取出当前mouse所在time
            var mouseT=this.y2time(this.dials.mouseY);
            var mouseY=this.dials.mouseY;
            var diffY=mouseY-svgContainer.scrollTop;
            //设置tick
            this.dials.tick=tick;
            this.dials.tickRange=Math.ceil(this.dials.minLineDistance/tick);
            //获得time所在位置
            var newMouseY=this.time2y(mouseT);
            var newScrollTop=newMouseY-diffY;
            if(newScrollTop>=0){
                svgContainer.scroll(svgContainer.scrollLeft,newScrollTop);
                this.dials.mouseY=newMouseY;
            }
            this.dials.lastLineIndex=-1;
        },
        y2time:function(y){ //通过y计算时间
            return y / this.dials.tick * 1000;
        },
        time2y:function(time){ //通过时间计算y
            return time/1000*this.dials.tick;
        },
        time2yOffset:function(time){ //通过时间计算y
            return time/1000*this.dials.tick+this.timelineOffset;
        },
        second2y:function(time){ //通过时间计算y
            return time*this.dials.tick;
        },
        checkSkillTime:function(skill,time,index,indexThis,originData){   //index: 插入的间隙   0  1  2 | 3  4  => 3
            var skills=this.timeline.skills[skill.name];
            //技能不允许越过其上下的技能
            var lastSkill=skills[index-1]||{time:-this.timeline.offset};
            var nextSkill=skills[indexThis?index+1:index]||{time:99999999};
            if(time<=lastSkill.time||time>nextSkill.time) {
                return false;
            }
            if(skill.count>1){
                var insertData=this.computeSkillTimeCount(skill,time,index); //根据上次技能得出本次技能应有的count 和时间
                if(this.checkSkillCount(skill,insertData,indexThis?index+1:index)){ //判断该count是否满足后续技能的需求
                    if(originData) {
                        mergeObj(originData,insertData);
                    }
                    return true;
                }
            }else{
                if(!skill.cd) return true;

                var offsetTime=skill.cd*1000;
                //根据index计算
                // 判断上一个技能是否完成CD
                //var count = skill.count>1?skill.count:1;
                if(index>=1){
                    var lastSkill=skills[index-1];
                    if(time<lastSkill.time+offsetTime){
                        return false;
                    }
                }
                //判断下一个技能是否在本次CD范围
                if(indexThis) ++index; //如果index是本次，则直接index+1判断下一次
                if(index<skills.length){
                    var timeEnd=time+offsetTime; //该时间产生的技能CD的时间
                    var nextSkill=skills[index];
                    if(nextSkill.time<timeEnd){
                        return false;
                    }
                }
                return true;
            }
        },
        //-------------移动到技能安排上
        skillOnHover:function(skillInfo,skill,flag){
            if(flag){
                this.dials.skillShown={
                    skillInfo:skillInfo
                }
            }else{
                this.dials.skillShown=undefined;
            }
        },
        /**
         * 简单的拖拽事件方法，要求data必须有time属性，结束时sort
         * @param {Event}} e 事件
         * @param {{time:String}} data
         */
        onMouseDragSimple:function(e,data){
            this.onMouseDrag(e,data,
                function(d){return d.time},
                function(d,time){d.time=time},
                function(){return true},function(){
                    vueapp.timeline.events.sort(function(a,b){return a.time-b.time});
                });
        },
        /**
         * 简单的拖拽时间方法，要求data必须有time属性
         * @param {Event}} e 事件
         * @param {{time:String}} data
         */
        onMouseDragSimpleCheck:function(e,data,checkTimeHandler){
            this.onMouseDrag(e,data,
                function(d){return d.time},
                function(d,time){d.time=time},
                checkTimeHandler);
        },
        /**
         * 拖拽time属性
         * @param {Event} e 事件
         * @param {*} data 数据(只有mousedown中使用)
         * @param {Function} getTimeHandler 获取time属性方法(只有mousedown中使用)
         * @param {Function} setTimeHandler 设置time属性方法(只有mousedown中使用)
         * @param {Function} checkTimeHandler 检查time属性是否允许的方法(只有mousedown中使用)
         */
        onMouseDrag:function(e,data,getTimeHandler,setTimeHandler,checkTimeHandler,mouseUpHandler){
            if(e.type=="mousedown"){
                this.drag.enable=true;
                this.drag.lastY=e.offsetY;
                this.drag.lastX=e.offsetX;
                this.drag.movingData=data;
                this.drag.handler.getTimeHandler=getTimeHandler;
                this.drag.handler.setTimeHandler=setTimeHandler;
                this.drag.handler.checkTimeHandler=checkTimeHandler;
                this.drag.handler.mouseUpHandler=mouseUpHandler;
            }else if(e.type=="mousemove"&&this.drag.enable){
                var dy=e.offsetY-this.drag.lastY;
                if(this.drag.handler.getTimeHandler){
                    var newTime=this.drag.handler.getTimeHandler(this.drag.movingData)+this.y2time(dy);
                }
                //---检测newTime是否有冲突
                if((!this.drag.handler.checkTimeHandler)||this.drag.handler.checkTimeHandler(this.drag.movingData,newTime)){
                    this.drag.handler.setTimeHandler(this.drag.movingData,newTime,e);
                    this.drag.lastY=e.offsetY;
                    this.drag.lastX=e.offsetX;
                }
            }else if(e.type=="mouseup"){
                this.drag.enable=false;
                this.drag.lastY=-1;
                if(this.drag.handler.mouseUpHandler instanceof Function){
                    this.drag.handler.mouseUpHandler(this.drag.movingData);
                }
                this.drag.movingData=null;
                this.drag.handler={};
            }
        },
        /**
         * 根据开始时间和结束时间，计算buff加成时间点
         * @param {Number} startTime
         * @param {Number} endTime
         */
        computeBuffList:function(startTime,endTime){
            var buffList=[];
            /* {  记录加伤减伤变化的轴
                time: 时间点, increaseNormal: 25, increaseMagic: 0, increaseCri:0,
                reduceDmg:20, reduceMagic:20, addShield:3000
            } */
            //加入buff轴
            var props=["increaseNormal","increaseMagic","increaseCri",
                "reduceDmg","reduceMagic","reduceNormal","addShield"];
            var reduceProp={};
            for(var p of props){
                if(p.indexOf("reduce")!=-1)
                    reduceProp[p]=true;
            }
            for(var skill of this.skills){
                if(skill.duration>0){ //必须有持续时间
                    var skillData={};
                    var all=0;
                    for(var p of props){
                        skillData[p]=skill[p]||0;
                        all+=skillData[p];
                    }
                    var duration=skill.duration*1000;
                    if(all==0) continue; //必须有增益
                    var line=this.timeline.skills[skill.name];
                    if(!line) continue;
                    for(var i=0;i<line.length;++i){
                        var lineData=line[i];
                        if(lineData.time+duration<startTime||lineData.time>endTime)
                            continue; //不在选择时间范围内 跳过
                        var startBuff={ time:lineData.time };
                        for(var p of props){
                            startBuff[p]=+skillData[p];
                        }
                        buffList.insertSort(startBuff);
                        if(lineData.time+duration<=endTime){
                            var endBuff={ time:lineData.time+duration };
                            for(var p of props){
                                endBuff[p]=-skillData[p];
                            }
                            buffList.insertSort(endBuff);
                        }
                    }
                }
            }
            if(buffList.length>0){
                var sumBuff=copy(buffList[0]);
                for(var p of props){ //将减伤类buff设置为数组
                    if(reduceProp[p]){
                        sumBuff[p]=[sumBuff[p]];
                        buffList[0][p]=[buffList[0][p]];
                    }
                }
                for(var i=1;i<buffList.length;++i){
                    var buff=buffList[i];
                    for(var p of props){
                        if(reduceProp[p]){
                            if(buff[p]>0){ //减伤进数组
                                sumBuff[p].push(buff[p])
                            }else{ //负值（去掉减伤，从数组删除）
                                var buffIndex=sumBuff[p].indexOf(-buff[p]);
                                if(buffIndex!=-1){
                                    sumBuff[p].splice(buffIndex,1);
                                }
                            }
                        }else{
                            sumBuff[p]+=buff[p];
                        }
                    }
                    for(var p of props){
                        if(reduceProp[p]){
                            buff[p]=copy(sumBuff[p]);
                        }else{
                            buff[p]=sumBuff[p];
                        }
                    }
                }
            }
            console.log(buffList);
            return buffList;
        },
        clearSelectRange:function(){
            this.timeline.buffList=null;
            for(var gcd of this.timeline.gcd){
                gcd.dmg=undefined;
                gcd.addDmg=undefined;
            }
            for(var skillName in this.timeline.skills){
                var timeline=this.timeline.skills[skillName];
                if(timeline){
                    for(var lineData of timeline){
                        if(lineData.dmg){
                            lineData.dmg=undefined;
                            lineData.addDmg=undefined;
                        }
                    }
                }
            }
            for(var event of this.timeline.events){
                event.reduceDmg=undefined;
                event.trueDmg=undefined;
            }
        },
        /**
         * 计算时间轴数据dmg值，返回全部dmg
         * @param {{time:Number}} lineData 时间轴中的一个数据
         * @param {*} timeline 所属时间轴
         * @param {*} skill 技能数据
         */
        computeLineDataDmg:function(lineData,timeline,skill,buff,startTime,endTime){
            if(lineData.time<startTime) return 0;
            if(lineData.time>endTime) return 0;
            if(skill){
                lineData.dmg=skill.dmg||0;
                lineData.dmgType=skill.dmgType;
                lineData.dot=0;
                //计算dot
                if(skill.dot>0){
                    //获得dot结束时间 持续结束时间，或分段结束时间 取较小值
                    var dotEndTime=Math.min(lineData.time+skill.duration*1000,endTime);
                    //计算此时间内是否有另一个相同dot技能（如果有则取到该技能时间）
                    for(var j=i+1;j<timeline.length;++j){
                        var nextLineData=timeline[j];
                        if(nextLineData.time>dotEndTime) break; //超过dot结束时间不再查询
                        if(nextLineData.skill==lineData.skill){ //相同lineData技能
                            dotEndTime=nextLineData.time-1; break; //设置结束时间
                        }
                    }
                    var dotCount=Math.floor((dotEndTime-lineData.time)/3000);
                    lineData.dot=skill.dot*dotCount;
                    lineData.dotCount=dotCount;
                }

                var addDmg=0,addDot=0;
                if(buff){
                    if(skill.dmgType=='物理'){
                        addDmg=lineData.dmg*(buff.increaseNormal/100);
                        if(lineData.dotCount>0) {
                            addDot=lineData.dot*(buff.increaseNormal/100);
                        }
                    }else if(skill.dmgType=='魔法'){
                        addDmg=lineData.dmg*(buff.increaseMagic/100);
                        if(lineData.dotCount>0){
                            addDot=lineData.dot*(buff.increaseMagic/100);
                        }
                    }
                    addDmg+=lineData.dmg*((buff.increaseCri/100)*0.35);
                    if(lineData.dotCount>0){
                        addDot+=lineData.dot*((buff.increaseCri/100)*0.35);
                    }
                }
                lineData.addDmg=Math.floor(addDmg);
                lineData.addDot=Math.floor(addDot);
            }
            return (lineData.dmg||0)+(lineData.addDmg||0)+(lineData.addDot||0)+(lineData.dot||0);
        },
        computeCurrentBuff:function(buffListData,lineData){
            while(buffListData.buffList[buffListData.buffIndex]&&buffListData.buffList[buffListData.buffIndex].time<lineData.time){
                buffListData.buff=buffListData.buffList[buffListData.buffIndex];
                ++buffListData.buffIndex;
            }
        },
        computeSelectedRangeDmg:function(){
            var range=this.dials.selectedRange;
            var startTime=this.y2time(Math.min(range.y,range.oy)-this.timelineOffset);
            var endTime=this.y2time(Math.max(range.y,range.oy)-this.timelineOffset);
            //计算时间轴buff加成
            var buffList=this.computeBuffList(startTime,endTime);
            this.timeline.buffList=buffList;
            var buffListData={ buffIndex:0, buff:null, buffList:buffList}
            var dmgAll=0;
            //计算GCD技能威力
            for(var i=0;i<this.timeline.gcd.length;++i){
                var gcd=this.timeline.gcd[i];
                if(gcd.time<startTime) continue;
                if(gcd.time>endTime) break;
                var gcdSkill=this.gcdSkills[this.gcdSkills.findIndex(function(a){return a.name==gcd.skill})];
                //计算下一个buff
                this.computeCurrentBuff(buffListData,gcd)
                var dmg=this.computeLineDataDmg(gcd,this.timeline.gcd,gcdSkill,buffListData.buff,startTime,endTime)
                dmgAll+=dmg;
            }
            //计算能力技能威力
            for(var skill of this.skills){
                if(skill.dmg>0||skill.dot>0){
                    buffListData={buffIndex:0, buff:null, buffList:buffList}
                    var timeline=this.timeline.skills[skill.name];
                    if(timeline){
                        for(var i=0;i<timeline.length;++i){
                            var lineData=timeline[i];
                            if(lineData.time<startTime) continue;
                            if(lineData.time>endTime) break;
                            this.computeCurrentBuff(buffListData,lineData);
                            var dmg=this.computeLineDataDmg(lineData,timeline,skill,buffListData.buff,startTime,endTime)
                            dmgAll+=dmg;
                        }
                    }
                }
            }
            range.dmgAll=dmgAll;
            var sumReduceDmgFunc=function(p,c){
                console.log(p,c,Math.round((1-(1-p/100)*(1-c/100))*10000)/100);
                return Math.round((1-(1-p/100)*(1-c/100))*10000)/100;
            };
            buffListData={buffIndex:0, buff:null, buffList:buffList}
            //计算BOSS技能威力 盾值 减伤
            for(var event of this.timeline.events){
                if(event.time<startTime) continue;
                if(event.time>endTime) continue;
                if(event.dmg>0){
                    var dmg=+event.dmg;
                    if(isNaN(dmg)){
                        event.dmg=0;
                        continue;
                    }
                    if(event.dmgType=="true") continue;
                    this.computeCurrentBuff(buffListData,event);
                    var buff=buffListData.buff;
                    if(buff && buff.reduceDmg instanceof Array){
                        var dmgPercent=1;
                        try{
                            dmgPercent=(1-buff.reduceDmg.reduce(sumReduceDmgFunc,0)/100);
                            if(event.dmgType=="magic"){ //魔法攻击
                                dmgPercent*=(100-buff.reduceMagic.reduce(sumReduceDmgFunc,0))/100;
                            }else{ //物理攻击
                                dmgPercent*=(100-buff.reduceNormal.reduce(sumReduceDmgFunc,0))/100;
                            }
                        }catch(e){console.error(e)}
                        //盾值
                        event.reduceDmg=Math.round(dmg*(1-dmgPercent)+buff.addShield);
                        event.trueDmg=Math.round(dmg*dmgPercent-buff.addShield);
                    }
                }
            }
        },
        selectTimeRange:function(e){ //左键框选区域
            if(vueapp.setting.selectRangeComputeDmg){
                vueapp.dials.selectedRange={
                    oy:e.offsetY,
                    ox:e.offsetX,
                    y:e.offsetY,
                    x:e.offsetX,
                }
                vueapp.onMouseDrag(e,vueapp.dials.selectedRange,null,function(data,time,e){ //拖动
                    data.y=e.offsetY;
                    data.x=e.offsetX;
                },null,function(data){ //放开
                    if(data.oy==data.y){
                        vueapp.dials.selectedRange=null;
                        vueapp.dials.selectedLineY=data.y;
                    }else{
                        if(vueapp.setting.selectRangeComputeDmg){
                            vueapp.computeSelectedRangeDmg();
                        }
                    }
                })
                setTimeout(function(){
                    vueapp.clearSelectRange();
                })

            }
        },
        scrollOnMouseDrag:function(e){ //右键拖动画布
            this.drag.scrollingTo=null;
            this.drag.scrolling=true;
            this.onMouseDrag(e,{
                oy:e.offsetY,
                ox:e.offsetX,
                dx:0,dy:0,
                scrollTop:svgContainer.scrollTop,
                scrollLeft:svgContainer.scrollLeft,
            },function(d){return d.time},function(d,time,e){
                d.dy=d.oy-e.offsetY;
                d.dx=d.ox-e.offsetX;
                d.scrollTop+=d.dy;
                d.scrollLeft+=d.dx;
                svgContainer.scrollTop=d.scrollTop;
                svgContainer.scrollLeft=d.scrollLeft;
            },null,function(d){
                vueapp.drag.scrolling=false;
                //移动速度
                vueapp.drag.scrollingTo={
                    y:d.dy*1.2
                }
                var timer=setInterval(function(){
                    if(vueapp.drag.scrollingTo){
                        vueapp.drag.scrollingTo.y*=0.97;
                        d.scrollTop+=vueapp.drag.scrollingTo.y;
                        svgContainer.scrollTop=d.scrollTop;
                        if(vueapp.drag.scrollingTo.y<=1&&vueapp.drag.scrollingTo.y>=-1||d.scrollTop<=0){
                            vueapp.drag.scrollingTo=null;
                            clearInterval(timer);
                            timer=undefined;
                        }
                    }else{
                        clearInterval(timer);
                        timer=undefined;
                    }
                },30);
            })
        },
        gcdOnMouseDrag:function(e,gcd,i){
            this.onMouseDrag(e,gcd,function(d){return d.time},
                function(d,time){
                    vueapp.changeGcdTime(d,time,i)
                },function(d){return true});
        },
        //skillOnMouseDrag(skillInfo,skill,true,$event,skillIndex)
        skillOnMouseDrag:function(skillInfo,skill,flag,e,index){//拖拽技能
            this.onMouseDrag(e,{
                skillInfo:skillInfo,skill:skill, index:index
            },function(data){
                return data.skillInfo.time;
            },function(data,time){
                data.skillInfo.time=time;
            },function(data,time){
                return vueapp.checkSkillTime(data.skill,time,data.index,true,data.skillInfo)
            },function(data){
            })
        },
        //skillDurationSliderOnMouseDrag(skillInfo,skill,true,$event,skillIndex)
        skillDurationSliderOnMouseDrag:function(skillInfo,skill,flag,e,index){//拖拽技能可拖动作用范围区域
            if(!skill.durationSlideRange){ //如果没有可拖拽作用范围设定，则直接调用上面普通拖拽技能
                this.skillOnMouseDrag(skillInfo,skill,flag,e,index);
            }else{ //拖拽作用范围
                this.onMouseDrag(e,{
                    skillInfo:skillInfo,skill:skill, index:index
                },function(data){
                    return (skillInfo.slideTime||0);
                },function(data,time){
                    data.skillInfo.slideTime = time;
                },function(data,time){
                    return (time)>=0 && (time)<=skill.durationSlideRange*1000;
                },function(data){
                })
            }
        },
        //-------------鼠标滚动
        onMouseWheelScale:function(e){
            if(e.wheelDelta>0){
                this.setTick(this.dials.tick*1.2);
            }else{
                this.setTick(this.dials.tick*0.8);
            }
        },
        //-------------鼠标移动
        onSvgMouseMove:function(e){
            //-- 纵轴
            this.dials.mouseY=e.offsetY;
            //-- 横轴
            var x=e.offsetX;
            if(x>=70&&x<this.timeline.infoWidth-10){
                this.hover.rect.x=70;
                this.hover.rect.width=this.timeline.infoWidth-80;
                this.hover.rect.type="event";
                this.hover.rect.enable=true;
            }else{
                var skillWidth=this.skillOption.all;
                var infoWidth=+this.timeline.infoWidth;
                if(x>=infoWidth&&x<infoWidth+skillWidth*(this.skills.length+this.setting.reserveCols)){
                    var colX=Math.floor((x-infoWidth)/skillWidth);
                    this.hover.rect.skillIndex=colX-this.setting.reserveCols;
                    this.hover.rect.type="skill";
                    this.hover.rect.x=infoWidth+colX*skillWidth-this.skillOption.margin/2;
                    this.hover.rect.width=this.skillOption.all;
                    this.hover.rect.enable=true;
                }else{
                    this.hover.rect.enable=false;
                }
            }
        },
        //-------------滚动动态设置线
        onSvgScroll:function(e){
            var height=e.target.clientHeight;
            var top=e.target.scrollTop;
            this.dials.left=e.target.scrollLeft;
            this.dials.height=height;
            this.dials.top=top;
        },

        //-------------------------------数据储存部分
        dataSave:function(){
            if(this.newDataName&&this.newDataName.length>0){
                var data=copy(this.getAllData());
                data.name=this.newDataName;
                var i=this.savedDatas.push(data);
                this.selectedDataIndex=this.savedDatas.length-1;
                this.newDataName="";
                save(this.savedDatas);
            }else{
                if(this.selectedDataIndex>=0&&this.selectedDataIndex<this.savedDatas.length){
                    var name=this.savedDatas[this.selectedDataIndex].name;
                    var data=copy(this.getAllData());
                    Vue.set(this.savedDatas,this.selectedDataIndex,data);
                    data.name=name;
                    save(this.savedDatas);
                }
            }
        },
        dataLoad:function(slince){
            if(this.selectedDataIndex>=0&&this.selectedDataIndex<this.savedDatas.length){
                var savedData=copy(this.savedDatas[this.selectedDataIndex]);
                for(var prop of this.sharingDatas){
                    this[prop]=mergeObj(this[prop],savedData[prop]);
                }
            }else{
                if(!slince)
                    alert("请选择一个存档");
            }
        },
        dataDelete:function(){
            if(this.selectedDataIndex>=0&&this.selectedDataIndex<this.savedDatas.length){
                var savedData=this.savedDatas[this.selectedDataIndex];
                if(confirm("是否确认删除该存档["+savedData.name+"] ?")){
                    this.savedDatas.splice(this.selectedDataIndex,1);
                    save(this.savedDatas);
                }
            }else{
                alert("请选择一个存档");
            }
        },
        dataShare:function(){
            this.sharing=true;
            if(this.selectedDataIndex>=0&&this.selectedDataIndex<this.savedDatas.length){
                var savedData=this.savedDatas[this.selectedDataIndex];
                this.sharingText=JSON.stringify(savedData,null,2);
            }
        },
        clearData:function(){
            this.sharingText="";
        },
        importData:function(){
            try{
                var data=JSON.parse(this.sharingText);
                this.savedDatas.push(data);
                this.sharing=false,
                    alert("导入成功");
                save(this.savedDatas);
            }catch(e){
                alert("数据格式不正确");
            }
        },
        getAllData:function(){
            var data={};
            for(var prop of this.sharingDatas){
                data[prop]=this[prop];
            }
            return data;
        },
        init:function(){
            svgContainer=document.getElementById("svg_container");
        },
        isRegex:function(regex){
            try{
                new RegExp(regex);
                return true;
            }catch(e){
                return false;
            }
        }
    },
    computed:{
        timelineOffset:function(){
            return 50+this.time2y(this.timeline.offset);
        },
        allUserDefinedSkillMap:function(){
            var allSkillMap={}; //技能map
            for(var i=0;i<this.userDefinedSkills.length;++i){
                var skill=this.userDefinedSkills[i];
                allSkillMap[skill.name]=skill;
            }
            return allSkillMap;
        },
        userDefinedJobSkillRef:function(){
            let jobSkillRef={};
            for(let jobName in this.jobSkillSetting){ //加工职业技能
                var jobType=jobSkill[jobName].type;
                var jobSkillLists=this.userDefinedJobSkill[jobName]||{gcd:[],job:[]};
                var job={
                    type:jobType,
                    skills:{
                        jobType:[],
                        job:[],
                        gcd:[],
                    }
                }
                jobSkillRef[jobName]=job;
                //增加职能技能
                var jobTypeSkillList=this.userDefinedjobTypeSkill[job.type];
                for(var i=jobTypeSkillList.length-1;i>=0;--i){
                    var skillName=jobTypeSkillList[i];
                    var skill=this.allUserDefinedSkillMap[skillName];
                    if(skill){
                        job.skills.jobType.push(skill);
                    }else{
                        jobTypeSkillList.splice(i,1);
                    }
                }
                //增加职业技能
                for(var i=jobSkillLists.job.length-1;i>=0;--i){
                    var skillName=jobSkillLists.job[i];
                    var skill=this.allUserDefinedSkillMap[skillName];
                    if(skill){
                        job.skills.job.push(skill);
                    }else{
                        jobSkillLists.job.splice(i,1);
                    }
                }
                //增加职业的GCD技能
                for(var i=jobSkillLists.gcd.length-1;i>=0;--i){
                    var skillName=jobSkillLists.gcd[i];
                    var skill=this.allUserDefinedSkillMap[skillName]||{name:skillName};
                    if(skill){
                        job.skills.gcd.push(skill);
                    }else{
                        jobSkillLists.gcd.splice(i,1);
                    }
                }
            }
            return jobSkillRef;
        },
        skillOption:function(){
            return {
                width: +this.option.skill.width,
                margin: +this.option.skill.margin,
                all:(+this.option.skill.width)+(+this.option.skill.margin),
            }
        },
        dialsLines:function(){
            var top=this.dials.top-this.timelineOffset;
            var height=this.dials.height;
            var tick=this.dials.tick*this.dials.tickRange;
            var lineIndex=Math.floor(top/tick);
            if(lineIndex!==this.dials.lastLineIndex){
                //tickRange
                this.dials.lastLineIndex=lineIndex;
                var y=lineIndex*tick;
                var maxY=top+height;
                var lines=[];
                for(var i=0;y<=maxY;y+=tick){
                    var time=y/this.dials.tick*1000;
                    var text;
                    if(this.setting.showTimeBySecond||time<0){
                        text=(Math.round(time)/1000).toFixed(1);
                    }else{
                        text=formatTime(time); //new Date(Math.round(time)+TIME_ZONE_OFFSET).format(getFormat(time))
                    }
                    lines.push({
                        i:i,
                        y:y,
                        text:text
                    })
                }
                this.dials.lines=lines;
            }
            return [ this.dials.lines, this.dials.miniLines ];
        },
        svgHeight:function(){
            return this.timeline.length*this.dials.tick;
        },
        shownSkillInfo:function(){
            var infos=[];
            if(this.dials.skillShown){
                infos.push(this.dials.skillShown);
            }
            if(this.drag.movingSkillInfo){
                infos.push({skillInfo: this.drag.movingSkillInfo});
            }
            if(this.setting.selectedSkill){
                infos.push(this.setting.selectedSkill);
            }
            return infos;
        }
    },
    filters:{
        timeFormat:(time,fmt)=>{
            if(vueapp.setting.showTimeBySecond||time<0){
                return (Math.round(time)/1000).toFixed(1);
            }
            if(fmt){
                return new Date(time+TIME_ZONE_OFFSET).format(fmt);
            }
            return formatTime(time);
        },
        skillNameFilter:function(skillName){
            if(skillName){
                return skillName.replace(/@.+/,"");
            }
        }
    }
});

function getFormat(time){
    if(time>3600000){
        return "h:mm:ss.fff";
    }else{
        return "mm:ss.fff";
    }
}
function formatTime(time){
    var h,m,s,f;
    if(time>3600000){
        h=Math.floor(time/3600000);
        time-=h*3600000;
    }
    if(time>60000){
        m=Math.floor(time/60000);
        if(m<10){
            m="0"+m;
        }
        time-=m*60000;
    }else{
        m="00";
    }
    if(time>1000){
        s=Math.floor(time/1000);
        if(s<10){
            s="0"+s;
        }
        time-=s*1000;
    }else{
        s="00";
    }
    f=padLeft(Math.floor(time)+"","0",3);
    return h>0?(h+":"+m+":"+s+"."+f):(m+":"+s+"."+f);
}
/*
function setUserDefinedData(data, dataName) {
  return new Promise((resolve, reject) => {
    console.log('setUserDefinedData start', dataName)
Vue.set(vueapp, dataName, data[dataName]);
    vueapp.$nextTick(() => {
      console.log('setUserDefinedData end', dataName)
      setTimeout(resolve, 1000)

    })
  })
}
*/
function loadUserDefinedData() {
    var data = localStorage.getItem("CCINO_TIMELINE_USERDEFINED_DATA");
    if (data) {
        try {
            data = JSON.parse(data);
            if (data) {
                //var promise = Promise.resolve();
                for (let dataName of vueapp.userDefinedDatas) {
                    if (data[dataName]) {
                        //promise = promise.then(() => { return setUserDefinedData(data, dataName) })
                        Vue.set(vueapp, dataName, data[dataName]);
                    }
                }
                let selectedSkills = vueapp.setting.skillSelectSet.selectedSkills;
                for (let k in selectedSkills) {
                    selectedSkills[k] = selectedSkills[k].filter(a => a);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}
loadUserDefinedData();
vueapp.dials.lastLineIndex=-99999; //刷新一次刻度
vueapp.init();
vueapp.setting.reserveCols=1;
window.addEventListener("beforeunload",function(){
    vueapp.saveUserDefinedData();
})
window.addEventListener("resize",function(){
    vueapp.option.svg.height=window.innerHeight-20;
})

document.addEventListener('keydown', function(evt){
    var code=evt.code;
    if(!code) return;
    var subcode=code.substr(0,5);
    if(subcode=="Digit"){
        code=code.substr(5);
    }else if(subcode=="Numpa"){
        var right=code.substr(6);
        if(right.length==1)
            code="Num "+right
        else
            code="Num "+evt.key;
    }else if(subcode=="Arrow"){
        code=code.substr(5);
    }else{
        code=evt.key;
        if(code.length==1)
            code=code.toUpperCase();
    }
    if(evt.key!="Control"&&evt.key!="Shift"&&evt.key!="Alt"){
        var str=(evt.ctrlKey?"Ctrl+":"")+(evt.shiftKey?"Shift+":"")+(evt.altKey?"Alt+":"")+code;
        console.log(str);
    }
    if(str=="Delete" && vueapp.setting.pressDeleteKeyDeleteSelectedObject){
        //删除选择内容
        if(vueapp.setting.eventSet.event){
            vueapp.deleteSelectedEvent();
        }
        if(vueapp.setting.selectedSkill){
            vueapp.deleteSelectedSkill();
        }
    }
    //evt.preventDefault();
    return false;
}, false);

/*
    TODO:


 */
