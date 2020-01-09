'use strict';
Array.prototype.insertSort=function(obj,handler){
    if(!(handler instanceof Function)){
        handler=function(a,b){ return a<b }
    }
    for(var i=0;i<this.length;++i){
        var t=this[i];
        if(handler(obj,t)){
            this.splice(i,0,obj);
            return;
        }
    }
    this.push(obj);
}
function copy(data){
    return JSON.parse(JSON.stringify(data));
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
    "雪仇":"血仇",

}
var vueapp = new Vue({
    el: "#container",
    data: {
        versions:[
            {
                ver:"0.10",
                type:"create",
                date:"2020.01.19",
                info:"第一个版本以后还会在此基础上增加一系列功能，例如循环安排之类的。现在这么点功能已经用了我整整10个小时，累了吃饭了，以后再加功能把。"
            }
        ],
        setting:{
            inputText:"",
            inputErrMsg:"",
            selectedEvent:null,
            selectedSkill:null,
            selectedSkillType:null,
        },
        option:defaultOption,
        skills:[
            {
                name:"铁壁",
                cd:90,
                duration:20,
                icon:"",
            },
            {
                name:"血仇",
                cd:60,
                duration:5,
                icon:"",
            },
            {
                name:"预警",
                cd:120,
                duration:10,
            }
        ],
        timeline:{
            infoWidth:500, //左侧信息宽度
            length:3000, //时间轴长度(秒)
            offset:50, //时间轴偏移量
            events:[
            ],
            skills:{
            }
        },
        dials:{
            settingTick:60,
            tick: 20, //每秒多少像素
            tickRange: 5, //每条线宽度(秒)
            minLineDistance:70, //最小线间距
            maxTick:120, //最大每秒多少像素
            lines:[],
            miniLines:[],
            lastLineIndex:-1,
            mouseY:0,
            skillShown:null,
            top:0,
            height:2000,
        },
        drag:{
            enable:false,
            lastY:-1,
            movingSkillInfo:null,
            movingSkill:null,
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
    },
    methods: {
        getSkillIcon:function(skill){
            var iconname=skillNameIcon[skill.name]||skill.fullname||skill.name;
            return "./icons/skill/"+iconname+".png";
        },
        deleteSkillType:function(){
            if(this.setting.selectedSkillType&&!this.setting.selectedSkillType.new){
                var name=this.setting.selectedSkillType.name;
                if(confirm("是否确认删除["+name+"]?")){
                    var i=this.skills.findIndex(function(s){ return s==vueapp.setting.selectedSkillType});
                    this.timeline.skills[name]=null;
                    if(i>=0){
                        this.skills.splice(i,1);
                    }
                    this.setting.selectedSkillType=null;
                }
            }
        },
        saveNewSkill:function(){
            if(this.setting.selectedSkillType.new){
                if(this.setting.selectedSkillType.name){
                    if(this.timeline.skills[name]){
                        alert("技能名不能重复");
                        return;
                    }
                    var skill={
                        name:this.setting.selectedSkillType.name,
                        cd:this.setting.selectedSkillType.cd||0,
                        duration:this.setting.selectedSkillType.duration||0,
                        icon:this.setting.selectedSkillType.icon,
                        fullname:this.setting.selectedSkillType.fullname,
                    }
                    this.timeline.skills[name]=[];
                    this.skills.push(skill);
                    this.setting.selectedSkillType=null;
                }else{
                    alert("请输入技能名称");
                }
            }
        },
        cancelSaveSkill:function(){

        },
        newSkillType:function(){
            this.setting.selectedSkillType={
                new:true,
                name:"",
            }
        },
        cancelAllSelect:function(){
            this.setting.selectedSkillType=null;
            this.setting.selectedSkill=null;
            this.setting.selectedEvent=null;
        },
        onSelectSkillType:function(skill,i){
            this.cancelAllSelect();
            this.setting.selectedSkillType=skill;
        },
        deleteSelectedSkill:function(){
            if(this.setting.selectedSkill){
                var skillList=this.timeline.skills[this.setting.selectedSkill.skill.name];
                var i=skillList.findIndex(function(a){return a==vueapp.setting.selectedSkill.skillInfo});
                if(i>=0){
                    skillList.splice(i,1);
                }
                this.setting.selectedSkill=null;
            }
        },
        onSkillRightClick:function(skillInfo,skill,i){
            if(this.setting.selectedSkill && skillInfo==this.setting.selectedSkill.skillInfo){
                this.setting.selectedSkill=null;
            }
        },
        onSelectSkill:function(skillInfo,skill,i){
            this.cancelAllSelect();
            this.setting.selectedSkillType=skill;
            this.setting.selectedSkill={
                skillInfo:skillInfo,
                skill:skill,
            }
        },
        onClearInput:function(){
            this.setting.selectedEvent=null;
            this.setting.inputText="";
            this.setting.inputErrMsg="";
        },
        onEventRightClick:function(e){
            if(this.setting.selectedEvent==e){
                this.setting.selectedEvent=null;
            }
        },
        deleteSelectedEvent:function(){
            if(this.setting.selectedEvent){
                var event=this.setting.selectedEvent;
                var i=this.timeline.events.findIndex(function(e){return e==event});
                if(i>=0){
                    this.timeline.events.splice(i,1);
                }
                this.setting.selectedEvent=null;
            }
        },
        onEventClick:function(e){
            this.cancelAllSelect();
            this.setting.selectedEvent=e;
            this.setting.inputText=new Date(e.time).format("mm:ss.fff")+" "+e.text;
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
                    if(this.setting.selectedEvent){
                        this.setting.selectedEvent.time=time;
                        this.setting.selectedEvent.text=info;
                        this.setting.selectedEvent=null;
                        this.timeline.events.sort(function(a,b){ return a.time<b.time })
                    }else{
                        this.timeline.events.insertSort({
                            time:time,
                            text:info,
                        },function(a,b){ return a.time<b.time })
                    }
                    return true;
                }
            }
        },
        insertNew:function(){//插入新元素
            //判断当前位置
            if(this.hover.rect.enable){
                if(this.dials.mouseY){
                    var time=this.y2time(this.dials.mouseY-this.timeline.offset);
                    if(this.hover.rect.type=="event"){
                        var text=prompt("输入事件内容","");
                        if(text){
                            this.timeline.events.insertSort({
                                time:time,
                                text:text,
                            },function(a,b){ return a.time<b.time })
                        }
                    }else if(this.hover.rect.type=="skill"){
                        var skill=this.skills[this.hover.rect.skillIndex];
                        if(skill){
                            if(this.checkSkillTime(skill,time)){
                                if(!this.timeline.skills[skill.name]){
                                    this.timeline.skills[skill.name]=[];
                                }
                                this.timeline.skills[skill.name].insertSort({
                                    time:time
                                },function(a,b){ return a.time<b.time });
                            }
                        }else{
                            console.error("找不到技能");
                        }
                    }
                }
            }
        },
        setTick:function(tick){//设置每秒像素数
            if(tick<1) {
                tick=1;
            }else if(tick>this.dials.maxTick) {
                tick=this.dials.maxTick;
            }
            this.dials.tick=tick;
            this.dials.tickRange=Math.ceil(this.dials.minLineDistance/tick);
            this.dials.lastLineIndex=-1;
        },
        y2time:function(y){ //通过y计算时间
            return y / this.dials.tick * 1000;
        },
        time2y:function(time){ //通过时间计算y
            return time/1000*this.dials.tick;
        },
        time2yOffset:function(time){ //通过时间计算y
            return time/1000*this.dials.tick+this.timeline.offset;
        },
        second2y:function(time){ //通过时间计算y
            return time*this.dials.tick;
        },
        checkSkillTime:function(skill,time,expectSkillInfo){
            var skills=this.timeline.skills[skill.name];
            var offsetTime=skill.cd*1000;
            var maxTime=time+offsetTime;
            if(skills){
                for(var i=0;i<skills.length;++i){
                    var skillInfo=skills[i];
                    if(skillInfo===expectSkillInfo)
                        continue;
                    var startTime=skillInfo.time;
                    var endTime=startTime+offsetTime;
                    if(time>=startTime&&time<=endTime
                        || startTime>=time&&startTime<=maxTime){
                        return false;
                    }
                }
            }
            return true;
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
        skillOnMouseDrag:function(skillInfo,skill,flag,e){//拖拽
            if(flag){
                if(e.type=="mousedown"){
                    this.drag.enable=true;
                    this.drag.lastY=e.offsetY;
                    this.drag.movingSkillInfo=skillInfo;
                    this.drag.movingSkill=skill;
                }else if(e.type=="mousemove"&&this.drag.enable){
                    var dy=e.offsetY-this.drag.lastY;
                    var newTime=this.drag.movingSkillInfo.time+this.y2time(dy);
                    //---检测newTime是否有冲突
                    if(this.checkSkillTime(this.drag.movingSkill,newTime,this.drag.movingSkillInfo)){
                        this.drag.movingSkillInfo.time=newTime;
                        this.drag.lastY=e.offsetY;
                    }
                }
            }else{
                this.drag.enable=false;
                this.drag.lastY=-1;
                this.drag.movingSkillInfo=null;
                this.drag.movingSkill=null;
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
            if(x>=70&&x<490){
                this.hover.rect.x=70;
                this.hover.rect.width=420;
                this.hover.rect.type="event";
                this.hover.rect.enable=true;
            }else{
                var skillWidth=this.skillOption.all;
                var infoWidth=+this.timeline.infoWidth;
                if(x>=infoWidth&&x<infoWidth+skillWidth*this.skills.length){
                    var colX=Math.floor((x-infoWidth)/skillWidth);
                    this.hover.rect.skillIndex=colX;
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
                this.timeline=savedData.timeline;
                this.skills=savedData.skills;
                this.option=savedData.option;
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
            return {
                timeline:this.timeline,
                skills:this.skills,
                option:this.option,
            }
        },
        init:function(){
            vueapp.dataLoad(true);
        }
       
    },
    computed:{
        skillOption:function(){
            return {
                width: +this.option.skill.width,
                margin: +this.option.skill.margin,
                all:(+this.option.skill.width)+(+this.option.skill.margin),
            }
        },
        dialsLines:function(){
            var top=this.dials.top;
            var height=this.dials.height;
            var lineIndex=Math.ceil(top/100);
            if(lineIndex!==this.dials.lastLineIndex){
                var tick=this.dials.tick*this.dials.tickRange;
                //tickRange
                this.dials.lastLineIndex=lineIndex;
                var y=lineIndex*tick;
                var maxY=top+height;
                var lines=[];
                var miniLines=[];
                var pushMiniLine=(y)=>{
                    var miniTick=tick/5;
                    var miniY=y-tick+miniTick;
                    for(var j=0;miniY<y;miniY+=miniTick){
                        if(miniY>0){
                            miniLines.push({
                                i:j,
                                y:miniY
                            })
                        }
                    }
                }
                for(var i=0;y<=maxY;y+=tick){
                    lines.push({
                        i:i,
                        y:y,
                        text:new Date(Math.round(y/this.dials.tick*1000)).format("mm:ss.fff")
                    })
                    pushMiniLine(y);
                }
                this.dials.lines=lines;
                this.dials.miniLines=miniLines;
            }
            return [ this.dials.lines, this.dials.miniLines ];
        },
        svgHeight:function(){
            return this.timeline.length*this.dials.tick;
        },
        shownSkillInfo:function(){
            if(this.dials.skillShown){
                return this.dials.skillShown;
            }else if(this.drag.movingSkillInfo){
                return {skillInfo: this.drag.movingSkillInfo}
            }
        }
    },
    filters:{
        timeFormat:(time)=>{
            let d=new Date(time);
            return d.format("mm:ss.fff");
        }
    }
});
vueapp.init();