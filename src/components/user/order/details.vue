<!--模板-->
<template>
    <div id="order-details" class="luck-page">
      <div v-wechat-title="$route.meta.title"></div>
      <subHeader :navTitle=navTitle></subHeader>
      <div class="orderDetail-main">
        <div class="ordernum">订单编号:{{ordernum}}</div>
        <div class="address-main">
          <div class="upborder">
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
          </div>
          <div class="address">
            <div class="name">{{sName}}</div>
            <div class="cellphone">{{sCellphone}}</div>
            <div class="my-address">{{sProvince}}{{sCity}}{{sArea}}{{sAddress}}</div>
          </div>
          <div class="upborder">
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
            <div class="rect"></div>
            <div class="rect red"></div>
          </div>
        </div>
        <div class="goods-main">
          <div class="goods-main-title">购买的宝贝</div>
          <div id="show-goods">
            <div class="goods-list" v-for="item in aGoods">
              <div class="image"><img :src="item.image" /></div>
              <div class="goods-title">{{item.title}}</div>
              <div class="amount">x {{item.amount}}&nbsp;&nbsp;<span v-for="list in item.param">{{list.title}}：<span v-for="param in list.param">{{param.title}}</span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
              <div class="price">¥{{item.price}}</div>
            </div>
          </div>
        </div>
        <div class="pay-main">
          <ul class="pay-status">
            <li>支付状态</li>
            <li><span v-if="status=='0'">待付款</span><span v-else-if="status=='1'">待收货</span><span v-else-if="status=='2'">已收货</span></li>
          </ul>
          <div class="goods-total">
            <ul>
              <li>商品总额</li>
              <li>¥{{total}}</li>
            </ul>
            <ul>
              <li>+运费</li>
              <li>¥{{freight}}</li>
            </ul>
          </div>
        </div>
        <div class="true-pay-main">
          <div class="true-price">实付金额:<span>¥{{truetotal}}</span></div>
          <div class="pay-time">下单时间:{{ordertime}}</div>
        </div>
      </div>
    </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
export default {
  name: 'order-details',
  data:function(){
    return {
      navTitle:"订单详情",
      ordernum:this.$route.query.ordernum,
      sName:'',
      sCellphone:'',
      sAddress:'',
      sProvince:'',
      sCity:'',
      sArea:'',
      aGoods:[],
      status:'0',
      total:0,
      freight:0,
      truetotal:0,
      ordertime:''
    }
  },
  components:{
    subHeader
  },
  methods:{
    getOrderDetails(){
      let sUrl=this.config.domain+"/api/user/myorder/desc/uid/"+this.$store.state.uid+"/ordernum/"+this.ordernum+"?token="+this.config.token;
      this.myAjax(sUrl,"get",ret=>{
        if(ret.data.code==200){
          this.sName=ret.data.data.name;
          this.sCellphone=ret.data.data.cellphone;
          this.sAddress=ret.data.data.address;
          this.sProvince=ret.data.data.province;
          this.sCity=ret.data.data.city;
          this.sArea=ret.data.data.area;
          this.aGoods=ret.data.data.goods;
          this.status=ret.data.data.status;
          this.total=ret.data.data.total;
          this.freight=ret.data.data.freight;
          this.truetotal=ret.data.data.truetotal;
          this.ordertime=ret.data.data.ordertime;
        }
      });
    }
  },
  created(){
    this.globalFunc.checkUserLogin(this);
    this.getOrderDetails();
  },
  mounted(){

  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/orders/detail.css';
</style>
