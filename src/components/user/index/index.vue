<!--模板-->
<template>
  <div id="index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div class="my-header">
      <div class="head"><img id="head-img" :src="sHead" /></div>
      <div id="nickname" class="cellphone">{{sNickName}}</div>
      <div class="point">我的积分：<span id="points">{{iPoint}}</span></div>
    </div>
    <div class="all-order">
      <div class="left">全部订单</div>
      <router-link :to="{path:this.config.path+'user/order/index',query:{status:'all'}}" class="right">查看全部订单 &gt;</router-link>
    </div>
    <div class="order-item">
      <router-link :to="{path:this.config.path+'user/order/index',query:{status:'0'}}" class="pay">
        <div class="text">待支付</div>
      </router-link>
      <router-link :to="{path:this.config.path+'user/order/index',query:{status:'1'}}" class="take">
        <div class="text">待收货</div>
      </router-link>
      <router-link :to="{path:this.config.path+'user/order/index/review',query:{status:'2'}}" class="comment">
        <div class="text">待评价</div>
      </router-link>
    </div>
    <div class="my-space"></div>
    <div class="my-list">
      <ul @click="goPath('user/profile')">
        <li>个人资料</li>
        <li></li>
      </ul>
      <ul @click="goPath('user/address')">
        <li>地址管理</li>
        <li></li>
      </ul>
      <ul @click="goPath('user/mobile')">
        <li>绑定手机</li>
        <li></li>
      </ul>
      <ul @click="goPath('user/modpwd')">
        <li>修改密码</li>
        <li></li>
      </ul>
      <ul @click="goPath('user/fav')">
        <li>我的收藏</li>
        <li></li>
      </ul>
    </div>
    <div class="btn-area">
      <div id="out-btn" class="out-btn" @click="outLogin()">{{outMsg}}</div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  import Vue from 'vue'
  import {Dialog} from 'cube-ui'
  Vue.use(Dialog)
export default {
  name: 'index',
  data:function(){
    return {
      navTitle:"会员中心",
      outMsg:'登录/注册',
      sNickName:this.$store.state.nickname!=''?this.$store.state.nickname:'昵称',
      iPoint:0,
      sHead:require('../../../assets/images/user/my/default-head.png')
    }
  },
  components:{//局部调用组件
    subHeader
  },
  methods:{
    goPath(pUrl){
      this.$router.push({path:this.config.path+pUrl});
    },
    outLogin(){
      if(this.$store.state.isLogin){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确认要退出吗？',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            //调用安全退出接口
            let sUrl=this.config.domain+"/api/home/user/safeout?token="+this.config.token;
            this.myAjax(sUrl,"post",(res)=>{
            },{uid:this.$store.state.uid});

            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem('isLogin');
            localStorage.removeItem('authToken');
            this.$store.state.uid='';
            this.$store.state.nickname='';
            this.$store.state.isLogin=false;
            this.$store.state.authToken='';
            this.$router.replace({path:this.config.path+'login/index'})
          },
          onCancel: () => {

          }
        }).show();
      }else{
        this.$router.replace({path:this.config.path+'login/index'});
      }
    },
    getUserData(){
      let sUrl=this.config.domain+"/api/user/myinfo/userinfo/uid/"+this.$store.state.uid+"?token="+this.config.token;
      this.myAjax(sUrl,"get",ret=>{
        if(ret.data.code==200) {
          this.iPoint = ret.data.data.points;
          this.sHead=ret.data.data.head;
          if(this.sHead!=""){
            this.sHead=ret.data.data.head;
          }else{
            this.sHead=require("../../../assets/images/user/my/default-head.png");
          }
        }
      });
    }
  },
  created(){
      if(this.$store.state.isLogin){
        this.outMsg="安全退出";
      }
      this.getUserData();
  },
  mounted(){

  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/index/index.css';
</style>
