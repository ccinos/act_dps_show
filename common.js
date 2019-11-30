var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  if(location.host.indexOf("gitee")!=-1){
    hm.src = "https://hm.baidu.com/hm.js?9243edb854e159d4be5cd7fcba1ba56c";
  }else{
    hm.src = "https://hm.baidu.com/hm.js?c697c926ed88ef936e8708d1a13a6b0a";
  }
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
function padLeft(s,c,length){
  while(s.length<length){
      s=c+s
  }
  return s;
}