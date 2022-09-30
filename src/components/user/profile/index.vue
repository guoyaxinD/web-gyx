<!--模板-->
<template>
  <div id="profile-index" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle=navTitle :pageFrom="'profile'"></subHeader>
    <div class="profile-main">
      <form name="form1" id="form1" method="post" action="">
        <div class="head">
          <div class="text">头像</div>
          <div class="image"><img id="head" :src="sHead" width="50" height="50" /><input name="headinput" id="headinput" :value="sHeadPath" type="hidden" /><input class="headfile" name="headfile" id="headfile" type="file"></div>
        </div>
        <div class="list">
          <div class="text">昵称</div>
          <div class="desc"><input name="nickname" id="nickname" type="text" placeholder="请设置昵称" value="" /></div>
          <div class="arrow"></div>
        </div>
        <div class="list">
          <div class="text">性别</div>
          <div @click="showDefault" id="select-gender" class="select-desc"><span>{{sGender}}</span><input name="gender" id="gender" type="hidden" :value="iGender" /></div>
          <div class="arrow"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import subHeader from '../../common/page/sub-header'
  import '../../../assets/js/common/lib/jquery.form.js';
  import toast from '../../common/libs/toast/toast.js';
  import {ActionSheet} from 'cube-ui'
  Vue.use(ActionSheet)
export default {
  name: 'profile-index',
  data:function(){
    return {
      navTitle:"个人资料",
      iGender:0,
      sGender:'请选择',
      sNickname:'',
      sHead:require("../../../assets/images/user/my/default-head.png"),
      sHeadPath:''
    }
  },
  components:{//局部调用组件
    subHeader
  },
  methods:{
    showDefault() {
      this.$createActionSheet({
        title: '选择性别',
        data: [
          {
            content: '男'
          },
          {
            content: '女'
          }
        ],
        onSelect: (item, index) => {
          this.iGender=parseInt(index)+1;
          this.sGender=item.content;
        }
      }).show()
    },
    getUserInfo(){
      let sUrl=this.config.domain+"/api/user/myinfo/userinfo/uid/"+this.$store.state.uid+"?token="+this.config.token;
      this.myAjax(sUrl,"get",ret=>{
        if(ret.data.code==200){
          $("#nickname").val(ret.data.data.nickname);
          this.iGender=ret.data.data.gender;
          if(this.iGender=='1'){
            this.sGender="男";
          }else if(this.iGender=='2') {
            this.sGender="女";
          }
          this.sHead=ret.data.data.head;
          if(this.sHead!=""){
            this.sHead=ret.data.data.head;
          }else{
            this.sHead=require("../../../assets/images/user/my/default-head.png");
          }
        }
      });
    },
    bindEvent(){
      $("#headfile").on("change",()=>{
        let url=this.config.domain+"/api/user/myinfo/uploadhead?token="+this.config.token;
        this.globalFunc.SingleUpload("headinput","headfile",url,this.config.domain+"/userfiles/head/");
      });

      $("#right-btn").on("click",()=>{

        if(/^\s*$/.test($("#nickname").val())){
          toast('请输入昵称');
          return false;
        }
        if($("#gender").val()==0){
          toast('请选择性别');
          return false;
        }
        this.saveData();
      });
    },
    saveData(){
      let sUrl=this.config.domain+'/api/user/myinfo/updateuser?token='+this.config.token;
      let paramData={"uid":this.$store.state.uid,"nickname":$("#nickname").val(),"gender":$("#gender").val(),"head":$("#headinput").val()};
      this.myAjax(sUrl,"post",(ret)=>{
        if(ret.data.code==200){
          this.$store.state.nickname=$("#nickname").val();
          toast("保存成功！");
          setTimeout(()=>{
            this.$router.go(-1);
          },2000);
        }
      },paramData);
    }
  },
  created(){
    this.globalFunc.checkUserLogin(this);
    this.getUserInfo();
  },
  mounted(){
    this.bindEvent();
  }
}
</script>

<!--样式-->
<style>
  @import '../../../assets/css/user/profile/index.css';
</style>
