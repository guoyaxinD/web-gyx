<!--模板-->
<template>
    <div id="info-comment" class="info-comment">
      <div class="com-title comment-title-font">商品评价（{{reviewTotal}}）</div>
      <div id="comment-list" class="comment-list" v-for="(item,index) in aReview" :key="index">
        <div class="user-area">
          <div class="face"><img :src="item.head" /></div>
          <div class="nickname comment-nickname-font">{{item.nickname}}</div>
        </div>
        <div class="comment-content comment-nickname-font">{{item.content}}</div>
        <div class="comment-date fun-text-color">{{item.times}}</div>
      </div>
    </div>
</template>

<!--行为-->
<script>
  import '../../../assets/js/common/lib/uprefresh.js';
  export default {
    name: 'info-comment',
    data:function(){
      return {
        aid:this.$route.query.aid,
        bNotData:false,
        bListData:true,
        reviewTotal:0,
        aReview:[]
      }
    },

    components:{

    },
    methods:{
      getReviews(){
        this.sUrl=this.config.domain+"/api/home/reviews/index/gid/"+this.aid+"?token="+this.config.token;
        this.myAjax(this.sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.bListData=true;
            this.bNotData=false;
            this.reviewTotal=ret.data.pageinfo.total;
            this.aReview=ret.data.data;
            this.maxPage=ret.data.pageinfo.pagenum;
            this.getScrollData();
          }else{
            this.bListData=false;
            this.bNotData=true;
          }
        });
      },
      getScrollData(){
        this.oCommentList.uprefresh({"curPage":this.curPage,"maxPage":this.maxPage,"offsetBottom":this.offsetBottom},(curPage)=>{
          this.sUrl+="&page="+curPage;
          this.myAjax(this.sUrl,"get",(ret)=>{
            if(ret.data.code==200){
              for(let i=0;i<ret.data.data.length;i++){
                this.aReview.push(ret.data.data[i]);
              }
            }
          });
        })
      }
    },
    mounted:function(){
      this.oCommentList=$("#comment-list");
      this.sUrl='';
      this.curPage=1;
      this.maxPage=0;
      this.offsetBottom=100;
      this.getReviews();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/goods/info.css";
</style>
