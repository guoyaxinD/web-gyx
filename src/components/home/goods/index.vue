<!--模板-->
<template>
  <div id="goods-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
      <div id="goods-header" class="goods-header">
        <div class="search-area flex-space">
          <div class="back" @click="back()"></div>
          <div class="search flex-space">
            <div class="icon"></div>
            <div class="search-input">
              <form action="" method="get" name="searchform" id="searchform" @submit="getData()">
                <input name="kwords" id="kwords" type="search" v-model="getKwords" />
                <div id="search-close" class="close"></div>
              </form>
            </div>
          </div>
          <div id="screenBtn" class="screen color-rule-font">筛选</div>
        </div>
        <div id="orders-area" class="orders-area flex-row-left">
          <div id="show-order" class="ranking color-rule-font">综合
            <div id="order-list" class="list">
              <ul>
                <li class="active">综合</li>
                <li @click="getParam('up')">价格从低到高</li>
                <li @click="getParam('down')">价格从高到低</li>
              </ul>
            </div>
          </div>
          <div id="sales" class="sales color-rule-font" @click="getParam('sales')">销量</div>
        </div>
      </div>
      <div>
        <div v-show="bListData" id="goods-area" class="goods-area">
          <div @click="goPage('goods/info',{aid:item.gid,kwords:getKwords})" class="goods-list flex-space" v-for="(item,index) in aGoodsData" :key="index">
            <div class="img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" /></div>
            <div class="desc-area">
              <div class="content-area">
                <div class="title goodsarea-title-color">{{item.title}}</div>
                <div class="price goodsarea-price-color">¥{{item.price}}</div>
                <div class="comment goodsarea-comment-color">销量<span>{{item.sales}}</span>件</div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="bNotData" class="not-data" style="margin-top:5rem;height:1000px">没有相关数据！</div>
      </div>
      <div id='screenBg' class='screenBg'></div>
      <div id="panel-wrap" class="panel-wrap">
        <div id="screen-panel" class="screen-panel">
          <div class="rows-class">
            <div class="attr color-rule-font">分类</div>
            <div class="arrow active"></div>
            <div class="current-value vals-font-active"></div>
            <div class="rows-content flex-box">
              <div class="items" data-checked="0" :data-id="item.cid" :data-title="item.title" v-for="(item,index) in aCategory" :key="index" >{{item.title}}</div>
            </div>
          </div>
          <div class="rows">
            <div class="attr color-rule-font">价格区间</div>
            <div class="arrow"></div>
            <div class="input-area">
              <div class="input-wrap1"><input name="price1" id="price1" class="price color-rule-font" type="tel" placeholder="最低价"></div>
              <div class="line"></div>
              <div class="input-wrap2"><input name="price2" id="price2" class="price" type="tel" placeholder="最高价"></div>
            </div>
            <div class="rows-content rows-price flex-box">
              <div class="items" data-checked="0" data-title="0-50">0-50</div>
              <div class="items" data-checked="0" data-title="50-99">50-99</div>
              <div class="items" data-checked="0" data-title="100-300">100-300</div>
              <div class="items" data-checked="0" data-title="301-1000">301-1000</div>
              <div class="items" data-checked="0" data-title="1001-4000">1001-4000</div>
              <div class="items" data-checked="0" data-title="4001-9999">4001-9999</div>
            </div>
          </div>
          <div class="rows-space"></div>
          <div id="param-area" class="param-area">
            <div class="param-rows touchTarget" v-for="(row,index) in aAttrs" :key="index">
              <div class="attr color-rule-font touchTarget">{{row.title}}</div>
              <div class="arrow touchTarget"></div>
              <div class="current-value vals-font-active touchTarget"></div>
              <div class="rows-content flex-box">
                <div class="items" data-checked="0" :data-id="item.pid" :data-title="item.title" v-for="(item,j) in row.param" :key="j">{{item.title}}</div>
              </div>
            </div>
            <div style="width:100%;height:7rem;clear:both;"></div>
          </div>
        </div>
        <div id="btn-area" class="btn-area">
          <div class="itemcount">共<span>{{itemTotal}}</span>件</div>
          <div id="reelect" class="reelect">全部重选</div>
          <div id="btn-sure" class="ensure">确定</div>
        </div>
      </div>
  </div>
</template>

<!--行为-->
<script>
  import IScroll from '../../../assets/js/common/lib/iscroll.js';
  import '../../../assets/js/common/lib/uprefresh.js';
  import '../../../assets/js/home/goods/myCheckBox.js';
  export default {
    name: 'goods-index',
    data:function(){
      return {
        aGoodsData:[],
        getKwords:'',
        otype:'all',
        aCategory:[],
        aAttrs:[],
        bNotData:false,
        bListData:true,
        itemTotal:0
      }
    },
    components:{
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      init:function(){
        var _this=this;
        _this.panelWrap.css({"height":_this.winHeight+"px"});

//        var btnAreaTop=$(window).height()-_this.btnArea.height();
//        _this.btnArea.css("top",btnAreaTop+"px");

        if(_this.getKwords!='' && _this.getKwords!='undefined' && _this.getKwords){
          _this.kwords.val(_this.getKwords);
        }

        _this.kwords.keydown(function(){
          if(_this.kwords.val().length<=1){
            _this.searchClose.css("display","none");
          }else {
            _this.searchClose.css("display", "block");
          }
        });

        _this.searchClose.on("click",function(){
          $(this).prev().val('');
          $(this).hide();
        });

        _this.kwords.on("click",function(){
          _this.curTop=$(window).scrollTop();
        });

        _this.kwords.on("blur",function(){
          _this.setScrollTop(_this.curTop);
        });

        _this.sBg.on("touchmove",function(e){
          e.preventDefault();
        });
        _this.sPanel.on("touchmove",function(e){
          e.preventDefault();
        });
        var preventDefault;
        if(this.globalFunc.isSystem()=='2'){
          preventDefault=false;
        }else{
          preventDefault=true;
        }
        _this.myScroll= new IScroll('#panel-wrap', {
          // eventPassthrough : true,
          scrollX : false,
          scrollY : true,
          preventDefault : preventDefault
          //click:true
        });

      },
      ranking:function(){
        var _this=this;
        _this.showOrder.on("click",function(){
          _this.clearSalersFont();
          $(this).toggleClass("active salers-font-active");
          if(_this.orderList.css("display")=='none') {
            _this.orderList.css("animation","show 0.3s");
            _this.orderList.css("display","block");
          }else{
            _this.orderList.css("animation","hides 0.3s");
            setTimeout(function(){
              _this.orderList.css("display","none");
              _this.orderList.addClass("activedown");
            },100);

          }
        });

        _this.sales.on("click",function(){
          _this.clearSalersFont();
          _this.clearShowOrder();
          $(this).toggleClass("salers-font-active");
        });
      },
      clearShowOrder:function(){
        var _this=this;
        _this.orderList.css("animation","hides 0.3s");
        setTimeout(function(){
          _this.orderList.css("display","none");
        },100);
        _this.showOrder.removeClass("active");
        _this.showOrder.removeClass("activedown");
      },
      clearSalersFont:function(){
        var _this=this;
        _this.ordersArea.children(".salers-font-active").removeClass("salers-font-active");
      },
      srceen:function(){
        var _this=this;
        _this.sBtn.on("click",function(){
          _this.curTop=$(window).scrollTop();
          _this.setScrollTop(0);
          _this.restPanelWrap();
          _this.sBg.css({"opacity":"1","z-index":"10"});
          _this.panelWrap.css({"transform":"translate3d(0%, 0px, 0px)","-webkit-transform":"translate3d(0%, 0px, 0px)"});
          _this.luckPage.css({"overflow-y":"hidden","height":$(window).height()-1+"px"});
          _this.myScroll.refresh();
        });
        _this.sBg.on("click",function(){
          $(this).css({"opacity":"0","z-index":"-1"});
          _this.panelWrap.css("transform","translate3d(100%, 0px, 0px)");
          _this.setScrollTop(_this.curTop);
          _this.luckPage.css({"overflow-y":"auto","height":"auto"});
        });

        _this.panelWrap.on("click",function(){
          _this.myScroll.refresh();
        });

        //其他属性列表
        _this.sPanelRows.on("click",function(){
          var rc=$(this).children(".rows-content")
          if(rc.css("height")=="0px"){
            rc.css("height","auto");
          }else{
            rc.css("height","0px");
          }
          $(this).children(".arrow").toggleClass("active");

        });

        _this.sPanelRowsContent.on("click",function(e){
          e.stopPropagation();
        });

        //分类
        _this.sPanelRowsClass.on("click",function(){
          var rc=$(this).children(".rows-content")
          if(rc.css("height")=="0px"){
            rc.css("height","auto");
          }else{
            rc.css("height","0px");
          }
          $(this).children(".arrow").toggleClass("active");

        });

        _this.sPanelRowsClassContent.on("click",function(e){
          e.stopPropagation();
        });

        //点击价格区间值
        _this.priceItems.on("click",function(){
          if($(this).attr("data-checked")=='1') {
            $(this).removeClass("active");
            $(this).attr("data-checked", "0");
            _this.sPanel.find("#price1").val('');
            _this.sPanel.find("#price2").val('');
          }else{
            _this.priceItems.removeClass("active").attr("data-checked","0");
            $(this).addClass("active");
            $(this).attr("data-checked", "1");

            var datatitle=$(this).attr("data-title");
            var dtarr=datatitle.split("-");
            _this.sPanel.find("#price1").val(dtarr[0]);
            _this.sPanel.find("#price2").val(dtarr[1]);
          }
        });

        //重新选择
        _this.reelect.on("click",function(){
          //解决点击重选，出现重复字段
          $(".param-rows").each(function(){
            $(this).mycheckbox();
          });
          $(".param-rows").each(function(){
            $(this).mycheckbox();
          });
          _this.sPanel.find(".price").val('');
          _this.priceItems.removeClass("active").attr("data-checked","0");

          _this.classItems.attr("data-checked", "0").removeClass("active");
          _this.sPanel.find(".current-value").html("");

          _this.sPanel.find(".param-rows").find(".items").attr("data-checked","0").removeClass("active");
          _this.price1='';
          _this.price2="";
          _this.cid=0;
          _this.param='';
        });


        //点击筛选确认按钮
        _this.btnSure.on("click",function(){
          _this.luckPage.css({"overflow-y":"auto","height":"auto"});
          var parr=new Array();
          $(".param-rows").find(".items").each(function(i){
            if($(this).attr("data-checked")==1){
              parr.push($(this).attr("data-id"));
            }
          });
          _this.price1=$("#price1").val();
          _this.price2=$("#price2").val();
          if(parr.length>0) {
            _this.param = JSON.stringify(parr);
          }else{
            _this.param='';
          }
          _this.getParam(_this.otype,_this.cid,_this.price1,_this.price2,_this.param);
          _this.screenHidden();
        });

      },
      screenHidden:function(){
        var _this=this;
        _this.sBg.css({"opacity":"0","z-index":"-1"});
        _this.panelWrap.css("transform","translate3d(100%, 0px, 0px)");
        _this.panelWrap.css("-webkit-transform","translate3d(100%, 0px, 0px)");
      },
      restPanelWrap:function(){
        var _this=this;
          _this.panelWrap.css({"height":$(window).height()+"px"});
      },
      setScrollTop:function(val){
        var _this=this;
        setTimeout(function(){
          $(window).scrollTop(val);
        },30);
      },
      //获取参数
      getParam(otype='',cid='',price1='',price2='',param=''){
        this.otype=otype;
        this.cid=cid;
        this.price1=price1;
        this.price2=price2;
        this.param=param;
        this.getData();
      },
      getData(){
        this.sUrl=this.config.domain+"/api/home/goods/search?kwords="+this.getKwords+"&otype="+this.otype+"&cid="+this.cid+"&price1="+this.price1+"&price2="+this.price2+"&param="+this.param+"&token="+this.config.token;
        this.myAjax(this.sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.globalFunc.cacheSearch(this.getKwords);
            this.bNotData=false;
            this.bListData=true;
            this.aGoodsData=ret.data.data;
            this.maxPage=ret.data.pageinfo.pagenum;
            this.itemTotal=ret.data.pageinfo.total;
            this.$nextTick(()=>{
              this.globalFunc.lazyImg();
            });
            this.scrollPage();
          }else {
            this.bNotData=true;
            this.bListData=false;
          }
         });
      },
      scrollPage:function(){
        this.goodsArea.uprefresh({"curPage":this.curPage,"maxPage":this.maxPage,"offsetBottom":this.offsetBottom},curPage=>{
          this.sUrl+="&page="+curPage;
          this.myAjax(this.sUrl,"get",(ret)=>{
              if(ret.data.code==200){
                for(let i=0;i<ret.data.data.length;i++){
                  this.aGoodsData.push(ret.data.data[i]);
                }
                this.$nextTick(()=>{
                  this.globalFunc.lazyImg();
                });
              }
          });
        });
      },
      //跳转到详情页面
      goPage(sPath,sQuery){
        this.$router.push({path:this.config.path+sPath,query:sQuery});
      },
      //分类
      getCategory(){
        let sUrl=this.config.domain+"/api/home/category/menu?token="+this.config.token;
        this.myAjax(sUrl,"get",ret=>{
          if(ret.data.code==200) {
            this.aCategory = ret.data.data;
            this.$nextTick(()=>{
              var _this=this;

              //点击分类下面的值
              _this.classItems=$("#screen-panel .rows-class .rows-content .items");
              _this.classItems.on("click",function(){
                if($(this).attr("data-checked")=='1'){
                  $(this).removeClass("active").attr("data-checked","0");
                  $(this).parent().prev().html("");
                  _this.cid=0;
                }else {
                  _this.classItems.attr("data-checked", "0").removeClass("active");
                  $(this).attr("data-checked", "1").addClass("active");
                  $(this).parent().prev().html($(this).attr("data-title"));
                  _this.cid=$(this).attr("data-id");
                }
              });

            })
          }
        })
      },

      //产品属性
      getAttr(){
        let sUrl=this.config.domain+"/api/home/goods/param?kwords="+this.getKwords+"&token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.aAttrs=ret.data.data;
            this.$nextTick(()=>{
              $(".param-rows").each(function(){
                $(this).mycheckbox();
              });
            });
          }
        });
      }

    },
    mounted:function(){
      this.winHeight=$(window).height();
      this.panelWrap=$("#panel-wrap");
      this.kwords=$("#kwords");
      this.searchClose=$("#search-close");
      this.showOrder=$("#show-order");
      this.orderList=$("#order-list");
      this.sales=$("#sales");
      this.ordersArea=$("#orders-area");
      this.sBtn=$("#screenBtn");
      this.sBg=$("#screenBg");
      this.luckPage=$(".luck-page");
      this.sPanel=$("#screen-panel");
      this.sPanelRows=$("#screen-panel .rows");
      this.sPanelRowsContent=$("#screen-panel .rows .rows-content");
      this.sPanelRowsClass=$("#screen-panel .rows-class");
      this.sPanelRowsClassContent=$("#screen-panel .rows-class .rows-content");
      this.classItems=$("#screen-panel .rows-class .rows-content .items");
      this.priceItems=$("#screen-panel .rows .rows-price .items");
      this.reelect=$("#reelect");
      this.price=$("#screen-panel").find(".price");
      this.btnArea=$("#btn-area");
      this.goodsArea=$("#goods-area");
      this.curTop=0;//记录滚动数值
      this.btnSure=$("#btn-sure");
      this.myScroll;
      this.param='';
      this.price1='';
      this.price2='';
      this.cid=0;
      this.curPage=1;
      this.maxPage=0;
      this.offsetBottom=100;
      this.itemTotal=0;
      this.sUrl='';
      this.get=this.globalFunc.localParam();
      this.getKwords=decodeURI(this.get.search['kwords']);
      this.init();
      this.ranking();
      this.srceen();
      this.getData();
      this.getCategory();
      this.getAttr();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/goods/goods.css";
</style>
