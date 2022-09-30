<!--模板-->
<template>
  <div id="reg-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div class="login-main">
      <form name="form1" id="form1" method="post" action="">
        <div class="inputs"><input type="text" name="vcode" id="vcode" placeholder="验证码" v-model="sVdcode" /><div class="vcode-img"><img :src="vcodeUrl" @click="changeCode($event)" /></div></div>
        <div class="input-cellphone">
          <div class="cellphone">
            <input type="tel" name="cellphone" id="cellphone" placeholder="请输入手机号" v-model="sCellphone" @keyup="keyupCellphone()" autocomplete="off" />
          </div>
          <div id="get-code" class="get-code" @click="clickCode()">获取短信验证码</div>
        </div>
        <div class="inputs"><input type="text" name="cellphone-code" id="cellphone-code" placeholder="请输入短信验证码" /></div>
        <div class="inputs"><input :type="pwdType" name="password" id="password" placeholder="密码" v-model="sPassword"><div class="right" @click="setOpenPwd()"><cube-switch v-model="bOpenPwd"></cube-switch></div></div>
        <button @click="clickRegBtn()" type="button" class="login-btn">注册</button>
      </form>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  import toast from '../../common/libs/toast/toast.js';
  import {Switch} from 'cube-ui'
  export default {
    name: 'reg-index',
    data:function(){
      return {
        navTitle:"注册",
        sCellphone:'',
        sPassword:'',
        sVdcode:'',
        bOpenPwd:false,
        pwdType:'password',
        bSendCode:false,
        vcodeUrl:''
      }
    },
    components:{
      subHeader,
      cubeSwitch:Switch
    },
    methods:{
      clickRegBtn(){
        if(this.sVdcode.match(/^\s*$/)){
          this.bNext=false;
          toast("请输入验证码");
          return false;
        }
        if(this.sCellphone.match(/^\s*$/)){
          this.bNext=false;
          toast("请输入您手机号");
          return false;
        }
        if(!this.sCellphone.match(/^1[0-9][0-9]{9}$/)){
          this.bNext=false;
          toast("您输入手机号格式不正确");
          return false;
        }
        if(this.sPassword.match(/^\s*$/)){
          this.bNext=false;
          toast("请输入密码");
          return false;
        }
        this.checkedVdcode(()=>{
          if(this.bNext){
              this.addUser();
          }else{
            toast('您输入的验证码不正确');
          }
        });
      },
      checkedVdcode(callback){
        let sUrl=this.config.domain+"/api/home/user/checkvcode?token="+this.config.token;
        let jData={"vcode":this.sVdcode};
        this.myAjax(sUrl,"post",(ret)=>{
          if(ret.data.code==200){
            this.bNext=true;
          }else{
            this.bNext=false;
          }
          callback();
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
          if(this.sVdcode.match(/^\s*$/)){
            this.bNext=false;
            toast("请输入验证码");
            return false;
          }
          this.checkedVdcode(()=>{
              if(this.bNext){
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
                    _this.getCode.html("获取短信验证码");
                  }else{
                    time--;
                    showtime.html(time + "s");
                    showtime.attr("data", time + "s");
                  }
                },1000);
              }else{
                toast('您输入的验证码不正确');
              }
          });
        }
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
      },
      addUser(){
        if (this.bSubmit){//防止网速慢重复提交数据
          this.bSubmit=false;
          let sUrl=this.config.domain+"/api/home/user/reg?token="+this.config.token;
          let jData={"vcode":this.sVdcode,"cellphone":this.sCellphone,"password":this.sPassword};
          this.myAjax(sUrl,"post",ret=>{
            if(ret.data.code==200){
              localStorage.uid=ret.data.data.uid;
              localStorage.nickname=ret.data.data.nickname;
              localStorage.isLogin=true;
              localStorage.authToken=ret.data.data.auth_token;
              this.$store.state.uid=ret.data.data.uid;
              this.$store.state.nickname=ret.data.data.nickname;
              this.$store.state.isLogin=true;
              this.$store.state.authToken=ret.data.data.auth_token;
              this.$router.replace({path:this.config.path+'home/user'});
            }else{
              toast(ret.data.data);
            }
          },jData);
        }

      }
    },
    created(){
      this.vcodeUrl=this.config.domain+'/api/vcode/chkcode?token='+this.config.token;
      this.bSubmit=true;
      this.bNext=false;
    },
    mounted(){
        this.getCode=$("#get-code");
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/main/reg.css";
  .cube-switch{margin-top:5px;}
</style>
