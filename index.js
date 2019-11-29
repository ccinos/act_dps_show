var jobType={
    tank:["Gla", "Pld", "Mrd", "War", "Drk","Gnb"],
    dps:["Pgl", "Mnk", "Lnc", "Drg", "Arc", "Brd", "Rog", "Nin", "Acn", "Smn", "Thm", "Blm", "Mch", "Sam", "Rdm", "Dnc"],
    healer:["Cnj", "Whm", "Sch", "Ast"],
  };
var defaultOption={
    fontSize:13, 
    showColumnHeader:false,
    nameColumnWidth:30,
    colors:{
        tank:"rgba(128,128,255,0.3)",
        dps:"rgba(255,128,128,0.3)",
        healer:"rgba(128,255,128,0.3)",
        background:"rgba(0,0,0,0.2)"
    },
    series:[{
            name:"伤害",
            columns:[{
                    name:"DPS",
                    value:"dps",
                    round:true,
                    size:20,
                },{
                    name:"直击",
                    value:"DirectHitPct",
                    prefix:"直",
                    size:15,
                },{
                    name:"暴击",
                    value:"crithit%",
                    prefix:"暴",
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
        },{
            name:"奶量",
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
};
var savedOption=localStorage.getItem("CCINO_DPS_OPTION");
if(savedOption){
    savedOption=JSON.parse(savedOption);
}
function mergeObj(dest,src){
    var type=Object.prototype.toString.call(src);
    if(type=="[object Object]"||type=="[object Array]"){
        for(var i in src){
            if(src.hasOwnProperty(i)){
                type=Object.prototype.toString.call(src[i]);
                if(type=="[object Object]"){
                    dest[i]=mergeObj(dest[i]||{},src[i]);
                }else{
                    dest[i]=src[i];
                }
            }
        }
        
    }
    return dest;
}
function getOption(option){
    option=mergeObj(JSON.parse(JSON.stringify(defaultOption)),option);
    //列设置宽度
    try{
        for(var series of option.series){
            if(!series) continue;
            var remain_size=0
            series.columns.forEach(function(c){
                if(c.size){
                    var size=+c.size;
                    if(!isNaN(size))
                        remain_size+= size;
                }
            });
            remain_size=(95-option.nameColumnWidth||30)-remain_size;
            if(remain_size<0) remain_size=10;
            var nosizeSeries=series.columns.filter(function(c){return !c.size});
            if(nosizeSeries.length>0){
                var size=Math.round(remain_size/nosizeSeries.length*100)/100;
                nosizeSeries.forEach(function(c){
                    c.size=""+size;
                })
            }
        }
    }catch(e){
        console.error(e);
    }
    return option;
}
  for(var i in jobType){
    var jts=jobType[i]
    for(var j=0;j<jts.length;++j){
      jobType[jts[j]]=i;
    }
  }
  var vueapp=new Vue({
      el:"#container",
      data:{
          jobType:jobType,
          isActive:false,
          encounter:{},
          combatants:[],
          yourData:{},
          miniStyle:false,
          currentSeriesIndex:0,
          settingWindow:null,
          option:getOption(savedOption),
          bodyWidth:300,
      },
      methods:{
          openSetting:function(){
            if(vueapp.settingWindow){
                vueapp.settingWindow.focus();
                return;
            } 
            var lastMiniStyle=this.miniStyle;
            this.miniStyle=true;
            vueapp.settingWindow=openWindow("./setting.html","_blank",860,800);
            localStorage.setItem("CCINO_DPS_OPTION",JSON.stringify(vueapp.option));
            var loop=setInterval(function(){
                if(!vueapp.settingWindow || vueapp.settingWindow.closed){
                    clearInterval(loop);
                    vueapp.settingWindow=null;
                    
                    vueapp.option=getOption(JSON.parse(localStorage.getItem("CCINO_DPS_OPTION"))); 
                    vueapp.miniStyle=lastMiniStyle;
                }
            },300);
          },
          mini:function(){
              this.miniStyle=!this.miniStyle;
          },
          changeDataType:function(i){
              if(this.currentSeriesIndex!=i){
                  this.currentSeriesIndex=i;
                  SortCombatants(this.combatants);
              }
          },
          getPercentWidth:function(c){
              try{
                  var sortColumn=this.orderBy.sortColumn;
                  var orderAsc=this.orderBy.orderAsc;
                  return Math.round((parseFloat(c[sortColumn])/parseFloat(this.combatants[orderAsc?(this.combatants.length-1):0][sortColumn]))*10000)/100; 
              }catch(e){
                  return 0;
              }
          }
      },
      computed:{
          myDps:function(){
              return this.yourData.dps||0;
          },
          myOrder:function(){
              return this.combatants.indexOf(this.yourData)+1;
          },
          currentSeries:function(){
              return this.option.series[this.currentSeriesIndex];
          },
          orderBy:function(){
              try{
                  return {
                      sortColumn:this.currentSeries.columns[this.currentSeries.orderBy].value,
                      orderAsc:this.currentSeries.orderAsc
                  }
              }catch(e){
                  return {
                      sortColumn:"dps",
                      orderAsc:false
                  }
              }
          },
          titleNextLine:function(){
            var width=18+document.getElementById("title-left").offsetWidth+document.getElementById("title-right").offsetWidth;
            return this.bodyWidth<width;
          }
      },
      filters:{
          round:function(val){
              return Math.round(val);
          }
      }
  });
  function openWindow(url,name,iWidth,iHeight){
    return window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
 }
  function SortCombatants(combatants){
      var sortColumn=vueapp.orderBy.sortColumn;
      var orderAsc=vueapp.orderBy.orderAsc;
      combatants.sort(function(a,b){
          var val_a=parseFloat(a[sortColumn]);
          var val_b=parseFloat(b[sortColumn]);
          if(isNaN(val_a)||isNaN(val_b)){
              val_a=a[sortColumn];
              val_b=b[sortColumn];
          }
          if(orderAsc^(val_a<val_b)){
              return 1;
          }else if(orderAsc^(val_a>val_b)){
              return -1;
          }else{
              return 0;
          }
      });
  }
  function update(e){
    vueapp.encounter = e.detail.Encounter;
    vueapp.isActive=e.detail.isActive;
    var combatants=[];
    for(var i in e.detail.Combatant){
        var c=e.detail.Combatant[i];
        if(c.name!="Limit Break"
            &&!isNaN(+c.dps)){
            if(c.Job&&c.Job.length>=1){
                c.Job=c.Job.substr(0,1).toUpperCase()+c.Job.substr(1);
            }
            combatants.push(c);
        }
    }
    vueapp.yourData=e.detail.Combatant.YOU||{};
    SortCombatants(combatants);
    Vue.set(vueapp,"combatants",combatants);
  }


  var currentEvent;
  var timer=setInterval(function(){
      if(currentEvent){
        update(currentEvent);
        updateBodySize();
        currentEvent=undefined;
      }
  },1000);
  
function updateBodySize(){
    vueapp.bodyWidth=document.body.offsetWidth;
}
  document.addEventListener("onOverlayDataUpdate", function (e) {
      currentEvent=e;
  });
  window.onresize=function(){
    updateBodySize();
  }
  