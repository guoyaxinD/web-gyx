<!--模板-->
<template>
  <div id="classify">
    <div v-wechat-title="title"></div>
    <div id="luck-page" class="luck-page">
      <div id="search-header" class="search-header">
        <div class="sub-back" @click="back()"></div>
        <div class="nav-wrap"><input id="searchInput" type="text" placeholder="请输入宝贝名称" @click="searchWord()" /></div>
      </div>
      <div id="class-main" class="class-main">
        <div id="left" class="left">
          <div class="wrapper" id="wrapper">
            <div class="scroll-content">
              <div id="left-item" class="scroll-content2">
              <div class="menu" :ref="'menu-'+item.cid" :id="'menu-'+item.cid" :data-url="'/#/goods/classify?cid='+item.cid" v-for="(item,index) in aLeftMenu" :key="index">{{item.title}}</div>
              </div>
          </div>
          </div>
        </div>
        <div id="right" class="right">
          <div id="rightWrap" class="right-wrap">
            <div v-show="bMainShow" class="scroll-content">
              <div>
                <template v-for="(row,i) in aCategory">
                <div class="right-title">{{row.title}}</div>
                <div class="right-content">
                  <div class="items" v-for="(item,j) in row.goods" @click="goPushPage('goods/info',{aid:item.gid})" :key="j">
                    <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" /></div>
                    <div class="text">{{item.title}}</div>
                  </div>
                </div>
                </template>
              </div>
            </div>
            <div class="not-data" v-show="bNotData">没有相关宝贝！</div>
          </div>
        </div>
      </div>
    </div>
    <search></search>
  </div>
</template>

<!--行为-->
<script>
  import search from '../../common/page/search'
  import IScroll from '../../../assets/js/common/lib/iscroll.js'
  export default {
    name: 'classify',
    data:function(){
      return {
        title:this.$route.meta.title,
        aLeftMenu:[],
        aCategory:[],
        iCid:0,
        bMainShow:true,
        bNotData:false
      }
    },
    components:{
      search
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      searchWord(){
        document.getElementById("luck-page").style.display="none";
        document.getElementById("search-area").style.display="block";
        document.getElementById("kwords").focus();
      },
      bindEvent:function(){
        var _this=this;
        _this.left.on("click",".menu",function(){
          _this.left.find(".menu").removeClass("active");
          $(this).addClass("active");
          var prevLength=$(this).prevAll().length;
          var prevsHeight=-Math.floor(prevLength*($(this).height()));
          var parentHeight=_this.left.height();
          var allMenuHeight=_this.left.find(".menu").length*$(this).height();
          var bottomHeight=allMenuHeight-Math.abs(prevsHeight);
          if(Math.abs(prevsHeight)>=parentHeight/3 && bottomHeight>parentHeight) {
            _this.leftScroll.scrollTo(0, prevsHeight, 300, IScroll.utils.ease.bounce);
          }
        });

        //点击左侧栏目分类
        _this.leftItem.on("click",".menu",function(){
          var url=$(this).attr("data-url");
          window.history.replaceState({},null,url);
          var get=_this.globalFunc.localParam();
          _this.iCid=get.hash['/goods/classify?cid'];
          _this.getCategory(_this.iCid)
        });

      },
      getLeftMenu(){
        let sUrl=this.config.domain+"/api/home/category/menu?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200) {
            this.aLeftMenu = ret.data.data;
            this.$nextTick(()=>{
              this.leftScroll=new IScroll("#wrapper",{
                scrollY : true,
                preventDefault : false
              });
              if(this.iCid>0) {
                $(".menu").removeClass("active");
                this.$refs["menu-" + this.iCid][0].className = "menu active";
              }else{
                $(".menu").removeClass("active");
              }
            })
          }
        });
      },
      getCategory(){
        let sUrl=this.config.domain+"/api/home/category/show?cid="+this.iCid+"&token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
              this.aCategory=ret.data.data;
              this.bMainShow=true;
              this.bNotData=false;
              this.$nextTick(()=>{
                this.rightScroll=new IScroll("#rightWrap",{
                  scrollY : true,
                  preventDefault : false
                });
                this.rightScroll.on("scrollEnd",()=>{
                  this.globalFunc.lazyImg();
                });
                this.globalFunc.lazyImg();
              })
          }else{
            this.bMainShow=false;
            this.bNotData=true;
          }
        })
      },
      goPushPage(path,query){
        this.$router.push({path:this.config.path+path,query:query})
      }
    },
    mounted:function(){
      this.left=$("#left");
      this.right=$("#right");
      this.leftItem=$("#left-item");
      $("#wrapper,#rightWrap").on("touchmove",function(e){
        e.preventDefault();
      });
      this.bindEvent();
      this.left.height($(window).height()-45+"px");
      this.right.height($(window).height()-60+"px");


    },
    created(){
      this.rightScroll;
      this.leftScroll;
    },
    activated(){
      var get=this.globalFunc.localParam();
      this.iCid=get.search.cid;
      this.getLeftMenu();
      this.getCategory();
      this.left.height($(window).height()-45+"px");
      this.right.height($(window).height()-60+"px");
    }
  }
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/common/searchinput.css';
  @import '../../../assets/css/home/goods/class.css';
</style>
