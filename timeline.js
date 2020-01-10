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
var svgContainer;
var vueapp = new Vue({
    el: "#container",
    data: {
        versions:[
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
        setting:{
            reserveCols:0,
            inputText:"",
            inputErrMsg:"",
            selectedSkill:null,
            selectedSkillType:null,
            skillSet:{
                enable:false,
                x:100,y:100
            },
            eventSet:{
                enable:false,
                x:100, y:100, event:{},
            }
        },
        option:defaultOption,
        skills:[
            {
                name:"铁壁",
                cd:90,
                duration:20,
            },
            {
                name:"血仇",
                cd:60,
                duration:5,
            },
            {
                name:"预警",
                cd:120,
                duration:10,
            },
        ],
        gcdSetting:{
            cd:2.42, //秒
            dragAllMove:true, //是否可以一个GCD技能推动其他技能一起
            abilities:{//能力技能
                "战逃反应":{
                    cd:60,
                    buff: {
                        add:[{ //增加的buff
                            name:"战逃反应",
                        }]
                    }
                }
            },
            skills:{ //gcd技能
                "圣灵":{
                    cd: 2.5,
                },
                "王权剑":{
                    icon:"",
                    name:"王权剑", //默认为属性名
                    cd: 2.42, //默认为上面设置cd (秒)
                    buff: {
                        add:[{ //增加的buff
                            name:"王权",
                            count:3, //层数
                            countAddType:"replace", //层数 add增加层数 replace替换层数
                            duration: 10, //时间
                            durationAddType: "add", //时间 add增加 replace替换
                        }], 
                        spend:[{ //消耗的buff
                            name:"王权", 
                            count:1,
                            countSpendType:"remove", //层数 remove删除 spend减少
                            duration: 10, //时间
                            durationSpendType: "spend", //时间 remove删除 spend减少
                        }] 
                    },
                    combo:{
                        prev:["暴乱剑"], //上一个连续技，当上一个技能是该技能中的一个时，本次可以触发连续技
                    },
                    required:{
                        buff:[], //需要的buff
                        combo:[], //需要的连续技
                    }
                }
            },
            buffs:{ //gcd产生的buff信息
                "沥血":{
                    maxDuration: 30,
                    shown: true, //是否显示
                }
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
            skillShown:null,
            top:0,
            height:2000,
        },
        drag:{
            enable:false,
            lastY:-1,
            movingData:null,
            handler:{
                getTimeHandler:null,setTimeHandler:null,checkTimeHandler:null
            }
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
        deleteGcdSkill:function(i){//删除GCD

        },
        changeGcdTime:function(gcd,time,i){//改变GCD时间
            if(time==gcd.time) return;
            var up=time<gcd.time;
            var down=!up;
            if(up&&i>0 || down&&i<this.timeline.gcd.length-1){
                var newI=up?i-1:i+1;
                var g=this.timeline.gcd[newI];
                var cd=this.getGcdCd(g.skill);
                var checkTime=g.time+(up?cd:-cd);
                if(down^time<checkTime){
                    //无法移动
                    if(this.gcdSetting.dragAllMove){ //推动全部
                        var t=this.changeGcdTime(g,time+(up?-cd:cd),newI);
                        if(t<=0||t>=this.timeline.length*1000){
                            return -1;
                        }
                    }else{
                        return gcd.time;
                    }
                }
            }else{
                if(time<0||time>this.timeline.length*1000){
                    return -1;
                }
            }
            gcd.time=time;;
            return time;
        },
        getGcdCd:function(gcdName){
            return Math.floor(((this.gcdSetting.skills[gcdName]||{}).cd||this.gcdSetting.cd||2.5) * 100)  * 10;
        },
        /**
         * 在此时间增加一条GCD技能，会在此时间往后查找一个合适的空隙进行插入
         * 返回插入的确切时间
         * @param {Number} time 时间
         * @param {String} name GCD技能名 
         * @param {Boolean} isInsert 是否插入（如果插入，后续所有技能时间++)
         * @returns {Number} 实际插入的时间
         */
        addGcdSkill:function(time,name,isInsert){
            for(var i=0,len=this.timeline.gcd.length;i<len;++i){
                var gcd=this.timeline.gcd[i];
                var currentSkillCd=this.getGcdCd(gcd.skill);
                var maxGcdTime=gcd.time+currentSkillCd; //本次技能CD转好时间
                if(maxGcdTime<time){
                    continue;
                }
                var insertingCd=this.getGcdCd(name);
                var minGcdTime=gcd.time-insertingCd;
                if(time<minGcdTime){
                    break;
                }
                if(isInsert){
                    //将后续技能全部后调
                    var diff=time-minGcdTime;
                    var lastTime=time;
                    var lastCd=insertingCd;
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
            this.timeline.gcd.insertSort({
                time:time,
                skill:name
            },function(a,b){return a.time<b.time})
            return time;
        },
        getSkillIcon:function(skill){
            var iconname=skillNameIcon[skill.name]||skill.fullname||skill.name;
            return "./icons/skill/"+iconname+".png";
        },
        getGcdIcon:function(gcd){
            var iconname=gcd.skill;
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
                var name=this.setting.selectedSkillType.name;
                if(name){
                    if(this.timeline.skills[name]){
                        alert("技能名不能重复");
                        return;
                    }
                    var skill={
                        name:name,
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
            this.setting.eventSet={enable:false};
            this.setting.skillSet={enable:false};
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
            // this.setting.selectedSkillType=skill;
            this.setting.selectedSkill={
                skillInfo:skillInfo,
                skill:skill,
            }
            Object.assign(this.setting.skillSet,{
                enable:true,
                x:evt.x+this.option.skill.width,
                y:evt.y+20});
        },
        onClearInput:function(){
            this.setting.inputText="";
            this.setting.inputErrMsg="";
        },
        onEventRightClick:function(e){
            if(this.setting.eventSet.event==e){
                this.cancelAllSelect();
            }
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
            //取出当前mouse所在time
            var mouseT=this.y2time(this.dials.mouseY);
            var mouseY=this.dials.mouseY;
            //设置tick
            this.dials.tick=tick;
            this.dials.tickRange=Math.ceil(this.dials.minLineDistance/tick);
            //获得time所在位置
            var newMouseY=this.time2y(mouseT);
            var newScrollTop=svgContainer.scrollTop+(newMouseY-mouseY);
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
            return time/1000*this.dials.tick+this.timeline.offset;
        },
        second2y:function(time){ //通过时间计算y
            return time*this.dials.tick;
        },
        checkSkillTime:function(skill,time,expectSkillInfo){
            var skills=this.timeline.skills[skill.name];
            var offsetTime=skill.cd*1000;
            var maxTime=time+offsetTime; //该时间产生的技能CD的时间
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
                    if(maxTime<startTime){
                        //如果cd后的时间小于此时所判断技能的开始时间
                        //则之后的不需要再进行判断
                        //* 这个建立在时间轴是按顺序排列的情况下
                        break;
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
        /**
         * 简单的拖拽时间方法，要求data必须有time属性
         * @param {Event}} e 事件
         * @param {{time:String}} data 
         */
        onMouseDragSimple:function(e,data){
            this.onMouseDrag(e,data,
                function(d){return d.time},
                function(d,time){d.time=time},
                function(){return true});
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
        onMouseDrag:function(e,data,getTimeHandler,setTimeHandler,checkTimeHandler){ 
            if(e.type=="mousedown"){
                this.drag.enable=true;
                this.drag.lastY=e.offsetY;
                this.drag.movingData=data;
                this.drag.handler.getTimeHandler=getTimeHandler;
                this.drag.handler.setTimeHandler=setTimeHandler;
                this.drag.handler.checkTimeHandler=checkTimeHandler;
            }else if(e.type=="mousemove"&&this.drag.enable){
                var dy=e.offsetY-this.drag.lastY;
                var newTime=this.drag.handler.getTimeHandler(this.drag.movingData)+this.y2time(dy);
                //---检测newTime是否有冲突
                if(this.drag.handler.checkTimeHandler(this.drag.movingData,newTime)){
                    this.drag.handler.setTimeHandler(this.drag.movingData,newTime);
                    this.drag.lastY=e.offsetY;
                }
            }else if(e.type=="mouseup"){
                this.drag.enable=false;
                this.drag.lastY=-1;
                this.drag.movingData=null;
                this.drag.handler={};
            }
        },
        gcdOnMouseDrag:function(e,gcd,i){
            this.onMouseDrag(e,gcd,function(d){return d.time},
            function(d,time){
                vueapp.changeGcdTime(d,time,i)
            },function(d){return true});
        },
        skillOnMouseDrag:function(skillInfo,skill,flag,e){//拖拽
            this.onMouseDrag(e,{
                skillInfo:skillInfo,skill:skill
            },function(data){
                return data.skillInfo.time;
            },function(data,time){
                data.skillInfo.time=time;
            },function(data,time){
                return vueapp.checkSkillTime(data.skill,time,data.skillInfo)
            })
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
                this.timeline=mergeObj(this.timeline,savedData.timeline);
                this.skills=savedData.skills;
                this.option=mergeObj(this.option,savedData.option);
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
            svgContainer=document.getElementById("svg_container");
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
            var tick=this.dials.tick*this.dials.tickRange;
            var lineIndex=Math.floor(top/tick);
            if(lineIndex!==this.dials.lastLineIndex){
                //tickRange
                this.dials.lastLineIndex=lineIndex;
                var y=lineIndex*tick;
                var maxY=top+height;
                var lines=[];
                // var miniLines=[];
                // var pushMiniLine=(y)=>{
                //     var miniTick=tick/5;
                //     var miniY=y-tick+miniTick;
                //     for(var j=0;miniY<y;miniY+=miniTick){
                //         if(miniY>0){
                //             miniLines.push({
                //                 i:j,
                //                 y:miniY
                //             })
                //         }
                //     }
                // }
                for(var i=0;y<=maxY;y+=tick){
                    lines.push({
                        i:i,
                        y:y,
                        text:new Date(Math.round(y/this.dials.tick*1000)).format("mm:ss.fff")
                    })
                    // pushMiniLine(y);
                }
                this.dials.lines=lines;
                // this.dials.miniLines=miniLines;
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
        timeFormat:(time)=>{
            let d=new Date(time);
            return d.format("mm:ss.fff");
        }
    }
});


vueapp.init();


// document.addEventListener('keydown', function(evt){
//     var code=evt.code;
//     var subcode=code.substr(0,5);
//     if(subcode=="Digit"){
//         code=code.substr(5);
//     }else if(subcode=="Numpa"){
//         var right=code.substr(6);
//         if(right.length==1)
//             code="Num "+right
//         else
//             code="Num "+evt.key;
//     }else if(subcode=="Arrow"){
//         code=code.substr(5);
//     }else{
//         code=evt.key;
//         if(code.length==1)
//             code=code.toUpperCase();
//     }
//     if(evt.key!="Control"&&evt.key!="Shift"&&evt.key!="Alt"){
//         var str=(evt.ctrlKey?"Ctrl+":"")+(evt.shiftKey?"Shift+":"")+(evt.altKey?"Alt+":"")+code;
//         console.log(str);
//     }
//     evt.preventDefault();
//     return false;
// }, false);


// vueapp.addGcdSkill(1465,"先锋剑")
// vueapp.addGcdSkill(1465,"暴乱剑")
// vueapp.addGcdSkill(1465,"沥血剑")
// vueapp.addGcdSkill(1465,"先锋剑")
// vueapp.addGcdSkill(1465,"暴乱剑")
// vueapp.addGcdSkill(1465,"王权剑")
// vueapp.addGcdSkill(1465,"赎罪剑")
// vueapp.addGcdSkill(1465,"赎罪剑")
// vueapp.addGcdSkill(1465,"赎罪剑")
// vueapp.addGcdSkill(1465,"先锋剑")
// vueapp.addGcdSkill(1465,"暴乱剑")
// vueapp.addGcdSkill(1465,"沥血剑")
// vueapp.addGcdSkill(1465,"圣灵")
// vueapp.addGcdSkill(1465,"圣灵")
// vueapp.addGcdSkill(1465,"圣灵")
// vueapp.addGcdSkill(1465,"圣灵")
// vueapp.addGcdSkill(1465,"悔罪")
// vueapp.addGcdSkill(1465,"先锋剑")
// vueapp.addGcdSkill(1465,"暴乱剑")
// vueapp.addGcdSkill(1465,"沥血剑")