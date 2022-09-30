<!--模板-->
<template>
  <div id="cart-index">
    <div v-wechat-title="$route.meta.title"></div>
    <div id="luck-page" class="luck-page">
      <subHeader :navTitle=navTitle></subHeader>
      <div id="cart-main" class="cart-main">
        <div v-for="(item,index) in cartData" :key="index" class="item-list">
          <div class="select-area">
            <label :class="{'check-mark':true,'active':item.checked}" @click="selectCart(''+item.cartId+'')"></label>
          </div>
          <div class="items-wrap">
            <div class="goods-image"><img :src="item.img" /></div>
            <div class="del" @click="delCart(''+index+'')">删除</div>
            <div class="goods-title">{{item.title}}</div>
            <div class="goods-param"><span class="attr" v-for="attr in item.attrs">{{attr.title}}:<span class="param" v-for="param in attr.param">{{param.title}}</span></span></div>
            <div class="price">¥{{item.price}}</div>
            <div class="itemsCount">
              <div class="num-wrap">
                <div class="minus active" @click="minus(''+item.cartId+'',''+item.amount+'',''+item.checked+'')">-</div>
                <div class="input-num"><input type="tel" class="amount" name="amount" v-model="item.amount" @keyup="checkAmount()"  @blur="changeAmount(''+item.cartId+'')" ></div>
                <div class="plus" @click="plus(''+item.cartId+'',''+item.amount+'',''+item.checked+'')">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-space"></div>
      <div class="sett-nav">
        <div class="sett-left">
          <div class="choose" id="all-check">
            <label @click="allSelectCart()" >
            <div :class="{'check-mark':true,'active':bAllChecked}"></div>
            <div class="check-text">全选</div>
            </label>
          </div>
          <div class="total">合计: <span>¥<span id="total">{{priceTotal}}</span></span></div>
        </div>
        <button type="button" @click="goOrder()" :class="{'sett-right':true,'disable':priceTotal>0?false:true}">去结算</button>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  export default {
    name: 'cart-index',
    data:function(){
      return {
        cartData:this.$store.state.cartData.length>0?this.$store.state.cartData:localStorage.cart!=undefined?JSON.parse(localStorage.cart):[],
        priceTotal:this.$store.state.priceTotal>0?this.$store.state.priceTotal:localStorage.priceTotal!=undefined?localStorage.priceTotal:0,
        bChecked:true,
        bAllChecked:true,
        navTitle:"购物车"
      }
    },
    components:{
      subHeader
    },
    methods:{
      back(){
          this.$router.go(-1);
      },
      //点击选择
      selectCart(pGid){
        if(this.bChecked){
            this.bChecked=false;
        }else{
            this.bChecked=true;
        }
        this.$store.commit("checkedCartData", {cartId: pGid, checked: this.bChecked});
        this.priceTotal=this.$store.state.priceTotal;
        this.setAllChecked();

      },
      //点击全择
      allSelectCart(){
        if(this.cartData.length>0) {
          if (this.bAllChecked == true) {
            this.bAllChecked = false;
          } else {
            this.bAllChecked = true;
          }
          this.$store.commit("allCheckedCartData", this.bAllChecked);
          this.priceTotal = this.$store.state.priceTotal;
        }
      },
      //点击减号
      minus(pGid,pAmount,pChecked){
        if(pChecked=='true') {
          let iAmount = parseInt(pAmount);
          if (iAmount <= 1) {
            iAmount = 1;
          } else {
            iAmount -= 1;
          }
          this.$store.commit("changeAmount", {cartId: pGid, amount: iAmount});
          this.priceTotal = this.$store.state.priceTotal;
        }
      },
      //点击加号
      plus(pGid,pAmount,pChecked){
        if(pChecked=='true') {
          let iAmount = parseInt(pAmount);
          iAmount += 1;
          this.$store.commit("changeAmount", {cartId: pGid, amount: iAmount});
          this.priceTotal = this.$store.state.priceTotal;
        }
      },
      //检测输入的数量是否规范
      checkAmount(){
        for(var key in this.cartData){
          if(isNaN(this.cartData[key].amount)){
            this.cartData[key].amount=this.cartData[key].amount.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[\#|\*|,|\+|;]/g,'')
            this.bSubmitAmount=false;
            break;
          }else if(this.cartData[key].amount<=0){
            this.cartData[key].amount=1;
            break;
          } else{
            this.bSubmitAmount=true;
          }
        }
      },
      //修改数量
      changeAmount(pGid){
        if(this.bSubmitAmount) {
          for(let key in this.cartData){
            if(this.cartData[key].cartId==pGid){
              if(this.cartData[key].checked==true){
                this.$store.commit("changeAmount");
                this.priceTotal = this.$store.state.priceTotal;
              }
              break;
            }
          }
        }
      },
      //删除宝贝
      delCart(pIndex){
        this.$store.commit("delCart", {index: pIndex});
        this.priceTotal = this.$store.state.priceTotal;
        this.setAllChecked();
      },
      setAllChecked(){
        this.setChecked();
        let bChecked=true;
        if (this.$store.state.cartData.length>0){
          for (let i=0;i<this.$store.state.cartData.length;i++){
            if (!this.$store.state.cartData[i].checked){
              bChecked=false;
              break;
            }
          }
        }
        if(this.priceTotal>0 && this.bDelChecked && bChecked) {
          this.bAllChecked = true;
        }else{
          this.bAllChecked = false;
        }
      },
      goOrder(){
        if(this.priceTotal>0) {
          this.$router.push({path:this.config.path+ 'order/index'});
        }
      },
      //检测删除后是否选中
      setChecked(){
        if(this.$store.state.cartData.length>0){
          for(let i=0;i<this.$store.state.cartData.length;i++){
            if(this.$store.state.cartData[i].checked){
              this.bDelChecked=true;
              break;
            }
          }
        }
      }
    },
    mounted:function(){
        this.setAllChecked();
    },
    created:function(){
      this.bSubmitAmount=true;
      this.bDelChecked=false;
    }
  }
</script>

<!--样式-->
<style scoped>
  .cart-main{width:100%;margin-top:2.5rem;padding-bottom:2.5rem;background:#FFFFFF;}
  .cart-main .item-list{width:100%;height:6rem;background:#FFFFFF;border-bottom:#EFEFEF solid 2px;overflow:hidden;}
  .cart-main .select-area{width:10%;height:100%;float:left;position:relative;}
  .cart-main .select-area .check-mark{width:0.8rem;height:0.8rem;border:#EFEFEF solid 1px;border-radius:100%;position:absolute;z-index:1;top:43%;left:15%;}
  .cart-main .select-area .check-mark input{opacity:0;width:100%;height:100%;}
  .cart-main .select-area .check-mark.active{background-image:url("../../../assets/images/home/cart/checkmark.png");background-size:100%;background-repeat:no-repeat;background-position:center;border:none 0px;}
  .cart-main .items-wrap{width:90%;height:100%;float:left;position:relative;}
  .cart-main .items-wrap .goods-image{width:3rem;height:3rem;position:absolute;z-index:1;left:0px;top:25%;overflow:hidden;}
  .cart-main .items-wrap .goods-image img{width:100%;}
  .cart-main .items-wrap .goods-title{width: 70%;height: 1.5rem;font-size: 0.6rem; position: absolute;z-index: 1;left:25%;top: 10%;overflow: hidden;line-height: 0.8rem;text-align:left;}
  .cart-main .items-wrap .goods-param{width: 70%;height: auto;font-size: 0.6rem; position: absolute;z-index: 1;left:25%;top: 38%;overflow: hidden;text-align:left;white-space:nowrap;text-overflow:ellipsis;color:#B5B5B5;}
  .cart-main .items-wrap .goods-param .attr{margin-right:10px;}
  .cart-main .items-wrap .goods-param .param{margin-right:5px;}
  .cart-main .items-wrap .price{width:30%;height:auto;position:absolute;z-index:1;left:25%;top:65%;color:#CC0004;font-size:0.7rem;}
  .cart-main .items-wrap .itemsCount{width:30%;height:auto;position:absolute;z-index:1;left:65%;top:65%;}
  .cart-main .items-wrap .itemsCount .num-wrap{width:5rem;height:1.2rem;border:solid 1px #000000;border-radius:3px;position:absolute;z-index:1;right:5%;top:0%;overflow:hidden;}
  .cart-main .items-wrap .itemsCount .num-wrap .minus{width:1.5rem;height:0.8rem;border-right:#B5B5B5 solid 1px;margin-top:4%;color:#B5B5B5;text-align:center;line-height:0.8rem;float:left;}
  .cart-main .items-wrap .itemsCount .num-wrap .minus.active{color:#000000;border-right:#000000 solid 1px;}
  .cart-main .items-wrap .itemsCount .num-wrap .plus{width:1.5rem;height:0.8rem;border-left:#000000 solid 1px;margin-top:4%;color:#000000;text-align:center;line-height:0.8rem;float:left;}
  .cart-main .items-wrap .itemsCount .input-num{width:1.9rem;height:auto;float:left;margin-top:-0.2rem;}
  .cart-main .items-wrap .itemsCount .input-num .amount{width:100%;font-size:0.7rem;border:none 0px;outline:none;-webkit-appearance:none;text-align:center;}
  .cart-main .items-wrap .del{width:auto;height:auto;position:absolute;z-index:1;left:1rem;top:83%;font-size: 0.6rem;color:#B5B5B5;}

  .sett-nav{width:100%;height:2.5rem;position:fixed;z-index:5;bottom:2.5rem;border-top:solid #EFEFEF 1px;background:#FFFFFF;}
  .sett-left{width:70%;height:100%;position:relative;float:left;}
  .sett-nav .sett-left .choose{width:5rem;height:auto;position:absolute;z-index:5;left:5%;top:30%;}
  .sett-nav .sett-left .choose .check-mark{width:0.8rem;height:0.8rem;border:#EFEFEF solid 1px;border-radius:100%;}
  .sett-nav .sett-left .choose .check-mark.active{background-image:url("../../../assets/images/home/cart/checkmark.png");background-size:100%;background-repeat:no-repeat;background-position:center;border:none 0px;}
  .sett-nav .sett-left .choose .check-text{width:2rem;height:auto;position:absolute;z-index:5;left:25%;top:15%;font-size:0.6rem;}
  .sett-nav .sett-left .total{width:auto;height:auto;position:absolute;right:4%;top:33%;z-index:5;font-size:0.6rem;}
  .sett-nav .sett-left .total span{color:#CC0004}
  .sett-nav .sett-right{width:30%;height:100%;background:#CC0004;text-align:center;line-height:2.5rem;float:left;color:#FFFFFF;font-size:0.8rem;border-radius: 0px;}
  .sett-nav .sett-right.disable{background:#BFBFBF;}
  .nav-space{width:100%;height:2.5rem;background:#FFFFFF;}
</style>
