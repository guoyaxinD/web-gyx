<!--模板-->
<template>
  <div id="goods-info">
    <div v-wechat-title="title"></div>
    <div id="luck-page" class="luck-page">
      <div class="goods-info-header">
        <div class="back" @click="back()"></div>
        <div id="cards-menu" class="nav-wrap">
          <div class="nav-list active" @click="changeMenu('0')">商品</div>
          <div class="nav-list" @click="changeMenu('1')">详情</div>
          <div id="comment-cardmenu" class="nav-list" style="margin-right:0px;" @click="changeMenu('2')">评价</div>
        </div>
        <router-link :to="{path:this.config.path+'home/cart'}">
        <div id="cart-icon" class="cart-icon">
          <div id="spot" class="spot" v-show="bSpot" ></div>
        </div>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<!--行为-->
<script>
  export default {
    name: 'goods-info',
    data:function(){
      return {
        title:'',
        aid:this.$route.query.aid,
        bSpot:false,
        cartData:this.$store.state.cartData.length>0?this.$store.state.cartData:localStorage.cart!=undefined?JSON.parse(localStorage.cart):[],
        ntype:this.$route.query.type!=undefined?this.$route.query.type:'0'
      }
    },
    created(){

    },
    components:{

    },
    methods:{
      back(){
          this.$router.go(-1);
      },
      changeMenu(pType){
        this.navList.removeClass("active");
        this.navList.eq(pType).addClass("active");
        if(pType=='0'){
          this.$router.replace({path:this.config.path+'goods/info/info_content',query:{aid:this.aid,"type":pType}});
        }else if(pType=='1'){
          this.$router.replace({path:this.config.path+'goods/info/info_desc',query:{aid:this.aid,"type":pType}});
        }else if(pType=='2'){
          this.$router.replace({path:this.config.path+'goods/info/info_comment',query:{aid:this.aid,"type":pType}});
        }
      },
      getDetails(){
        let sUrl=this.config.domain+"/api/home/goods/info/gid/"+this.aid+"/type/details?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.title=ret.data.data.title;
          }
        });
      }
    },
    created(){
      if(this.cartData.length>0){
        this.bSpot=true;
      }else{
        this.bSpot=false;
      }
    },
    mounted:function(){
      this.navList=$(".nav-list");
      this.navList.removeClass("active");
      this.navList.eq(this.ntype).addClass("active");
      this.getDetails();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/goods/info.css";
</style>
