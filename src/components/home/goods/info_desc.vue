<!--模板-->
<template>
  <div id="info-desc" class="goods-content-wrap">
    <div class="goods-content">
      <div v-show="bData" class="content" v-html="bodys"></div>
      <div v-show="bNotData" class="not-data">没有商品详情！</div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  export default {
    name: 'info-desc',
    data:function(){
      return {
        aid:this.$route.query.aid,
        bodys:'',
        bData:true,
        bNotData:false
      }
    },

    components:{

    },
    methods:{
      getDetails(){
        let sUrl=this.config.domain+"/api/home/goods/info/gid/"+this.aid+"/type/details?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.bodys=ret.data.data.bodys;
            if(this.bodys!=''){
              this.bData=true;
              this.bNotData=false;
            }else{
              this.bData=false;
              this.bNotData=true;
            }
          }
        });
      }
    },
    mounted:function(){
      this.getDetails();
    }
  }
</script>

<!--样式-->
<style scoped>
  .goods-content-wrap{width:100%;overflow:hidden;}
  .goods-content-wrap .goods-content{width:100%;height: auto;margin-top:3rem;}
  .goods-content-wrap .goods-content .content{width:95%;line-height:1.8em;font-size:0.8rem;overflow:hidden;margin-top:3rem;margin:0 auto;}
</style>
