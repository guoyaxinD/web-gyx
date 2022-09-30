<!--模板-->
<template>
      <div id="sub-header" class="sub-header">
        <div class="sub-back external" @click="back()"></div>
        <div :class="{'nav-wrap':true,'half':half}">{{navTitle}}</div>
        <div id="right-btn" class="save" v-show="bSave">{{rightText}}</div>
      </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import {Dialog} from 'cube-ui'
  Vue.use(Dialog)
  export default {
    name: 'sub-header',
    data:function(){
      return {
        bSave:false,
        half:false,
        page:this.$route.query.page,
        rightText:''
      }
    },
    props:{
      navTitle:{
        type:String,
        required:true
      },
      compid:{
        type:String,
        required:false
      },
      pageFrom:{
        type:String,
        required:false
      }
    },
    components:{

    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      delAddress(callback){
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
            callback()
          },
          onCancel: () => {

          }
        }).show()
      }
    },
    created(){

    },
    mounted(){
        this.rightBtn=$("#right-btn");
      if(this.pageFrom=='profile'){
        this.bSave=true
        this.half=true
        this.rightText="保存"
      }else if(this.pageFrom=='address_edit'){
        this.bSave=true
        this.half=true
        this.rightText="删除"
        this.rightBtn.on("click",()=>{
            this.delAddress(()=>{
              let sUrl=this.config.domain+"/api/user/address/del/uid/"+this.$store.state.uid+"/aid/"+this.compid+"?token=1ec949a15fb709370f";
              this.myAjax(sUrl,"get",(ret)=>{
                if(ret.data.code==200){
                  this.$router.go(-1);
                }
              });
            })
        })
      }
    }
  }
</script>

<!--样式-->
<style scoped>
</style>
