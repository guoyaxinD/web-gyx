import config from '../assets/js/common/conf/config'
const MAINCOMPONENT = r => require.ensure([], () => r(require('../components/home/index/main')), 'maincomponent')
const INDEX = r => require.ensure([], () => r(require('../components/home/index/index')), 'index')
const GOODSCLASSIFY = r => require.ensure([], () => r(require('../components/home/goods/classify')), 'goodsclassify')

const GOODSINDEX = r => require.ensure([], () => r(require('../components/home/goods/index')), 'goodsindex')

const GOODSINFO = r => require.ensure([], () => r(require('../components/home/goods/info')), 'goodsinfo')

const INFOCONTENT = r => require.ensure([], () => r(require('../components/home/goods/info_content')), 'info_content')

const INFODESC = r => require.ensure([], () => r(require('../components/home/goods/info_desc')), 'info_desc')

const INFOCOMMENT = r => require.ensure([], () => r(require('../components/home/goods/info_comment')), 'info_comment')

const CARTINDEX = r => require.ensure([], () => r(require('../components/home/cart/index')), 'cartindex')

const LOGININDEX = r => require.ensure([], () => r(require('../components/home/login/index')), 'loginindex')

const REGINDEX = r => require.ensure([], () => r(require('../components/home/reg/index')), 'regindex')

const ORDERINDEX = r => require.ensure([], () => r(require('../components/home/order/index')), 'orderindex')

const ADDRESSINDEX = r => require.ensure([], () => r(require('../components/home/address/index')), 'addressindex')

const ADDRESSADD = r => require.ensure([], () => r(require('../components/home/address/add')), 'addressadd')

const ADDRESSEDIT = r => require.ensure([], () => r(require('../components/home/address/edit')), 'addressedit')

const ORDEREND = r => require.ensure([], () => r(require('../components/home/order/end')), 'orderend')

const USERINDEX = r => require.ensure([], () => r(require('../components/user/index/index')), 'userindex')

const USERORDERINDEX = r => require.ensure([], () => r(require('../components/user/order/index')), 'userorderindex')

const USERORDERALL = r => require.ensure([], () => r(require('../components/user/order/all')), 'userorderall')

const USERORDERREVIEW = r => require.ensure([], () => r(require('../components/user/order/review')), 'userorderreview')

const USERORDERDETAILS = r => require.ensure([], () => r(require('../components/user/order/details')), 'userorderdetails')

const USERPROFILE = r => require.ensure([], () => r(require('../components/user/profile/index')), 'userprofile')

const USERADDRESS = r => require.ensure([], () => r(require('../components/user/address/index')), 'useraddress')

const ADDUSERADDRESS = r => require.ensure([], () => r(require('../components/user/address/add')), 'adduseraddress')

const EDITUSERADDRESS = r => require.ensure([], () => r(require('../components/user/address/edit')), 'edituseraddress')

const USERMOBILE = r => require.ensure([], () => r(require('../components/user/mobile/index')), 'usermobile')

const USERPASSWORD = r => require.ensure([], () => r(require('../components/user/modpwd/index')), 'userpassword')

const USERFAV = r => require.ensure([], () => r(require('../components/user/fav/index')), 'userfav')

const USERADDREVIEW = r => require.ensure([], () => r(require('../components/user/order/add_review')), 'useraddreview')
const PATH=config.path;
export default [
  {
    path:PATH,
    component:MAINCOMPONENT,
    redirect:PATH+"home/index"
  },
  {
    path: PATH+"home",
    component: MAINCOMPONENT,
    redirect:PATH+"home/index",
    meta: { title: '??????' ,keepAlive:false},
    children:[
      {
        path:"index",
        component:INDEX,
        meta: { title: '??????' ,keepAlive:true}
      },
      {
        path:"cart",
        component:CARTINDEX,
        meta: { title: '?????????' ,keepAlive:false}
      },
      {
        path:"user",
        component:USERINDEX,
        meta: { title: '????????????' ,keepAlive:false}
      }
    ]
  },
  {
    path: PATH+'goods/index',
    component: GOODSINDEX,
    meta: { title: '????????????' ,keepAlive:false},
  },
  {
    path: PATH+'goods/info',
    component: GOODSINFO,
    meta: { title: '????????????' ,keepAlive:false},
    redirect:PATH+"goods/info/info_content",
    children:[
      {
        path:'info_content',
        component:INFOCONTENT
      },
      {
        path:'info_desc',
        component:INFODESC
      },
      {
        path:'info_comment',
        component:INFOCOMMENT
      }
    ]
  },
  {
    path:PATH+'goods/classify',
    component: GOODSCLASSIFY,
    meta: { title: '??????' ,keepAlive:true}
  },
  {
    path:PATH+'login/index',
    component: LOGININDEX,
    meta: { title: '????????????',keepAlive:true }
  },
  {
    path:PATH+'reg/index',
    component: REGINDEX,
    meta: { title: '????????????' ,keepAlive:true}
  },
  {
    path:PATH+'order/index',
    component: ORDERINDEX,
    meta: { title: '????????????' ,auth:true}
  },
  {
    path:PATH+'order/end',
    component: ORDEREND,
    meta: { title: '????????????',auth:true}
  },
  {
    path:PATH+'address/index',
    component: ADDRESSINDEX,
    meta: { title: '??????????????????' ,auth:true}
  },
  {
    path:PATH+'address/add',
    component: ADDRESSADD,
    meta: { title: '??????????????????' ,auth:true}
  },
  {
    path:PATH+'address/edit',
    component: ADDRESSEDIT,
    meta: { title: '??????????????????' ,auth:true}
  },
  {
    path:PATH+'user/order/index',
    component: USERORDERINDEX,
    meta: { title: '????????????' ,auth:true},
    redirect:PATH+"user/order/index/all",
    children:[
      {
        path:'all',
        component:USERORDERALL,
        meta:{title:'????????????'}
      },
      {
        path:'review',
        component:USERORDERREVIEW,
        meta:{title:'?????????'}
      }
    ]
  },
  {
    path:PATH+'user/order/add_review',
    component: USERADDREVIEW,
    meta: { title: '??????',auth:true}
  },
  {
    path:PATH+'user/order/details',
    component: USERORDERDETAILS,
    meta: { title: '????????????',auth:true}
  },
  {
    path:PATH+'user/profile',
    component: USERPROFILE,
    meta: { title: '????????????',auth:true }
  },
  {
    path:PATH+'user/address',
    component: USERADDRESS,
    meta: { title: '??????????????????',auth:true }
  },
  {
    path:PATH+'user/address/add',
    component: ADDUSERADDRESS,
    meta: { title: '??????????????????',auth:true }
  },
  {
    path:PATH+'user/address/edit',
    component: EDITUSERADDRESS,
    meta: { title: '??????????????????' }
  },
  {
    path:PATH+'user/mobile',
    component: USERMOBILE,
    meta: { title: '????????????' ,auth:true}
  },
  {
    path:PATH+'user/modpwd',
    component: USERPASSWORD,
    meta: { title: '????????????' ,auth:true}
  },
  {
    path:PATH+'user/fav',
    component: USERFAV,
    meta: { title: '????????????' ,auth:true}
  }
]
