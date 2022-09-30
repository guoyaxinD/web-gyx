<!--模板-->
<template>
  <div id="order-add-review" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle></subHeader>
    <div id="review-main" class="review-main">
        <div class="review-score" :data-rsid="item.rsid" v-for="item in aServiceData">
          <div class="text">{{item.title}}</div>
          <div class="stars">
            <div class="items" data-val="1" data-checked="false"></div>
            <div class="items" data-val="2" data-checked="false"></div>
            <div class="items" data-val="3" data-checked="false"></div>
            <div class="items" data-val="4" data-checked="false"></div>
            <div class="items" data-val="5" data-checked="false"></div>
          </div>
        </div>
      <div class="text-area">
        <textarea name="contents" id="contents" v-model="sContent" placeholder="来分享你的消费感受吧!"></textarea>
        <button type="button" :disabled="bDisabled" name="saveBtn" id="saveBtn" @click="submitData()">提交</button>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import subHeader from '../../common/page/sub-header'
  import '../../../assets/js/common/lib/stars.js'
  import toast from '../../common/libs/toast/toast.js';
export default {
  name: 'order-add-review',
  data:function(){
    return {
      navTitle:"评价",
      sContent:'',
      aServiceData:[],
      bDisabled:false,
      gid:this.$route.query.gid,
      ordernum:this.$route.query.ordernum
    }
  },
  components:{
    subHeader
  },
  methods:{
    submitData(){
      if(this.sContent.match(/^\s*$/)){
        toast("请输入评价内容")
        return false;
      }
      this.bDisabled=true;
      this.addReviewData();
    },
    getService(){
      let sUrl=this.config.domain+"/api/home/reviews/service?token="+this.config.token;
      this.myAjax(sUrl,"get",ret=>{
        if(ret.data.code==200){
          this.aServiceData=ret.data.data;
          this.$nextTick(()=>{
            $("#review-main").find(".review-score").each(function(){
              $(this).stars();
            });
          })
        }
      });
    },
    //添加评价数据
    addReviewData(){
      let aServiceData=[],_this=this;
      $("#review-main").find(".review-score").each(function(){
        let asid=$(this).attr("data-rsid");
        $(this).find(".items").each(function(){
          if($(this).attr("data-checked")=='true'){
            aServiceData.push({"gid":_this.gid,"myid":_this.$store.state.uid,"rsid":asid,"score":$(this).attr("data-val")});
            return false;
          }
        });
      });
      if (this.bSubmit){
        this.bSubmit=false;
        let sUrl=this.config.domain+"/api/home/reviews/add?token="+this.config.token;
        let jData={"uid":_this.$store.state.uid,"gid":_this.gid,"content":_this.sContent,'ordernum':_this.ordernum,"rsdata":JSON.stringify(aServiceData)};
        this.myAjax(sUrl,"post",ret=>{
          if(ret.data.code==200){
            toast(ret.data.data);
            setTimeout(()=>{
              this.bDisabled=false;
              this.$router.go(-1);
            },2000)
          }else{
            toast(ret.data.data);
          }
        },jData);
      }
    }
  },
  created(){
    this.globalFunc.checkUserLogin(this);
    this.bSubmit=true;
    this.getService();
  },
  mounted(){

  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/user/orders/review.css';
</style>
