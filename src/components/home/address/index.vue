<!--模板-->
<template>
  <div id="address-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div id="address-main" class="address-main">
      <div id="choose-address-main" class="choose-address-main">
        <div class="address-fun">
          <div class="item">配送地址</div>
          <router-link :to="{path:this.config.path+'address/add'}" id="add-address-btn" class="item">+增加配送地址</router-link>
        </div>
        <div id="items-main" class="items-main">
          <div class="list" @click="selectAddress(''+item.aid+'')" v-for="(item,index) in aData" :key="index">
            <div class="list-content">
              <div class="left" v-if="item.isdefault==1"></div>
              <div class="right">
                <ul>
                  <li>{{item.name}}</li>
                  <li>{{item.cellphone}}</li>
                </ul>
                <div class="right-address">
                  <div class="default" v-if="item.isdefault==1">默认</div><div class="right-address-font">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
                </div>
              </div>
            </div>
            <div class="list-fun">
              <div class="edit" @click="goEditAddress(''+item.aid+'',$event)"></div>
              <div class="del" @click="delAddress(''+item.aid+'',$event)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import subHeader from '../../common/page/sub-header'
  import toast from '../../common/libs/toast/toast.js'
  import {Dialog} from 'cube-ui'
  Vue.use(Dialog)
  export default {
    name: 'address-index',
    data:function(){
      return {
        navTitle:"选择收货地址",
        aData:[]
      }
    },
    components:{
      subHeader
    },
    methods:{
      //修改地址
      goEditAddress(pId,$event){
        $event.cancelBubble=true;
        this.$router.push({path:this.config.path+'address/edit',query:{"id":pId}});
      },
      //删除地址
      delAddress(pId,pThis){
        pThis.cancelBubble=true;
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确认要删除吗？',
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
            this.delAddressData(pId,pThis);
          },
          onCancel: () => {

          }
        }).show()
      },
      delAddressData(pId,pThis){
        let sUrl=this.config.domain+"/api/user/address/del/uid/"+this.$store.state.uid+"/aid/"+pId+"?token="+this.config.token;
        this.myAjax(sUrl,"get",ret=>{
          if(ret.data.code==200){
            pThis.target.parentNode.parentNode.remove();
          }else{
            toast(ret.data.data)
          }
        });
      },
      getData(){
        let sUrl=this.config.domain+"/api/user/address/index/uid/"+this.$store.state.uid+"?token="+this.config.token;
        this.myAjax(sUrl,"get",ret=>{
          if(ret.data.code==200){
            this.aData=ret.data.data;
          }
        });
      },
      selectAddress(pId){
        this.$router.push({path:this.config.path+'order/index',query:{"addsid":pId}});
      }
    },
    created(){
      this.globalFunc.checkUserLogin(this);
      this.getData();
    },
    mounted(){

    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/cart/order.css";
</style>
