<!--模板-->
<template>
  <div id="user-modpwd-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div class="mobile-main">
      <form name="form1" id="form1" method="post" action="">
        <div class="cellphone-div"><input class="password" :type="pwdType" name="password" id="password" placeholder="请输入大于6位的登录密码" v-model="sPassword"><div class="right" @click="setOpenPwd()"><cube-switch v-model="bOpenPwd"></cube-switch></div></div>

        <button id="next-btn" type="button" :disabled="bDisabled" class="next-btn" @click="submitBtn()">提交</button>
      </form>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import toast from '../../common/libs/toast/toast.js';
  import subHeader from '../../common/page/sub-header'
  import {Switch} from 'cube-ui'
  export default {
    name: 'user-modpwd-index',
    data:function(){
      return {
        navTitle:"修改密码",
        sPassword:'',
        bSendCode:false,
        bOpenPwd:false,
        pwdType:'password',
        bDisabled:false
      }
    },
    components:{
      subHeader,
      cubeSwitch:Switch
    },
    methods:{
      submitBtn(){
        if(this.sPassword.match(/^\s*$/)){
          toast("请输入密码");
          return false;
        }
        if(this.sPassword.length<6){
          toast("您输入的密码必须要大于6位");
          return false;
        }
        this.bDisabled=true;
        let sUrl=this.config.domain+"/api/user/myinfo/modpwd?token="+this.config.token;
        let jData={"uid":this.$store.state.uid,"password":this.sPassword};
        this.myAjax(sUrl,"post",ret=>{
          if(ret.data.code==200){
            toast("修改成功！");
            this.$router.go(-1);
          }
        },jData);
      },
      setOpenPwd(){
        if(!this.bOpenPwd){
          this.bOpenPwd=true;
          this.pwdType="text";
        }else{
          this.bOpenPwd=false;
          this.pwdType="password";
        }
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
  @import "../../../assets/css/user/password/index.css";
  .luck-page{background:#FFFFFF;}
</style>
