'use strict';

var jobType = {
    tank: ["War", "Mrd", "Drk", "Pld", "Gla", "Gnb"],
    dps: ["Pgl", "Mnk", "Lnc", "Drg", "Rog", "Nin", "Sam", "Arc", "Brd", "Mch", "Dnc", "Thm", "Blm", "Acn", "Smn", "Rdm", "Blu", "Rpr"],
    healer: ["Whm", "Cnj", "Ast", "Sch", "Sge"],
};
var jobNameCnToType={
    "钐镰客":"Rpr",
    "贤者":"Sge",
    "占星术士":"Ast",
    "吟游诗人":"Brd",
    "黑魔法师":"Blm",
    "暗黑骑士":"Drk",
    "龙骑士":"Drg",
    "机工士":"Mch",
    "武僧":"Mnk",
    "忍者":"Nin",
    "骑士":"Pld",
    "学者":"Sch",
    "召唤师":"Smn",
    "战士":"War",
    "白魔法师":"Whm",
    "赤魔法师":"Rdm",
    "武士":"Sam",
    "舞者":"Dnc",
    "绝枪战士":"Gnb",
    "青魔法师":"Blu"
}
var jobSort = [].concat(jobType.tank, jobType.healer, jobType.dps);
for (var i in jobType) {
    var jts = jobType[i]
    for (var j = 0; j < jts.length; ++j) {
        jobType[jts[j]] = i;
    }
}
for (var i in jobSort) {
    jobSort[jobSort[i]] = +i;
}
var defaultOption = {
    fontSize: 13,
    fontFamily:{
        all:"-webkit-pictograph,serif",
        name:"",
        data:""
    },
    showLimitBreak: false,
    showColumnHeader: false,
    nameColumnWidth: 30,
    backgroundAlpha: 30,
    useJobColor: false,
    orderByJob: false,
    dataBarStyle: "fill",
    dataBarHeight:2,
    jobColor: {
        Blm: "#A579D6", Mnk: "#d69c00", Sam: "#e46d04", Mch: "#6EE1D6",
        Nin: "#AF1964", Drg: "#4164CD", Smn: "#2D9B78", Brd: "#91BA5E",
        Dnc: "#E2B0AF", Rdm: "#e87b7b", Gnb: "#796D30", Pld: "#A8D2E6",
        War: "#cf2621", Drk: "#D126CC", Whm: "#FFF0DC", Sch: "#8657FF",
        Ast: "#FFE74A", Blu: "#57ABAB", Rpr: "#965A90", Sge: "#80A0F0",
    },
    colors: {
        tank: "#8080ff",
        dps: "#ff8080",
        healer: "#80ff80",
        background: "rgba(0,0,0,0.2)"
    },
    series: [{
        name: "伤害",
        columns: [{
            name: "DPS",
            value: "dps",
            round: true,
            size: 20,
        }, {
            name: "直击",
            value: "DirectHitPct",
            prefix: "直",
            size: 15,
        }, {
            name: "暴击",
            value: "crithit%",
            prefix: "暴",
            size: 15,
        }, {
            name: "倒地",
            value: "deaths",
            suffix: "死",
            textAlign: "center"
        }
        ],
        orderBy: 0,
        orderAsc: false,
    }, {
        name: "奶量",
        columns: [{
            name: "HPS",
            value: "enchps",
            round: true,
            size: 20,
        }, {
            name: "过量",
            value: "OverHealPct",
            prefix: "过",
            size: 15,
        }, {
            name: "承伤",
            value: "damagetaken-*",
            prefix: "承",
            size: 15,
        }, {
            name: "倒地",
            value: "deaths",
            suffix: "死",
            textAlign: "center"
        }
        ],
        orderBy: 0,
        orderAsc: false,
    }
    ]
};
var savedOption = localStorage.getItem("CCINO_DPS_OPTION");
if (savedOption) {
    savedOption = JSON.parse(savedOption);
}
function getOption(option) {
    option = mergeObj(JSON.parse(JSON.stringify(defaultOption)), option);
    //列设置宽度
    try {
        for (var series of option.series) {
            if (!series) continue;
            var remain_size = 0, sizeCount=0;
            series.columns.forEach(function (c) {
                if (c.size) {
                    var size = +c.size;
                    if (!isNaN(size))
                        remain_size += size;
                }
            });
            sizeCount=remain_size;
            remain_size = (95 - option.nameColumnWidth || 30) - remain_size;
            if (remain_size < 0){
                remain_size = 10;
                sizeCount+=10;
            }
            var nosizeSeries = series.columns.filter(function (c) { return !c.size });
            if (nosizeSeries.length > 0) {
                var size = Math.round(remain_size / nosizeSeries.length * 100) / 100;
                nosizeSeries.forEach(function (c) {
                    c.size = "" + size;
                })
            }
            //--调整整体列宽
            //整体按照95调整
            if(Math.abs(sizeCount-95)>5){
                // console.log(series.nameColumnWidth,option.nameColumnWidth);
                if(!series.nameColumnWidth){
                    series.nameColumnWidth=option.nameColumnWidth;
                }
                sizeCount+= (+series.nameColumnWidth);
                var sizeScale=95/sizeCount;
                series.nameColumnWidth=Math.round(series.nameColumnWidth*sizeScale*100)/100;
                
                series.columns.forEach(function (c) {
                    if (c.size) {
                        c.size= (c.size*sizeScale).toFixed(2);
                    }
                });
            }
            
        }
    } catch (e) {
        console.error(e);
    }
    return option;
}

var vueapp = new Vue({
    el: "#container",
    data: {
        resizable:true,
        jobType: jobType,
        isActive: false,
        encounter: {},
        combatants: [],
        combatant_max: {},
        yourData: {},
        logData:{},
        miniStyle: false,
        currentSeriesIndex: 0,
        settingWindow: null,
        option: getOption(savedOption),
        bodyWidth: 300,
        titleWidth: 200,
        myOrder: 1,
    },
    methods: {
        openSetting: function () {
            if (vueapp.settingWindow) {
                vueapp.settingWindow.focus();
                return;
            }
            vueapp.settingWindow = openWindow("./setting.html", "_blank", 960, 800);
            localStorage.setItem("CCINO_DPS_OPTION", JSON.stringify(vueapp.option));
            var loop = setInterval(function () {
                if (!vueapp.settingWindow || vueapp.settingWindow.closed) {

                    clearInterval(loop);
                    vueapp.settingWindow = null;

                    vueapp.option = getOption(JSON.parse(localStorage.getItem("CCINO_DPS_OPTION")));
                    SortCombatants(vueapp.combatants);
                }
            }, 300);
        },
        getJobColor: function (job) {
            if(!job){
                return "#ffffff";
            }
            if (this.option.useJobColor) {
                return this.color2rgba(this.option.jobColor[job] || "#ffffff");
            } else {
                return this.color2rgba(this.option.colors[jobType[job]] || "#ffffff");
            }
        },
        color2rgba: function (color) {
            if (color.substr(0, 4) == "rgba") {
                color = this.rgba2color(color).color;
            } else if (color[0] != "#") {
                return color;
            }
            var red, green, blue;
            red = parseInt(color.substr(1, 2), 16);
            green = parseInt(color.substr(3, 2), 16);
            blue = parseInt(color.substr(5, 2), 16);
            return "rgba(" + red + "," + green + "," + blue + "," + ((this.option.backgroundAlpha) / 100) + ")";
        },
        rgba2color: function (rgba) {
            var reg = /\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((.|\d)+)\s*\)/.exec(rgba);
            if (reg) {
                return {
                    color: "#" + padLeft((+reg[1]).toString(16), '0', 2)
                        + padLeft((+reg[2]).toString(16), '0', 2)
                        + padLeft((+reg[3]).toString(16), '0', 2),
                    alpha: (+reg[4]) * 100
                }
            }
        },
        mini: function () {
            this.miniStyle = !this.miniStyle;
        },
        changeDataType: function (i) {
            if (this.currentSeriesIndex != i) {
                this.currentSeriesIndex = i;
                SortCombatants(this.combatants);
            }
        },
        getPercentWidth: function (c) {
            try {
                var sortColumn = this.orderBy.sortColumn;
                var orderAsc = this.orderBy.orderAsc;
                return Math.round((parseNumber(c[sortColumn]) / parseNumber(this.combatant_max[sortColumn])) * 10000) / 100;

            } catch (e) {
                return 0;
            }
        },
        getLogsGrade:function(log){
            var grades=[100,99,95,75,50,25];
            for(let g of grades){
                if(log>=g){
                    return "log-"+g;
                }
            }
            return "log-9";
        }
    },
    computed: {
        dataBarHeight:function(){
            if(this.option.dataBarStyle=='line'){
                return (this.option.dataBarHeight||2)+"px";
            }else{
                return "1.5em";
            }
        },
        myDps: function () {
            return this.yourData.dps || 0;
        },
        currentSeries: function () {
            return this.option.series[this.currentSeriesIndex];
        },
        showColumnHeader: function () {
            if (this.currentSeries.showColumnHeader != null) {
                return this.currentSeries.showColumnHeader;
            }
            return this.option.showColumnHeader;
        },
        orderBy: function () {
            try {
                if (this.currentSeries.orderBy != null) {
                    return {
                        sortColumn: this.currentSeries.columns[this.currentSeries.orderBy].value,
                        orderAsc: this.currentSeries.orderAsc
                    }
                } else {
                    return null;
                }
            } catch (e) {
                return {
                    sortColumn: "dps",
                    orderAsc: false
                }
            }
        },
        titleNextLine: function () {
            return this.bodyWidth < this.titleWidth;
        }
    },
    filters: {
        round: function (val) {
            try {
                let v=parseFloat(val);
                if(typeof(val)==="string"){
                    let r=val.substring(val.length-1);
                    if(isNaN(+r)){
                        return Math.round(v)+r;
                    }
                }
                return Math.round(v);
            } catch (e) { console.error(e)}
            return val;
        }
    }
});
function openWindow(url, name, iWidth, iHeight) {
    return window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}
function parseNumber(v){
    let n = parseFloat(v);
    if(typeof(v)==="string"){
        let r=v.substring(v.length-1).toUpperCase();
        switch(r){
            case "K": n*=1000;break;
            case "M": n*=1000000;break;
            case "G": n*=1000000000;break;
        }
    }
    return n;
}
function SortCombatants(combatants) {
    if (vueapp.orderBy) {
        var sortColumn = vueapp.orderBy.sortColumn;
        var orderAsc = vueapp.orderBy.orderAsc;
        combatants.sort(function (a, b) {
            var val_a = parseNumber(a[sortColumn]);
            var val_b = parseNumber(b[sortColumn]);
            if (isNaN(val_a) || isNaN(val_b)) {
                val_a = a[sortColumn];
                val_b = b[sortColumn];
            }
            if (orderAsc ^ (val_a < val_b)) {
                return 1;
            } else if (orderAsc ^ (val_a > val_b)) {
                return -1;
            } else {
                return 0;
            }
        });
        vueapp.combatant_max = combatants[orderAsc ? combatants.length - 1 : 0];
        vueapp.myOrder = combatants.indexOf(vueapp.yourData) + 1;
    }
    if (vueapp.option.orderByJob) {
        combatants.sort(function (a, b) {
            var val_a = a.name == 'YOU' ? -1 : jobSort[a.Job];
            var val_b = b.name == 'YOU' ? -1 : jobSort[b.Job];
            if (val_a == val_b) {
                return a.name < b.name ? -1 : 1;
            }
            return val_a - val_b;
        })
    }
}
function update(e) {
    vueapp.encounter = e.detail.Encounter;
    vueapp.isActive = e.detail.isActive;
    var combatants = [];
    for (var i in e.detail.Combatant) {
        var c = e.detail.Combatant[i];
        if (  (vueapp.option.showLimitBreak||c.name != "Limit Break")
            && !isNaN(+c.dps)) {
            if (c.Job && c.Job.length >= 1) {
                c.Job = c.Job.substr(0, 1).toUpperCase() + c.Job.substr(1);
            }
            combatants.push(c);
        }
    }
    vueapp.yourData = e.detail.Combatant.YOU || {};
    SortCombatants(combatants);
    Vue.set(vueapp, "combatants", combatants);
}


var currentEvent;
var timer = setInterval(function () {
    if (currentEvent) {
        update(currentEvent);
        vueapp.$nextTick(updateBodySize);
        currentEvent = undefined;
    }
}, 1000);

function updateBodySize() {
    vueapp.bodyWidth = document.body.offsetWidth;
    vueapp.titleWidth = 18 + document.getElementById("title-left").offsetWidth + document.getElementById("title-right").offsetWidth;
}
window.onresize = function () {
    updateBodySize();
}


if(window.testdata){
    update(testdata);
    document.body.style.backgroundColor="black";
}



(function () {
    var uri = /[?&]HOST_PORT=(wss?:\/\/[^&\/]+)/.exec(location.search);
    uri = uri && uri[1];
    if (uri) {
        if (uri === 'ws://:10501') {
            uri = 'ws://localhost:10501'
        }
        uri += '/MiniParse'
        var ws = new WebSocket(uri);
        ws.onmessage = function (e) {
            if (e.data === '.')
                return;
            var d;
            try {
                d = JSON.parse(e.data)
            } catch (err) {
                console.error(err, e.data)
                return
            }
            if (d.type === 'broadcast') {
                if (d.msgtype == "CombatData") {
                    currentEvent = { detail: d.msg };
                }
            }
        }
        ws.onerror = function (e) {
            ws.close()
            console.error(e)
        }
    } else {
        document.addEventListener("onOverlayDataUpdate", function (e) {
            currentEvent = e;
        });
    }

    document.addEventListener("onOverlayStateUpdate", function (e) {
        vueapp.resizable=!e.detail.isLocked;
    });

    addOverlayListener('CombatData', function(e) {
        let dps = parseFloat(e.Encounter.encdps);
        if (dps <= 0 || dps === Infinity)
        return;
        currentEvent = { detail: e };
    });

}())

