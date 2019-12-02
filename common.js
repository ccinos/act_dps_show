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