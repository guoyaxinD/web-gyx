<!--模板-->
<template>
  <div id="user-address-add" class="luck-page">
    <div v-wechat-title="$route.meta.title"></div>
    <subHeader :navTitle="navTitle" :compid="aid" :pageFrom="'address_edit'"></subHeader>
    <div id="address-main" class="address-main">
      <form name="address-form" id="address-form" method="post" action="">
        <ul>
          <li>收货人</li>
          <li><input name="name" id="name" type="text" placeholder="收货人姓名" class="address-input" v-model="sName" /></li>
        </ul>
        <ul>
          <li>联系方式</li>
          <li><input name="cellphone" id="cellphone" type="tel" placeholder="联系人手机号" class="address-input" v-model="sCellphone" /></li>
        </ul>
        <ul>
          <li>所在地区</li>
          <li @click="showCityPicker()"><input class="address-city"  type="text" placeholder="请选择收货地区" readonly v-model="sAddressDetails" /></li>
        </ul>
        <ul>
          <li>详细地址</li>
          <li><input name="address" id="address" type="text" placeholder="街道详细地址" class="address-input" v-model="sAddress" /></li>
        </ul>
        <ul>
          <li>设置为默认地址</li>
          <li class="isDefault"><input name="isDefault" ref="isDefault" type="checkbox" :value="bDefault" :checked="bChecked" /></li>
        </ul>
        <button id="saveBtn" :disabled="bDisabled" type="button" class="saveBtn event" @click="submitData()">修改</button>
      </form>
    </div>
  </div>
</template>

<!--行为-->
<script>
  import Vue from 'vue'
  import subHeader from '../../common/page/sub-header'
  import toast from '../../common/libs/toast/toast.js';
  import {CascadePicker} from 'cube-ui'
  import { provinceList, cityList, areaList } from '../../../../cube-data/example/data/area'
  Vue.use(CascadePicker)

  const cityData = provinceList
    cityData.forEach(province => {
      province.children = cityList[province.value]
      province.children.forEach(city => {
        city.children = areaList[city.value]
      })
    })

  export default {
    name: 'user-address-add',
    data:function(){
      return {
        navTitle:"编辑收货地址",
        sAddress:'',
        sArea:'',
        sProvince:'',
        sCity:'',
        sName:'',
        sCellphone:'',
        sAddressDetails:'',
        bDefault:'1',
        bDisabled:false,
        bChecked:false,
        aid:this.$route.query.id
      }
    },
    components:{
      subHeader
    },
    methods:{
      showCityPicker() {
        this.cityPicker.show()
      },
      getData(){
        let sUrl=this.config.domain+"/api/user/address/info/uid/"+this.$store.state.uid+"/aid/"+this.aid+"?token="+this.config.token;
        this.myAjax(sUrl,"get",ret=>{
          if(ret.data.code==200){
            this.sName=ret.data.data.name;
            this.sCellphone=ret.data.data.cellphone;
            this.sProvince=ret.data.data.province;
            this.sCity=ret.data.data.city;
            this.sArea=ret.data.data.area;
            this.sAddressDetails=this.sProvince+" "+this.sCity+" "+this.sArea;
            this.sAddress=ret.data.data.address;
            if(ret.data.data.isdefault=='1'){
              this.bChecked=true;
            }else{
              this.bChecked=false;
            }
          }
        });
      },
      submitData(){
        if(this.sName.match(/^\s*$/)){
          toast('请输入收货人姓名');
          return false;
        }
        if(this.sCellphone.match(/^\s*$/)){
          toast('请输入联系人手机号');
          return false;
        }
        if(!this.sCellphone.match(/^1[0-9][0-9]{9}$/)){
          toast("您输入手机号格式不正确");
          return false;
        }
        if(this.sArea.match(/^\s*$/)){
          toast('请选择所在地区');
          return false;
        }
        if(this.sAddress.match(/^\s*$/)){
          toast('请输入详细地址');
          return false;
        }
        this.bDisabled=false;
        if(this.$refs['isDefault'].checked){
          this.bDefault='1';
        }else{
          this.bDefault='0';
        }

        let sUrl=this.config.domain+"/api/user/address/mod?token="+this.config.token;
        let jParamData={"aid":this.aid,"uid":this.$store.state.uid,"name":this.sName,"cellphone":this.sCellphone,"province":this.sProvince,"city":this.sCity,"address":this.sAddress,"isdefault":this.bDefault,'area':this.sArea};
        this.myAjax(sUrl,"post",(ret)=>{
          if(ret.data.code==200){
            this.bDisabled=true;
            toast('修改成功！');
            this.sName='';
            this.sCellphone='';
            this.sArea='';
            this.sAddress='';
            this.sProvince='';
            this.sAresDetails='';
            this.bChecked=false;
            this.$router.go(-1);
          }else{
            toast(ret.data.data);
          }
        },jParamData);
      }
    },
    created(){
      this.globalFunc.checkUserLogin(this);
      this.getData();
    },
    mounted(){
      this.cityPicker = this.$createCascadePicker({
        title: '所在地区',
        data: cityData,
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          this.sAresDetails=selectedText.join(' ');
          this.sProvince=selectedText[0];
          this.sCity=selectedText[1];
          this.sArea=selectedText[2];
        },
        onCancel: () => {

        }
      })
    }
  }
</script>

<!--样式-->
<style scoped>
  @import "../../../assets/css/user/address/add.css";
</style>
