<!--模板-->
<template>
  <div id="order-review">
    <div v-wechat-title="$route.meta.title"></div>
    <div id="order-main" class="order-main">
      <div class="review-list">
        <div class="order-items">
          <div v-for="(row,i) in aData" :key="i" @click="goPage('user/order/details',{'ordernum':row.ordernum},$event)">
            <div class="list-1">
              <div class="order-status">订单编号：{{row.ordernum}}</div>
              <div class="order-status"><span v-if="row.status=='0'">待付款</span><span v-else-if="row.status=='1'">待收货</span><span v-else-if="row.status=='2'">已收货</span></div>
            </div>
            <div class="list-2" v-for="(item,j) in row.goods" :key="j">
              <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" /></div>
              <div class="goods-title">{{item.title}}</div>
              <div class="amount">x {{item.amount}}</div>
              <div class="comment" @click="goPage('user/order/add_review',{'gid':item.gid,'ordernum':row.ordernum},$event)"><span v-if="item.isreview=='0'">评价</span><span v-else-if="item.isreview=='1'">追加评价</span></div>
            </div>
            <div class="list-3">
              <div class="price">实付金额:¥{{row.total}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="bNotData" class="not-data" style="height:2.5rem;">没有相关数据！</div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import '../../../assets/js/common/lib/uprefresh.js';
export default {
  name: 'order-review',
  data:function(){
    return {
      navTitle:"待评价",
      status:this.$route.query.status,
      aData:[],
      bNotData:false,
      bListData:true
    }
  },
  components:{
  },
  methods:{
    getData(){
      this.sUrl=this.config.domain+"/api/user/myorder/reviewOrder/uid/"+this.$store.state.uid+"/status/"+this.status+"?token="+this.config.token;
      this.myAjax(this.sUrl,"get",ret=>{
        if(ret.data.code==200){
          this.bNotData=false;
          this.bListData=true;
          this.aData=ret.data.data;
          this.maxPage=ret.data.pageinfo.pagenum;
          this.$nextTick(()=>{
            this.globalFunc.lazyImg();
          });
          this.scrollPage();
        }else{
          this.bNotData=true;
          this.bListData=false;
        }
      });
    },
    scrollPage:function(){
      this.oDataList.uprefresh({"curPage":this.curPage,"maxPage":this.maxPage,"offsetBottom":this.offsetBottom},curPage=>{
        this.sUrl+="&page="+curPage;
        this.myAjax(this.sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            for(let i=0;i<ret.data.data.length;i++){
              this.aData.push(ret.data.data[i]);
            }
            this.$nextTick(()=>{
              this.globalFunc.lazyImg();
            });
          }
        });
      });
    },
    goPage(pPath,pQuery,$event){
      $event.cancelBubble=true;
      this.$router.push({path:this.config.path+pPath,query:pQuery});
    }
  },
  created(){
    this.globalFunc.checkUserLogin(this);
    this.curPage=1;
    this.maxPage=0;
    this.offsetBottom=100;
    this.sUrl='';
    this.getData();
  },
  mounted(){
    this.oDataList=$("#order-main");
  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/orders/index.css';
</style>
