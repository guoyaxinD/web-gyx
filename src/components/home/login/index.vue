<!--模板-->
<template>
  <div id="login-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div class="login-main">
      <form name="form1" id="form1" method="post" action="">
        <div class="inputs"><input type="tel" name="cellphone" id="cellphone" placeholder="手机号" v-model="sCellphone" autocomplete="off" /></div>
        <div class="inputs"><input :type="pwdType" name="password" id="password" placeholder="密码" v-model="sPassword"><div class="right" @click="setOpenPwd()"><cube-switch v-model=" bOpenPwd"></cube-switch></div></div>
        <!--<div class="inputs"><input type="text" name="vcode" id="vcode" placeholder="验证码" v-model="sVdcode" /><div class="vcode-img"><img :src="vcodeUrl" @click="changeCode($event)" /></div></div>-->
        <button @click="clickLoginBtn()" type="button" class="login-btn">登录</button>
      </form>
      <div class="find">
        <div id="find-btn" class="left"><img src="../../../assets/images/home/index/forget.png"  />&nbsp;忘记密码</div>
        <router-link replace :to="{path:this.config.path+'reg/index'}" class="left"><img src="../../../assets/images/home/index/reg.png"  />&nbsp;快速注册</router-link>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import subHeader from '../../common/page/sub-header'
  import toast from '../../common/libs/toast/toast.js';
  import {Switch} from 'cube-ui'
  export default {
    name: 'login-index',
    data:function(){
      return {
        navTitle:"登录",
        sCellphone:'',
        sPassword:'',
        sVdcode:'',
        bOpenPwd:false,
        pwdType:'password',
        vcodeUrl:''
      }
    },
    components:{
      subHeader,
      cubeSwitch:Switch
    },
    methods:{
      clickLoginBtn(){
        if(this.sCellphone.match(/^\s*$/)){
          toast({
            message : "请输入您的手机号码",
            position: 'middle',
            duration : 2000
          });
          return false;
        }
        if(!this.sCellphone.match(/^1[0-9][0-9]{9}$/)){
          toast("您输入手机号格式不正确");
          return false;
        }
        if(this.sPassword.match(/^\s*$/)){
          toast("请输入密码");
          return false;
        }
        let sUrl=this.config.domain+"/api/home/user/pwdlogin?token="+this.config.token;
        this.myAjax(sUrl,"post",(ret)=>{
          if(ret.data.code==200){
            localStorage.uid=ret.data.data.uid;
            localStorage.nickname=ret.data.data.nickname;
            localStorage.isLogin=true;
            localStorage.authToken=ret.data.data.auth_token;
            this.$store.state.uid=ret.data.data.uid;
            this.$store.state.nickname=ret.data.data.nickname;
            this.$store.state.isLogin=true;
            this.$store.state.authToken=ret.data.data.auth_token;
            this.$router.go(-1)
          }else{
            toast(ret.data.data)
          }
        },{"cellphone":this.sCellphone,"password":this.sPassword})

      },
      setOpenPwd(){
        if(!this.bOpenPwd){
          this.bOpenPwd=true;
          this.pwdType="text";
        }else{
          this.bOpenPwd=false;
          this.pwdType="password";
        }
      },
      changeCode(event){
        this.globalFunc.newCode(event,this.vcodeUrl)
      }
    },
    created(){
      this.vcodeUrl=this.config.domain+'/api/vcode/chkcode?token='+this.config.token;
    },
    mounted(){

    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/main/login.css";
  .cube-switch{margin-top:5px;}
</style>
