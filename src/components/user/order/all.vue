<!--模板-->
<template>
  <div id="order-all">
    <div id="order-main" class="order-main">
      <div class="order-list">
        <div class="order-items">
          <div id="data-list" v-show="bListData" v-for="(row,i) in aData" :key="i">
            <div @click="goPage('user/order/details',{'ordernum':row.ordernum})">
            <div class="list-1">
              <div class="order-status">订单编号：{{row.ordernum}}</div>
              <div class="order-status"><span v-if="row.status=='0'">待付款</span><span v-else-if="row.status=='1'">待收货</span><span v-else-if="row.status=='2'">已收货</span></div>
            </div>
            <div class="list-2" v-for="(item,j) in row.goods" :key="j">
              <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" /></div>
              <div class="goods-title">{{item.title}}</div>
              <div class="amount">x {{item.amount}}</div>
            </div>
            <div class="list-3">
              <div class="price">实付金额:¥{{row.total}}</div>
              <div class="buy"><span v-if="row.status=='2'">确认收货</span><span v-else @click="cancelOrder(''+row.ordernum+'',$event)">取消订单</span></div>
            </div>
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
  import Vue from 'vue'
  import {Dialog} from 'cube-ui'
  Vue.use(Dialog)
export default {
  name: 'order-all',
  data:function(){
    return {
      navTitle:"全部订单",
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
      this.sUrl=this.config.domain+"/api/user/myorder/index?uid="+this.$store.state.uid+"&status="+this.status+"&token="+this.config.token;
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
    cancelOrder(pOrdernum,event){
      event.cancelBubble=true;
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
          let sUrl=this.config.domain+"/api/user/myorder/clearorder/uid/"+this.$store.state.uid+"/ordernum/"+pOrdernum+"?token="+this.config.token;
          this.myAjax(sUrl,"get",ret=>{
            if(ret.data.code==200){
              event.target.parentNode.parentNode.parentNode.remove();
            }
          });
        },
        onCancel: () => {

        }
      }).show()
    },
    goPage(pPath,pQuery){
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
//    this.$router.afterEach((to,from)=>{
//      this.status=this.$route.query.status;
//      this.getData();
//    });
  },
  mounted(){
    this.oDataList=$("#data-list");
    //console.log(this.status);
  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/orders/index.css';
</style>
