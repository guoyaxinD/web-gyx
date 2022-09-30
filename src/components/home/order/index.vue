<!--模板-->
<template>
  <div id="order-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div id="order-main" class="order-main">
      <div class="address">
        <div class="text-area" @click="goAddress()">
          <div v-if="bAddressNull" class="text">您的收货地址为空,点击添加收货地址</div>
          <div v-if="bAddress" class="choose-address">
            <div class="contact">收货人:<span>{{sContact}}</span></div>
            <div class="cellphone">{{sCellphone}}</div>
            <div class="select-address">{{sAddressDetails}}</div>
          </div>
          <div class="arrow"></div>
        </div>
      </div>
      <div class="address-bottom">
        <div class="trapezoid"></div>
        <div class="trapezoid2"></div>
        <div class="trapezoid"></div>
        <div class="trapezoid2"></div>
        <div class="trapezoid"></div>
        <div class="trapezoid2"></div>
        <div class="trapezoid"></div>
        <div class="trapezoid2"></div>
        <div class="trapezoid"></div>
        <div class="trapezoid2"></div>
      </div>
      <div id="show-goods">
        <div class="goods" v-for="(item,index) in cartData" v-if="item.checked==true" :key="index">
          <div class="image"><img :src="item.img" /></div>
          <div class="title">{{item.title}}</div>
          <div class="amount">x {{item.amount}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
      </div>
      <div class="goods-sum">
        <ul>
          <li class="left">商品总额</li>
          <li class="right" id="total-price">￥{{priceTotal}}</li>
        </ul>
        <ul>
          <li class="left">运费</li>
          <li class="right" id="show-freight">+ ￥{{freightTotal}}</li>
        </ul>
      </div>
      <div class="sum-nav">
        <div class="left">
          <span class="sum-nav-font">实付金额:<span class="sum-price-font" id="true-total">￥{{trueTotal}}</span></span>
        </div>
        <button name="pay-btn" id="pay-btn" @click="goOrderEnd()" :disabled="bSubmit" class="right gray">提交订单</button>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  import toast from '../../common/libs/toast/toast.js';
  export default {
    name: 'order-index',
    data:function(){
      return {
        navTitle:"确认订单",
        cartData:this.$store.state.cartData.length>0?this.$store.state.cartData:localStorage.cart!=undefined?JSON.parse(localStorage.cart):[],
        priceTotal:this.$store.state.priceTotal>0?this.$store.state.priceTotal:localStorage.priceTotal!=undefined?localStorage.priceTotal:0,
        freightTotal:this.$store.state.freightTotal>0?this.$store.state.freightTotal:localStorage.freightTotal!=undefined?localStorage.freightTotal:0,
        trueTotal:0,
        bAddressNull:false,
        bAddress:true,
        sContact:'',
        sCellphone:'',
        sAddress:'',
        sProvince:'',
        sCity:'',
        sArea:'',
        sAddressDetails:'',
        iAddsId:this.$route.query.addsid!=undefined?this.$route.query.addsid:'',
        bSubmit:true
      }
    },
    components:{
      subHeader
    },
    methods:{
      //提交订单
      goOrderEnd(){
        if(this.iAddsId!='') {
          let orderCartData=[],aFreight=[],freightTotal=0;
          for(let i=0;i<this.$store.state.cartData.length;i++){
            if(this.$store.state.cartData[i].checked==true){
              orderCartData[i]=this.$store.state.cartData[i];
              aFreight.push(this.$store.state.cartData[i].freight)
            }
          }
          freightTotal=Math.max.apply(null,aFreight);
          if (!this.bSubmit){
            this.bSubmit=true;
            let sUrl=this.config.domain+"/api/order/add?token="+this.config.token;
            let goodsData=''+JSON.stringify(orderCartData)+'';
            let jData={"uid":this.$store.state.uid,"addsid":this.iAddsId,"freight":freightTotal,goodsData};
            this.myAjax(sUrl,"post",ret=>{
              if(ret.data.code==200){
                this.$router.replace({path:this.config.path+ 'order/end'})
              }else{
                toast(ret.data.data);
              }
            },jData);
          }

        }else{
          toast('请选择收货地址');
        }
      },
      getDefaultAddress(){
        if(this.iAddsId!='' && this.iAddsId>0){
            let sUrl=this.config.domain+"/api/user/address/info/uid/" + this.$store.state.uid + "/aid/"+this.iAddsId+"?token="+this.config.token;
            this.myAjax(sUrl,"get",ret=>{
              if(ret.data.code==200){
                this.sContact = ret.data.data.name;
                this.sCellphone = ret.data.data.cellphone;
                this.sProvince = ret.data.data.province;
                this.sCity = ret.data.data.city;
                this.sArea = ret.data.data.area;
                this.sAddress = ret.data.data.address;
                this.sAddressDetails = this.sProvince + this.sCity + this.sArea + this.sAddress;
              }
            });
        }else {
          let sUrl = this.config.domain + "/api/user/address/defaultAddress/uid/" + this.$store.state.uid + "?token=" + this.config.token;
          this.myAjax(sUrl, "get", (ret) => {
            if (ret.data.code == 200) {
              this.bAddress = true;
              this.bAddressNull = false;
              this.sContact = ret.data.data.name;
              this.sCellphone = ret.data.data.cellphone;
              this.sProvince = ret.data.data.province;
              this.sCity = ret.data.data.city;
              this.sArea = ret.data.data.area;
              this.sAddress = ret.data.data.address;
              this.sAddressDetails = this.sProvince + this.sCity + this.sArea + this.sAddress;
              this.iAddsId=ret.data.data.aid;
            } else {
              this.bAddress = false;
              this.bAddressNull = true;
            }
          });
        }
      },
      goAddress(){
        if(this.$store.state.isLogin){
          this.$router.push({path:this.config.path+'address/index'});
        }else{
          this.$router.push({path:this.config.path+'login/index'});
        }
      }
    },
    created(){
      this.globalFunc.checkUserLogin(this);
      this.trueTotal=(parseFloat(this.priceTotal)+parseFloat(this.freightTotal)).toFixed(2);
    },
    mounted(){
      this.payBtn=$("#pay-btn");
      if(this.priceTotal>0){
        this.payBtn.removeClass("gray");
        this.bSubmit=false;
      }
      this.getDefaultAddress();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/cart/order.css";
</style>
