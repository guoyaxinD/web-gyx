<!--模板-->
<template>
      <div id="header-wrap" class="header">
        <div class="menu" id="menu">
          <router-link :to="{path:'/goods/classify'}" id="class" class="logo"></router-link>
          <div id="searchInput" class="search">
            <div class="search-icon"></div>
            <div class="search-text" @click="searchWord()">输入喜欢的宝贝名称</div>
          </div>
          <div @click="goLogin()" class="login"><span v-show="bLogin">登录</span><img src="../../../assets/images/home/index/my.png" v-show="bUcenter" /></div>
        </div>
      </div>
</template>

<!--行为-->
<script>
  export default {
    name: 'header-wrap',
    data:function(){
      return {
        bLogin:true,
        bUcenter:false
      }
    },
    components:{//局部调用组件
    },
    methods:{
      lisentScroll(){
        let header=$("#header-wrap");
        $(window).scroll(()=>{
          if($(window).scrollTop()>50){
            header.find(".menu").css("background","linear-gradient(to bottom,#EB1625 0%,rgba(255,255,255,0) 100%)");
          }else{
            header.find(".menu").css("background","linear-gradient(rgba(1,1,1,0.2) 0%,rgba(255,255,255,0) 100%)");
          }
        });
      },
      searchWord(){
        document.getElementById("luck-page").style.display="none";
        document.getElementById("search-area").style.display="block";
        document.getElementById("kwords").focus();
      },
      goLogin(){
        if(this.$store.state.isLogin){
          this.$router.push({path:'/home/user'});
        }else {
          this.$router.push({path: '/login/index'});
        }
      }
    },
    created(){
      if(this.$store.state.isLogin){
        this.bUcenter=true;
        this.bLogin=false;
      }else{
        this.bUcenter=false;
        this.bLogin=true;
      }
    },
    mounted(){
      this.lisentScroll();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/common/header.css';
</style>
