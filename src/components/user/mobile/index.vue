<!--模板-->
<template>
  <div id="user-mobile-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div class="mobile-main">
      <div class="tip">新手机号验证后，即可绑定成功！</div>
      <form name="form1" id="form1" method="post" action="">
        <div class="cellphone-div"><input type="tel" name="cellphone" id="cellphone" placeholder="绑定手机号码" @keyup="keyupCellphone()" autocomplete="off" v-model="sCellphone" /></div>
        <div class="phonecode-div">
          <input type="text" name="phonecode" id="phonecode" placeholder="请输入短信验证码" v-model="sPhoneCode" />
          <button id="get-code" type="button" @click="clickCode()">获取验证码</button>
        </div>
        <button id="next-btn" @click="bindBtn()" :disabled="bDisabled" type="button" class="next-btn">下一步</button>
      </form>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import toast from '../../common/libs/toast/toast.js';
  import subHeader from '../../common/page/sub-header'
  export default {
    name: 'user-mobile-index',
    data:function(){
      return {
        navTitle:"绑定手机",
        sCellphone:'',
        sPassword:'',
        sPhoneCode:'',
        bSendCode:false,
        bDisabled:false
      }
    },
    components:{
      subHeader
    },
    methods:{
      bindBtn(){
        if(this.sCellphone.match(/^\s*$/)){
          toast("请输入您手机号");
          return false;
        }
        if(!this.sCellphone.match(/^1[0-9][0-9]{9}/)){
          toast("您输入的手机格式不正确");
          return false;
        }
        if(this.sPhoneCode.match(/^\s*$/)){
          toast("请输入验证码");
          return false;
        }
        this.bDisabled=true;
        this.bindCellphone();
      },
      keyupCellphone(){
        if(this.sCellphone.match(/^1[0-9][0-9]{9}/) && !this.sCellphone.match(/^\s*$/)){
          this.bSendCode=true;
          this.getCode.addClass("active");
        }else{
          this.bSendCode=false;
          this.getCode.removeClass("active");
        }
      },
      //点击获取短信验证码
      clickCode(){
        var _this=this;
        if(this.bSendCode){
          let val=10;
          this.bSendCode=false;
          this.getCode.removeClass("active");
          this.getCode.html("重新发送(<span id='show-time' data='"+val+"'>"+val+"s</span>)");
          var showtime=$("#show-time");
          var time=parseInt(showtime.attr("data"));
          var timer=setInterval(function(){
            if(time==0) {
              clearInterval(timer);
              _this.bSendCode=true;
              _this.getCode.addClass("active");
              _this.getCode.html("获取验证码");
            }else{
              time--;
              showtime.html(time + "s");
              showtime.attr("data", time + "s");
            }
          },1000);
        }
      },
      bindCellphone(){
        let sUrl=this.config.domain+"/api/user/myinfo/updatecellphone?token="+this.config.token;
        let jData={"uid":this.$store.state.uid,"cellphone":this.sCellphone,"vcode":this.sPhoneCode};
        this.myAjax(sUrl,"post",ret=>{
            this.bDisabled=false;
            toast("绑定成功！");
            this.$router.go(-1);
        },jData);
      }
    },
    created(){
      this.globalFunc.checkUserLogin(this);
    },
    mounted(){
      this.getCode=$("#get-code");
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/user/mobile/index.css";
</style>
