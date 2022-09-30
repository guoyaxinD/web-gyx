<!--模板-->
<template>
  <div id="search-area" class="search-area">
    <div class="search-menu">
      <div id="close" @click="close()" class="left"></div>
      <div class="center">
        <div class="search-input">
          <form id="search-from" name="search-form" method="get" :action="this.config.path+'goods/index'">
            <div class="search-input-left"><input name="kwords" id="kwords" type="search" placeholder="请输入宝贝名称" value="" v-model="sKeyword" /></div>
            <button id="search-btn" type="button" @click.self="goPath()" ></button>
          </form>
        </div>
      </div>
    </div>
    <div id="search-tags" class="search-tags">
      <div class="history-search" ref="historySearch">
        <div v-show="bShow" class="hsearch-title">
          <div class="text">最近搜索</div>
          <div id="bin" class="icon" @click="delBin()"></div>
        </div>
        <div class="hsearch-content">
          <div class="items" v-for="item in aKwords" @click="goPushPage('goods/index',{'kwords':item.title})">{{item.title}}</div>
        </div>
      </div>
      <div class="history-search">
        <div class="hsearch-title">
          <div class="text">热门搜索</div>
        </div>
        <div class="hsearch-content">
          <div class="items" v-for="item in aHotwords" @click="goPushPage('goods/index',{'kwords':item.title})">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import {Dialog} from 'cube-ui'
  Vue.use(Dialog)

  export default {
    name: 'search-area',
    data:function(){
      return {
        sKeyword:'',
        bShow:false,
        aKwords:[],
        aHotwords:[]
      }
    },
    components:{//局部调用组件
    },
    methods:{
      close(){
        document.getElementById("luck-page").style.display="block";
        document.getElementById("search-area").style.display="none";
      },
      delBin() {
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
            this.$refs.historySearch.remove();
            localStorage.removeItem("kwords");
          },
          onCancel: () => {

          }
        }).show()
      },
      goPushPage(path,query){
        this.$router.push({path:this.config.path+path,query:query})
      },
      goPath(){
        this.$router.push({path:this.config.path+'goods/index',query:{"kwords":this.sKeyword}})
      },
      showHistory(){
        if(localStorage.kwords!='' && localStorage.kwords && localStorage.kwords!=undefined) {
            let kwordsArr = JSON.parse(localStorage.kwords);
            if (kwordsArr.length > 0) {
              this.aKwords=kwordsArr;
              this.bShow=true;
            }else{
              this.bShow=false;
            }
          }
      },
      showHotwords(){
        let sUrl=this.config.domain+"/api/home/public/hotwords?token="+this.config.token;
        this.myAjax(sUrl,"get",(ret)=>{
          if(ret.data.code==200){
            this.aHotwords=ret.data.data;
          }
        });
      }
    },
    mounted(){
      this.showHistory();
      this.showHotwords();
    }
  }
</script>

<!--样式-->
<style scoped>
  @import '../../../assets/css/common/searchinput.css';
</style>
