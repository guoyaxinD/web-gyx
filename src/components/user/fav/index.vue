<!--模板-->
<template>
  <div id="user-fav-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div id="fav-main" v-show="bListData" class="fav-main">
      <div class="items" v-for="(item,index) in aData" :key="index">
        <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" /></div>
        <div class="text">{{item.title}}</div>
        <div class="price">¥{{item.price}}</div>
        <div class="buy-area">
          <div class="buy" @click="getPushPage('goods/info',{'aid':item.gid})">购买</div>
          <div class="del" @click="delFav(''+item.fid+'',$event)">删除</div>
        </div>
      </div>
    </div>
    <div v-show="bNotData" class="not-data" style="margin-top:5rem;height:1000px">没有相关数据！</div>
  </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import subHeader from '../../common/page/sub-header'
  import '../../../assets/js/common/lib/uprefresh.js';
  import {Dialog} from 'cube-ui'
  Vue.use(Dialog)
  export default {
    name: 'user-fav-index',
    data:function(){
      return {
        navTitle:'我的收藏',
        bNotData:false,
        bListData:true,
        aData:[]
      }
    },
    components:{
      subHeader
    },
    methods:{
      delFav(pId,pThis){
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
            pThis.target.parentNode.parentNode.remove();
            let sUrl=this.config.domain+"/api/user/fav/del/uid/"+this.$store.state.uid+"/fid/"+pId+"?token="+this.config.token;
            this.myAjax(sUrl,"get",ret=>{

            });
          },
          onCancel: () => {

          }
        }).show()
      },
      getData(){
        this.sUrl=this.config.domain+"/api/user/fav/index/uid/"+this.$store.state.uid+"?token="+this.config.token;
        this.myAjax(this.sUrl,"get",ret=>{
          if(ret.data.code==200){
            this.bNotData=false;
            this.bListData=true;
            this.aData=ret.data.data;
            this.maxPage=ret.data.pageinfo.pagenum;
            this.$nextTick(()=>{
              this.globalFunc.lazyImg();
            });
            this.scrollData();
          }else {
            this.bNotData=true;
            this.bListData=false;
          }
        });
      },
      scrollData(){
        this.fMain.uprefresh({"curPage":this.curPage,"maxPage":this.maxPage,"offsetBottom":this.offsetBottom},curPage=>{
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
      getPushPage(path,query){
        this.$router.push({path:this.config.path+path,query:query})
      }
    },
    created(){
      this.globalFunc.checkUserLogin(this);
      this.sUrl="";
      this.curPage=1;
      this.maxPage=0;
      this.offsetBottom=100;
      this.fMain=$("#fav-main");
      this.getData();
    },
    mounted(){
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/user/fav/index.css";
</style>
