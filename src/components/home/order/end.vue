<!--模板-->
<template>
  <div id="order-end" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div class="endorder-main">
      <div id="result-msg" class="result-msg">订购成功！<br /><span>订单编号：<span id="show-ordernum">{{iOrdernum}}</span></span><br /><router-link :to="{path:'/user/order/index/all',query:{'status':'all'}}" replace>查看订单</router-link></div>
      <div class="pay">去付款</div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  export default {
    name: 'order-end',
    data:function(){
      return {
        navTitle:"订单结束",
        iOrdernum:''
      }
    },
    components:{
      subHeader
    },
    methods:{
      getOrdernum(){
        let sUrl=this.config.domain+"/api/order/lastordernum/uid/"+this.$store.state.uid+"?token="+this.config.token;
        this.myAjax(sUrl,"get",ret=>{
          if(ret.data.code==200){
            this.iOrdernum=ret.data.data.ordernum;
          }
        });
      }
    },
    created(){
      this.globalFunc.checkUserLogin(this);
      this.getOrdernum();
    },
    mounted(){

    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/cart/endorder.css";
  .pay{width:8rem;height:1.5rem;background:#0a8ddf;font-size:0.7rem;text-align:center;color:#FFFFFF;line-height:1.5rem;border-radius: 3px;margin:0 auto;margin-top:0.5rem;}
</style>
