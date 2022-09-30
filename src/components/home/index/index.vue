<!--模板-->
<template>
  <div id="index">
    <div v-wechat-title="$route.meta.title"></div>

    <div id="luck-page" class="luck-page">
      <headerWrap :key="getKey"></headerWrap>
      <div class="slider">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in aSlide" :key="index"><a :href="item.webs" target="_blank"><img :src="item.image" border="0" :alt="item.title" /></a></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="fun-main flex-space">
        <div class="list">
          <div class="img"><router-link :to="{path:this.config.path+'goods/classify'}"><img src="../../../assets/images/home/main/funset_5.png"></router-link></div>
          <div class="text fun-text-color">分类</div>
        </div>
        <div class="list" v-for="(item,index) in aNavs" :key="index" @click="goPushPage('goods/classify',{'cid':item.cid})">
          <div class="img"><img :src="item.image"></div>
          <div class="text fun-text-color">{{item.title}}</div>
        </div>
      </div>
      <template v-for="(row,i) in aGoods">
      <div v-if="i==0 || i%2==0" class="goods" :key="i">
        <div :class="'goods-title goods-title-color'+(i+1)">—— {{row.title}} ——</div>
            <div class="goods-row-1">
              <div class="left">
                <div class="goodslist-1" @click="goPushPage('goods/info',{aid:row.items[0].gid})">
                  <div class="title goodslist1-title-color">{{row.items[0].title}}</div>
                  <div class="desc goodslist1-desc-color">精品打折</div>
                  <div :class="'price2 goodslist1-price-color'" v-if="i%2==0 && i!=0">{{row.items[0].price}}元</div>
                  <div v-else :class="'price goodslist1-price-color'">{{row.items[0].price}}元</div>
                  <div class="img"><img :data-echo="row.items[0].image" src="../../../assets/images/common/lazyImg.jpg" /></div>
                </div>
              </div>
              <div class="right">
                <div class="goodslist-2" @click="goPushPage('goods/info',{aid:row.items[1].gid})">
                  <div class="title goodslist1-title-color">{{row.items[1].title}}</div>
                  <div class="desc goodslist2-desc-color">品质精挑</div>
                  <div class="img"><img :data-echo="row.items[1].image" src="../../../assets/images/common/lazyImg.jpg" /></div>
                </div>
                <div class="goodslist-3" @click="goPushPage('goods/info',{aid:row.items[2].gid})">
                  <div class="title goodslist1-title-color">{{row.items[2].title}}</div>
                  <div class="desc goodslist2-desc-color">品质精挑4折起</div>
                  <div class="img"><img :data-echo="row.items[2].image" src="../../../assets/images/common/lazyImg.jpg" /></div>
                </div>
              </div>
            </div>
          <div class="goods-row-2 flex-space">
            <div :class="{'goodslist':true,'endgoodslist':item.endstyle}" v-for="(item,index) in row.items2" :key="index" @click="goPushPage('goods/info',{'aid':item.gid})">
              <div class="title goodslist1-title-color">{{item.title}}</div>
              <div class="img"><img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" /></div>
              <div class="price goodslist-price-color">¥{{item.price}}</div>
              <div class="unprice goodslist-unprice-color">¥{{(item.price/0.8).toFixed(2)}}</div>
            </div>
          </div>
      </div>

      <div v-else class="goods" :key="i">
        <div class="goods-title goods-title-color2">—— {{row.title}} ——</div>
        <div class="goods2-row-1">
          <div @click="goPushPage('goods/info',{'aid':item.gid})" :class="'goodslist-'+(j+1)" v-for="(item,j) in row.items.slice(0, 2)" :key="j">
            <div class="title2 goodslist1-title-color">{{item.title}}</div>
            <div class="desc2 goodslist2-desc-color">火爆开售</div>
            <div class="img"><img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg"  /></div>
          </div>
        </div>
        <div class="goods-row-2 flex-space">
          <div class="goodslist" @click="goPushPage('goods/info',{'aid':item.gid})" v-for="(item,j) in row.items.slice(2)" :key="j">
            <div class="title goodslist1-title-color">{{item.title}}</div>
            <div class="img"><img  :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" /></div>
            <div class="price goodslist-price-color">¥{{item.price}}</div>
            <div class="unprice goodslist-unprice-color">¥{{(item.price/0.8).toFixed(2)}}</div>
          </div>
        </div>
      </div>
      </template>
      <div class="recom-title flex-row-center">
        <div class="left-line"></div>
        <div class="text recom-title-color">为您推荐</div>
        <div class="left-line"></div>
      </div>
      <div class="recom-area">
        <div class="goods-list" :style="'margin-right:'+item.marginRight" v-for="(item,index) in aGoodsRecom" :key="index" @click="goPushPage('goods/info',{'aid':item.gid})">
          <div class="img"><img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" /></div>
          <div class="title recomgoods-title-color">{{item.title}}</div>
          <div class="price goodslist-price-color">¥{{item.price}}</div>
        </div>
      </div>
    </div>
    <search></search>
  </div>
</template>

<!--行为-->
<script>
  import headerWrap from '../../common/page/header'
  import search from '../../common/page/search'
  import Swiper from '../../../assets/js/common/lib/swiper.min.js'
  export default {
  name: 'index',
  data(){
    return{
bChecked:true,
      aSlide:[],
      aNavs:[],
      aGoods:[],
      aGoodsItem:[],
      aGoodsRecom:[],
      aCategory:[]
    }
  },
  components:{//局部调用组件
    headerWrap,
    search
  },
  methods:{
      swiper(){
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay:3000,
          autoplayDisableOnInteraction:false
        });
      },
      getSlide(){
        //用代理(config/index.js下面的proxyTable)的方式去调用接口
        var sUrl=this.config.domain+'/api/home/index/slide?token='+this.config.token+''
        // this.myAjax(sUrl,'get',(ret)=>{
        //   this.aSlide = ret.data.data
        //   this.$nextTick(() => {
        //     this.swiper()
        //   });
        // });
        this.request(sUrl, "get").then(res=>{
          this.aSlide = res.data.data
            this.$nextTick(() => {
            this.swiper()
          });
        })
      },
      getNav(){
        var sUrl=""+this.config.domain+"/api/home/index/nav?token="+this.config.token;
        this.myAjax(sUrl,'get',(ret)=>{
          this.aNavs=ret.data.data
        })
      },
    getGoods(){
      var sUrl=""+this.config.domain+"/api/home/index/goodsLevel?token="+this.config.token;
      this.myAjax(sUrl,'get',(ret)=>{
        if(ret.data.code==200) {
          this.aGoods = ret.data.data
          for (let i = 0; i < ret.data.data.length; i++) {
            this.aGoods[i].items2 = []
            for (let j = 3; j < ret.data.data[i].items.length; j++) {
              ret.data.data[i].items[j].endstyle = false;
              this.aGoods[i].items2.push(ret.data.data[i].items[j])
            }
          }

          for (let i = 0; i < ret.data.data.length; i++) {
            level1:
              for (let j = 3; j < ret.data.data[i].items.length; j++) {
                if (j == ret.data.data[i].items.length - 1) {
                  ret.data.data[i].items[j].endstyle = true;
                  break level1;
                }
              }
          }
          this.$nextTick(()=>{
            this.globalFunc.lazyImg();
          })
        }
      })
    },
    getRecom(){
      var sUrl=this.config.domain+"/api/home/index/recom?token="+this.config.token;
      this.myAjax(sUrl,"get",(ret)=>{
        for(let i=0;i<ret.data.data.length;i++){
          if((i+1)%2==0){
            ret.data.data[i].marginRight="0rem";
          }else{
            ret.data.data[i].marginRight="0.4rem";
          }
        }
        this.aGoodsRecom=ret.data.data;
      })
    },
    goPushPage(path,query){
      this.$router.push({path:this.config.path+path,query:query})
    },
    init(){
      this.getSlide();
      this.getNav();
      this.getGoods();
      this.getRecom();
    }
  },
  created(){
    this.init();
  },
  mounted(){

  },
  computed:{
    //解决子组件不更新数据
    getKey() {
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
    }
  },
  //当引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated,当再次进入（前进或者后退）时，只触发activated。
  activated(){
    this.init();
  },
  //退出时触发deactivated
  deactivated(){

  }
}
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/home/main/main.css';
</style>
<style>
  @import '../../../assets/css/common/swiper.css';
  .action-block .default-text{color:#F29C09;font-size:0.8rem;}
</style>
