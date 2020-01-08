var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  if (location.host.indexOf("gitee") != -1) {
    hm.src = "https://hm.baidu.com/hm.js?9243edb854e159d4be5cd7fcba1ba56c";
  } else {
    hm.src = "https://hm.baidu.com/hm.js?c697c926ed88ef936e8708d1a13a6b0a";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
function padLeft(s, c, length) {
  while (s.length < length) {
    s = c + s
  }
  return s;
}
function mergeObj(dest, src) {
  var type = Object.prototype.toString.call(src);
  if (type == "[object Object]" || type == "[object Array]") {
    for (var i in src) {
      if (src.hasOwnProperty(i)) {
        type = Object.prototype.toString.call(src[i]);
        if (type == "[object Object]") {
          dest[i] = mergeObj(dest[i] || {}, src[i]);
        } else {
          dest[i] = src[i];
        }
      }
    }

  }
  return dest;
}
var formatDate = function (date, fmt) {
  fmt = fmt || "yyyy-MM-dd hh:mm:ss";
  var o = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "f+": date.getMilliseconds(), //毫秒
  };

  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
        ? (o[k]) : (("0000" + o[k]).substr(("" + o[k]).length + 4 - RegExp.$1.length)));
  return fmt;
}
Date.prototype.format=function(fmt){
  return formatDate(this,fmt);
}