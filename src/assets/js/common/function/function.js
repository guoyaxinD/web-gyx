import echo from '../lib/echo.min.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '../conf/config'
import {myAjax} from './myajax'
Vue.use(VueRouter);
//判断是android还是ios
function isSystem(){
    var isWeixin=/micromessenger/i.test(navigator.userAgent);
    var isQQ=/QQ/i.test(navigator.userAgent);
    var isAndroid=/Android/i.test(navigator.userAgent);
    var isIphone=/iphone/i.test(navigator.userAgent);
    var isPCWindow=/window/i.test(navigator.userAgent);
    var isPCMac=/mac/i.test(navigator.userAgent);
    if(isWeixin){
        return 0;
    }
    else if(isIphone){
        return 1;
    }
    else if(isAndroid){
        return  2;
    }
    else if(isPCWindow){
        return 3;
    }
    else if(isPCMac){
        return 4;
    }
}

var localParam=function(search, hash) {
    search = search || window.location.search;
    hash = hash || window.location.hash;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    }
    return {
        search : fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
        hash : fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
    };
}
//删除重复的url参数
function expUrlParam(pUrl,pVal){
  //用&分割成数组
  var aUrl=pUrl.split("&");
  var aVal;
  if(aUrl.length>0 && pUrl!='' && pUrl!=undefined){
    for(let i=0;i<aUrl.length;i++){
        aVal=aUrl[i].split("=");
        if(aVal[0]==pVal){
          aUrl.splice(i,1);//删除重复的参数
          break;
        }
    }
  }
  return aUrl.join("&");//将新的数组用&拼接成字符串
}
function newCode(obj,url) {
  obj.target.src=url+ '&nowtime=' + new Date().getTime();
}
//搜索记录
let wordsArr=[];
function cacheSearch(kwords){
  if(kwords!='' && kwords!='undefined'){
    if(localStorage.kwords!='' && localStorage.kwords && localStorage.kwords!=undefined){
      wordsArr=JSON.parse(localStorage.kwords);
      if(wordsArr.length>0){
        for(var i=0;i<wordsArr.length;i++){
          if(wordsArr[i].title==kwords){
            wordsArr.splice(i,1);
            break;
          }
        }
      }
      wordsArr.unshift({title:kwords});
      localStorage.kwords=JSON.stringify(wordsArr);
    }else {
      wordsArr.unshift({title:kwords});
      localStorage.kwords=JSON.stringify(wordsArr);
    }
  }
}

//懒加载
function lazyImg(){
  echo.init({
    offset : 100,//可是区域多少像素可以被加载
    throttle : 0 //设置图片延迟加载的时间
  });
}
//单个文件上传
function SingleUpload(repath, uppath, url,src) {
  var fileval = $("#"+repath).val();
  var filename;
  if(fileval!='' && fileval!=undefined){
    filename=fileval;
  }else{
    filename='';
  }
  var submitUrl=""+url+"&ReFilePath="+repath+"&UpFilePath="+uppath+"&filename="+filename;
  //开始提交
  $("#form1").ajaxSubmit({
    beforeSubmit: function(formData, jqForm, options){
    },
    success: function(ret, textStatus) {
      //alert(JSON.stringify(ret));
      var data=ret.data;
      if (data.msg == 1) {
        $("#"+repath).val(data.msbox);
        $("#head").attr("src",src+data.msbox);
      } else {
        alert(data.msbox);
      }
    },
    error: function(data, status, e) {
      alert("上传失败，错误信息：" + e);
    },
    url: submitUrl,
    type: "post",
    dataType: "json",
    timeout: 600000
  });
}

//检测会员登录安全认证
function checkUserLogin(pThis){
  let sUrl=config.domain+'/api/home/user/safe?token='+config.token;
  let jData={uid:pThis.$store.state.uid,auth_token:pThis.$store.state.authToken};
  myAjax(sUrl,"post",(res)=>{
    if(res.data.code!=200){
      localStorage.removeItem("uid");
      localStorage.removeItem("nickname");
      localStorage.removeItem('isLogin');
      localStorage.removeItem('authToken');
      pThis.$store.state.uid='';
      pThis.$store.state.nickname='';
      pThis.$store.state.isLogin=false;
      pThis.$store.state.authToken='';
      pThis.$router.replace(config.path+'login/index')
    }
  },jData);
}
//生成唯一ID
function uuid(len, radix) {
  var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for(var i=0;i<len;i++){
      uuid[i]=chars[0|Math.random()*radix];
    }
  }else{
    var r;
    uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';
    uuid[14]='4';
    for (var i = 0; i < 36; i++) {
      if(!uuid[i]){
        r=0|Math.random()*16;
        uuid[i] = chars[(i==19)?(r&0x3)|0x8:r];
      }
    }
  }
  return uuid.join('');
}
export default{
  localParam,
  isSystem,
  newCode,
  cacheSearch,
  lazyImg,
  SingleUpload,
  expUrlParam,
  checkUserLogin,
  uuid
}
