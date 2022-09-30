<!--模板-->
<template>
  <div id="info-content">
    <div id="luck-page" class="luck-page">
      <div id="cards-wrap" class="goods-content-wrap">
        <div class="goods-content">
          <div class="goods-info">
            <div id="slider" class="slider">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="item in aSlide"><img :src="item" /></div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>
            <div class="g-title goodsarea-title-color">{{sGoodsName}}</div>
            <div class="g-price goodsarea-price-color">¥{{iPrice}}</div>
            <div class="g-flex flex-space">
              <div class="cell goodsarea-comment-color">快递：{{iFreight}}元</div>
              <div class="cell goodsarea-comment-color">月销量{{iSales}}件</div>
            </div>
          </div>
          <div class="info-comment">
            <div v-show="bListData">
              <div class="com-title comment-title-font">商品评价（{{reviewTotal}}）</div>
              <div class="comment-list" v-for="item in aReview">
                <div class="user-area">
                  <div class="face"><img :src="item.head" /></div>
                  <div class="nickname comment-nickname-font">{{item.nickname}}</div>
                </div>
                <div class="comment-content comment-nickname-font">{{item.content}}</div>
                <div class="comment-date fun-text-color">{{item.times}}</div>
              </div>
              <div class="comment-more">
                <div id="comment-more" class="comment-more-btn comment-more-btn-font"><span @click="goComment()">查看更多评价</span></div>
              </div>
            </div>
            <div v-show="bNotData" class="not-data">没有相关评论！</div>
          </div>
        </div>
      </div>
      <div id="buy-bar" class="buy-bar">
        <div id="fav" class="fav">收藏</div>
        <form name="cartform" id="cartform" method="post" action="">
          <button type="button" id="join-cart" class="join-cart">加入购物车</button>
        </form>
        <div id="cart-panel" class="cart-panel">
          <div class="close-area">
            <div id="x" class="x"></div>
            <div class="vertical"></div>
            <div class="circle"></div>
          </div>
          <div class="show-goods">
            <div id="goods-image-wrap" class="image"><img id="goods-image" :src="aSlide[0]" width="100%" /></div>
            <div class="right-area">
              <div class="goods-title">{{sGoodsName}}</div>
              <div class="goods-desc">
                <div class="price">￥{{iPrice}}</div>
                <div class="goods-code">商品编码:{{aid}}</div>
              </div>
            </div>
          </div>
          <div id="rule-wrap" class="rule-wrap">
            <div class="rule-area">
              <div class="rows" v-for="(row) in attrs">
                <div class="rows-title">{{row.title}}</div>
                <div class="rows-param">
                  <span v-for="item in row['values']" @click="getParam(''+row.attrid+'',''+item.vid+'')" :class="{'active':item.checked}">{{item.value}}</span>
                </div>
              </div>
              <div class="buynum-area">
                <div class="buynum-left">购买数量</div>
                <div class="buynum-right">
                  <div class="num-wrap">
                    <div id="minus" class="minus">-</div>
                    <div class="input-num"><input type="tel" class="amount" name="amount" id="amount" v-model="iAmount" @keyup="checkAmount()" ></div>
                    <div id="plus" class="plus">+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="sureBtn" class="sureBtn">确定</div>
        </div>
      </div>
      <div id="mark" class="mark"></div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import Swiper from '../../../assets/js/common/lib/swiper.min.js'
  import TweenMax from '../../../assets/js/common/lib/TweenMax.min.js'
  import toast from '../../common/libs/toast/toast.js'
  import WeixinClass from '../../../assets/js/common/lib/weixin.js'
  export default {
    name: 'info-content',
    data:function(){
      return {
        aid:this.$route.query.aid,
        attrs:[],
        sGoodsName:'',
        iPrice:0,
        iFreight:0,
        iSales:0,
        aSlide:[],
        reviewTotal:0,
        aReview:[],
        bNotData:false,
        bListData:true,
        iAmount:1
      }
    },
    created(){
    },
    components:{

    },
    methods:{
      swiper(){
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true
        });
      },
      goComment(){
        this.navList.removeClass("active");
        this.navList.eq(2).addClass("active");
        this.$router.push({path:'/goods/info/info_comment',query:{aid:this.aid,"pageFrom":'goods_classify','type':2}});
      },
      bindEvent:function(){
        var _this=this;

        _this.fav.on("click",()=>{
          let sUrl=this.config.domain+"/api/goods/fav/uid/"+this.$store.state.uid+"/gid/"+this.aid+"?token="+this.config.token;
          this.myAjax(sUrl,"get",ret=>{
            if(ret.data.code==200){
              toast(ret.data.data);
            }else{
              toast(ret.data.data);
            }
          });
        });

        _this.joinCart.on("click",function(){
          _this.curWinTop=$(window).scrollTop();
          _this.cartPanel.css("transform","translate3d(0px,0px,0px)");
          _this.cartPanel.css("-webkit-transform","translate3d(0px,0px,0px)");
          _this.mark.css({"z-index":10,"opacity":1});

          _this.luckpage.css({"overflow-y":"hidden","height":$(window).height()-1+"px"});
          _this.mark.on("touchmove",function(e){
            e.preventDefault();
          });
        });

        _this.mark.on("click",function(){
          _this.hideCartPanel();
        });

        _this.x.on("click",function(){
          _this.hideCartPanel();
        });

        _this.sureBtn.on("click",function(){
          var ischeck=false;

          for(let i=0;i<_this.attrs.length;i++){
            ischeck=false;
            for(let j=0;j<_this.attrs[i].values.length;j++){
                if(_this.attrs[i].values[j].checked){
                  ischeck=true;
                  break;
                }
            }
            if(ischeck==false){
              toast("请选择"+_this.attrs[i].title);
              return false;
            }
          }

          if(_this.amount.val()<=0 || _this.amount.val()==''){
            toast("请输入数量");
            ischeck=false;
          }

          if(ischeck==true){
            //加入购物车
            if(_this.isJoinCart==false) {
              _this.addCart();
            }

          }

        });

        //点击加号
        _this.plus.on("click",function(){
          var amount=_this.amount.val();
          amount++;
          _this.amount.val(amount);
          _this.minus.addClass("active");
        });

        //点击减号
        _this.minus.on("click",function(){
          var amount=_this.amount.val();
          if(amount>1) {
            amount--;
          }
          if(amount<=0){
            $(this).removeClass("active");
          }
          _this.amount.val(amount);
        });

      },
      hideCartPanel:function(){
        var _this=this;
        if(!_this.isJoinCart) {
          _this.cartPanel.css("transform", "translate3d(0px,120%,0px)");
          _this.cartPanel.css("-webkit-transform", "translate3d(0px,120%,0px)");
          _this.mark.css({"z-index": "-1", "opacity": 0});
          _this.luckpage.css({"overflow-y": "auto", "height": "auto"});
          _this.setScrollTop();
        }

      },
      setScrollTop:function(){
        var _this=this;
        setTimeout(function(){
          $(window).scrollTop(_this.curWinTop);
        },30);
      },
      //添加购物车
      addCart:function(){
        var _this=this;
        _this.isJoinCart=true;
        var imgUrl=_this.goodsImage.attr("src");
        var strImg='<img id="clone-image" class="clone-image" src="'+imgUrl+'" />';
        _this.goodsImageWrap.append(strImg);
        var cloneImg=$("#clone-image");
        var cartIcon=$("#cart-icon");
        var cloneImgX=parseInt(cloneImg.offset().left);
        var cloneImgY=parseInt(cloneImg.offset().top);
        var cartIconX=parseInt(cartIcon.offset().left);
        var cartIconY=parseInt(cartIcon.offset().top);
        var winHeight=parseInt($(window).height()-(_this.cartPanel.height()));

        TweenMax.to(cloneImg,2,{bezier:[{x:cloneImgX, y:-100},{x:cloneImgX+10,y:-110},{x:cartIconX, y:-winHeight}],onComplete:function(){
          cloneImg.remove();
          _this.isJoinCart=false;

          //商品属性拼接
          let aAttrs=[],aParam=[];
          for(let i=0;i<_this.attrs.length;i++){
            aParam=[];
            for(let j=0;j<_this.attrs[i].values.length;j++){
              if(_this.attrs[i].values[j].checked) {
                aParam.unshift({"paramid": _this.attrs[i].values[j].vid, "title": _this.attrs[i].values[j].value});
              }
            }
            aAttrs.push({"attrid":_this.attrs[i].attrid,"title":_this.attrs[i].title,"param":aParam});
          }

          _this.$store.commit("addCartData",{gid:_this.aid,title:_this.sGoodsName,amount:_this.amount.val(),price:_this.iPrice,img:_this.aSlide[0],checked:true,freight:_this.iFreight,attrs:aAttrs,cartId:_this.globalFunc.uuid(6,6)});

          $("#spot").css("display","block");
        }});
        TweenMax.to(cloneImg,0.2,{rotation:360,repeat:-1,ease:Linear.easeNone});

      },
      //选择商品参数
      getParam(attrId,paramId){
        for(let i=0;i<this.attrs.length;i++){
          if(this.attrs[i].attrid==attrId) {
            for (let j = 0; j < this.attrs[i].values.length; j++) {
              this.attrs[i].values[j].checked = false;
            }
          }
        }
        level1:
        for(let i=0;i<this.attrs.length;i++){
          for(let j=0;j<this.attrs[i].values.length;j++){
            if(this.attrs[i].values[j].vid==paramId){
              this.attrs[i].values[j].checked=true;
              break level1;
            }
          }
        }
      },
      getDetails(){
        let sUrl=this.config.domain+"/api/home/goods/info/gid/"+this.aid+"/type/details?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.sGoodsName=ret.data.data.title;
            this.iPrice=ret.data.data.price;
            this.iSales=ret.data.data.sales;
            this.iFreight=ret.data.data.freight;
            this.aSlide=ret.data.data.images;
            this.$nextTick(()=>{
              this.swiper();
            });
            this.wxShare();
          }
        });
      },
      getReviews(){
        let sUrl=this.config.domain+"/api/home/reviews/index/gid/"+this.aid+"?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.bListData=true;
            this.bNotData=false;
            this.reviewTotal=ret.data.pageinfo.total;
            this.aReview=ret.data.data;
          }else{
            this.bListData=false;
            this.bNotData=true;
          }
        });
      },
      getSpec(){
        let sUrl=this.config.domain+"/api/home/goods/info/gid/"+this.aid+"/type/spec?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            for(let i=0;i<ret.data.data.length;i++){
              for(let j=0;j<ret.data.data[i].values.length;j++){
                ret.data.data[i].values[j].checked=false;
              }
            }
            this.attrs=ret.data.data;
          }
        });
      },
      checkAmount(){//检测输入的数量是否规范
        if(isNaN(this.iAmount)){
          this.iAmount=this.iAmount.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[\#|\*|,|\+|;]/g,'')
        }else if(this.iAmount<=0){
          this.iAmount=1;
        }
      },
      wxShare(){
        this.myAjax("http://www.lucklnk.com/weixinapi/sign.php?url="+encodeURIComponent(window.location.href.split('#')[0]),"get",(res)=>{
          var appid=res.data.appid;
          var timestamp=res.data.timestamp;
          var noncestr=res.data.noncestr;
          var signature=res.data.signature;
          var Weixin=new WeixinClass(""+appid+"",""+timestamp+"",""+noncestr+"",""+signature+"");
          Weixin.wxReady(()=>{
            Weixin.shareAppMessage(""+this.sGoodsName+"",""+this.sGoodsName+"",""+window.location.href+"",""+this.aSlide[0]+"","link",'',()=>{
              //获取url里面的uid参数
              let get=this.globalFunc.localParam();
              //如果有#号就用get.hash.uid获取，如果没有用get.search.uid获取
              let uid=get.hash.uid;
              this.myAjax(this.config.domain+"/api/user/share/addpoints?token="+this.config.token,"post",(res)=>{
                if(res.data.code==200){
                  toast(res.data.data);
                }else{
                  toast(res.data.data);
                }
              },{"uid":uid})
            });
          });
        });
      }
    },
    created(){
      //获取当前的url去除已有的uid参数，并添加新的uid参数
      this.pUrl=this.globalFunc.expUrlParam(window.location.href,"uid");
      //让url里自动加上uid这个参数
      window.history.replaceState({},null,this.pUrl+"&uid="+this.$store.state.uid);
    },
    mounted:function(){
      this.luckpage=$(".luck-page");
      this.fav=$("#fav");
      this.joinCart=$("#join-cart");
      this.cartPanel=$("#cart-panel");
      this.mark=$("#mark");
      this.x=$("#x");
      this.sureBtn=$("#sureBtn");
      this.amount=$("#amount");
      this.price=$("#price");
      this.minus=$("#minus");
      this.plus=$("#plus");
      this.goodsImage=$("#goods-image");
      this.goodsImageWrap=$("#goods-image-wrap");
      this.spot=$("#spot");
      this.isJoinCart=false;
      this.curWinTop=0;
      this.navList=$(".nav-list");
      this.bindEvent();
      this.getDetails();
      this.getReviews();
      this.getSpec();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/home/goods/info.css";
  @import "../../../assets/css/common/swiper.css";
</style>
<style>
  .clone-image{position:absolute;z-index:90;width:1rem;height:1rem;left:0px;top:0px;}
</style>
