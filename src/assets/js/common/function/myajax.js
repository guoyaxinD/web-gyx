import Axios from 'axios'
function showLoad(){
  if ($(".load").length>0) {
    $(".load").css("display","block");
  }else {
    $("body").append('<div class="load"></div>');
  }
}

function hideLoad(){
  $(".load").remove();
}
function myAjax(url,type,callback,data=''){
  let params;
  if(data!=''){
    params = new URLSearchParams();
    for(let i in data){
      params.append(i,data[i]);
    }
  }
  Axios({
    method: type,
    url: url,
    data:params
  }).then((ret)=>{
    if(ret.request.readyState==4) {
      callback(ret)
    }
  }).catch((error) => {
    Promise.reject(error)
  });

  interceptors ()
}

function interceptors () {
  Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('开始请求')
    // console.log(`请求地址: ${config.url}`)
    showLoad()
    return config
  }, function (error) {
    // Do something with request error
    //console.log('请求失败')
    return Promise.reject(error)
  });

  Axios.interceptors.response.use(function (config) {
    // Do something before request is sent
    //console.log('接收响应')
    //hideLoad()
    hideLoad()
    return config
  }, function (error) {
    // Do something with request error
    //console.log('响应出错')
    return Promise.reject(error)
  })
}
function request(url,type,data=''){
  let params;
  if(data!=''){
    params = new URLSearchParams();
    for(let i in data){
      params.append(i,data[i]);
    }
  }
  let axios=Axios({
    method: type,
    url: url,
    data:params
  })

  interceptors ()
  return axios;
}
export{
  myAjax,
  request
}
