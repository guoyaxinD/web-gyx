<!--模板-->
<template>
  <div id="order-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <tabs @getStatus="getStatus($event)"></tabs>
    <router-view :key="getKey"></router-view><!--解决子路由不更新数据-->
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  import tabs from './tabs'
export default {
  name: 'order-index',
  data:function(){
    return {
      navTitle:"全部订单",
      status:this.$route.query.status
    }
  },
  components:{//局部调用组件
    subHeader,
    tabs
  },
  methods:{
    getStatus($event){
      this.status=$event;
      if(this.status=='all'){
        this.$route.meta.title='全部订单';
        this.navTitle="全部订单";
      }else if(this.status=='0'){
        this.$route.meta.title='待付款';
        this.navTitle="待付款";
      }else if(this.status=='1'){
        this.$route.meta.title='待收货';
        this.navTitle="待收货";
      }else if(this.status=='2'){
        this.$route.meta.title='待评价';
        this.navTitle="待评价";
      }
    }
  },
  created(){
    this.globalFunc.checkUserLogin(this);
    this.getStatus(this.$route.query.status);
  },
  mounted(){

  },
  computed:{
    //解决子路由不更新数据
    getKey() {
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
    }
  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/orders/index.css';
</style>
