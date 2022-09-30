// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'url-search-params-polyfill';
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import routes from './router/router.js'
import state from './store/state.js'
import mutations from './store/mutations.js'
import actions from './store/actions.js'
import getters from './store/getters.js'
import './assets/js/common/lib/jquery.js'
import config from './assets/js/common/conf/config'
import {myAjax,request} from './assets/js/common/function/myajax'
import globalFunc from './assets/js/common/function/function.js'
import './assets/css/common/api.css';
import './assets/css/common/public.css';
import './assets/css/common/font.css';
//import Cube from 'cube-ui'
//Vue.use(Cube)
Vue.use(require('vue-wechat-title'));
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.globalFunc=globalFunc
Vue.prototype.config=config
Vue.prototype.myAjax=myAjax
Vue.prototype.request=request

let store=new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

//配置路由
let router=new VueRouter({
  routes,
  mode:"history",//去掉地址上面的#号,
  //记录滚动的位置解决白屏问题，必须配合keep-alive
  scrollBehavior (to, from, savedPosition){
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }

  }
});
//用户是否登录跳转页面
router.beforeEach(function (to, from, next) {
    if(to.matched.some(m=>m.meta.auth)){
      if(Boolean(store.state.isLogin)==true){//已登录
        next();
      }else{//未登录
        next({path:config.path+"login/index"});
      }
    }else{
      next()
    }
});

new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
});

