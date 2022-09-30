<!--模板-->
<template>
    <div id="tabs-main" class="tabs-main">
      <div @click="goPage('user/order/index/all',{status:'all'})" :class="{'list':true,'active':tabs.all}">全部订单</div>
      <div @click="goPage('user/order/index/all',{status:'0'})" :class="{'list':true,'active':tabs.waitpay}">待付款</div>
      <div @click="goPage('user/order/index/all',{status:'1'})" :class="{'list':true,'active':tabs.take}">待收货</div>
      <div @click="goPage('user/order/index/review',{status:'2'})" :class="{'list':true,'active':tabs.review}">待评价</div>
    </div>
</template>

<!--行为-->
<script>
export default {
  name: 'tabs-main',
  data:function(){
    return {
      status:this.$route.query.status,
      tabs:{"all":true,"waitpay":false,"take":false,"review":false}
    }
  },
  components:{//局部调用组件
  },
  methods:{
    getStatus(){
      this.status=this.$route.query.status;
      for(let i in this.tabs){
        this.tabs[i]=false;
      }
      if(this.status=='all'){
        this.tabs.all=true;
      }else if(this.status=='0'){
        this.tabs.waitpay=true;
      }else if(this.status=='1'){
        this.tabs.take=true;
      }else if(this.status=='2'){
        this.tabs.review=true;
      }
    },
    goPage(path,query){
      this.$router.replace({path:this.config.path+path,query:query});
      //利用setTimeout延迟30毫秒解决样式不改变
      setTimeout(()=>{
        this.getStatus();
        this.$emit("getStatus",this.status);
      },50)

    }
  },
  created(){
    this.getStatus();
  },
  mounted(){

  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/orders/index.css';
</style>
