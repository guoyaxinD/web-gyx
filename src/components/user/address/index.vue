<!--模板-->
<template>
  <div id="user-address-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div id="address-main" class="address-main">
      <ul v-for="(item,index) in aData" :key="index" @click="goEdit('user/address/edit',{'id':item.aid})">
        <li>
          <div class="contact">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.cellphone}}</div>
          <div class="address"><span v-if="item.isdefault=='1'">[默认]</span>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
        </li>
        <li></li>
      </ul>
    </div>
    <div class="add-main">
      <router-link :to="{path:this.config.path+'user/address/add'}" class="add-btn">+ 添加新地址</router-link>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  export default {
    name: 'user-address-index',
    data:function(){
      return {
        navTitle:"收货地址管理",
        aData:[]
      }
    },
    components:{
      subHeader
    },
    methods:{
      goEdit(pUrl,param){
        this.$router.push({path:this.config.path+pUrl,query:param})
      },
      getData(){
        let sUrl=this.config.domain+"/api/user/address/index/uid/"+this.$store.state.uid+"?token="+this.config.token;
        this.myAjax(sUrl,"get",ret=>{
          if(ret.data.code==200){
            this.aData=ret.data.data;
          }
        });
      },
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
  @import "../../../assets/css/user/address/index.css";
</style>
