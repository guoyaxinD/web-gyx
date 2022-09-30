<!--模板-->
<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div id="bottom-nav" class="bottom-nav">
      <div @click="goPage('home/index')" id="home" :class="{home:true,active:bHomeStyle}">
        <div class="text">首页</div>
      </div>
      <div @click="goPage('home/cart')" id="cart" :class="{cart:true,active:bCartStyle}">
        <div id="spot" class="spot" v-show="this.$store.state.cartData.length>0?true:false"></div>
        <div class="text">购物车</div>
      </div>
      <div @click="goPage('home/user')" id="my" :class="{my:true,active:bMyStyle}">
        <div class="text">我的</div>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  export default {
  name: 'maincomponent',
  data:function(){
    return {
      bHomeStyle:true,
      bCartStyle:false,
      bMyStyle:false
    }
  },
  components:{//局部调用组件

  },
  methods:{
    goPage(path){
      this.$router.push({path:this.config.path+path})
    },
    changeNavStyle(path){
      switch (path){
        case this.config.path+"home/index":
          this.bHomeStyle=true;
          this.bCartStyle=false;
          this.bMyStyle=false;
          break;
        case this.config.path+"home/cart":
          this.bHomeStyle=false;
          this.bCartStyle=true;
          this.bMyStyle=false;
          break;
        case this.config.path+"home/user":
          this.bHomeStyle=false;
          this.bCartStyle=false;
          this.bMyStyle=true;
          break;
      }
    }
  },
  created(){
    //解决keep-alive为true时点击底部按钮图标样式不切换
    this.changeNavStyle(this.$route.path);
  },
  mounted(){
  },
  computed:{
    //解决子路由不更新数据
    getKey() {
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
    }
  },
    updated(){
      this.changeNavStyle(this.$route.path);
    }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/home/main/main.css';
  /*底部导航*/
  .bottom-nav{width:100%;height:2.5rem;background:#FFFFFF;position:fixed;bottom:0px;z-index:10;box-shadow: 0 0 10px rgba(239, 239, 239, 1);-webkit-box-shadow: 0 0 10px rgba(239, 239, 239, 1);display:flex;justify-content: space-between;align-items:center;}
  .bottom-nav .home{width:1.5rem;height:2rem;background-image:url("../../../assets/images/common/home1.png");background-size:90%;background-repeat:no-repeat;background-position: center 0px;position:relative;margin-top:2px;margin-left:10%;}
  .bottom-nav .home.active{background-image:url("../../../assets/images/common/home2.png");color:#FE6719;}
  .bottom-nav .home .text{width:100%;font-size:0.5rem;position:absolute;bottom:0px;left:0px;text-align:center;}
  .bottom-nav .cart{width:2rem;height:2rem;background-image:url("../../../assets/images/common/cart1.png");background-size:75%;background-repeat:no-repeat;background-position: center 0px;position:relative;margin-top:2px;margin-left:0.7rem;}
  .bottom-nav .cart.active{background-image:url("../../../assets/images/common/cart2.png");}
  .bottom-nav .cart .text{width:100%;font-size:0.5rem;position:absolute;bottom:0px;left:0px;text-align:center;}
  .bottom-nav .cart .spot{width:0.5rem;height:0.5rem;background:#CC0004;border-radius:100%;position:absolute;z-index:1;top:0px;right:0px;}
  .bottom-nav .my{width:2rem;height:2rem;background-image:url("../../../assets/images/common/my1.png");background-size:75%;background-repeat:no-repeat;background-position: center 0px;position:relative;margin-top:2px;margin-right:10%;}
  .bottom-nav .my.active{background-image:url("../../../assets/images/common/my2.png");}
  .bottom-nav .my .text{width:100%;font-size:0.5rem;position:absolute;bottom:0px;left:0px;text-align:center;}

  .bottom-nav .home.active .text,.cart.active .text,.my.active .text{color:#EB1625;}
</style>
