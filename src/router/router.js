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
    meta: { title: '首页' ,keepAlive:false},
    children:[
      {
        path:"index",
        component:INDEX,
        meta: { title: '首页' ,keepAlive:true}
      },
      {
        path:"cart",
        component:CARTINDEX,
        meta: { title: '购物车' ,keepAlive:false}
      },
      {
        path:"user",
        component:USERINDEX,
        meta: { title: '会员中心' ,keepAlive:false}
      }
    ]
  },
  {
    path: PATH+'goods/index',
    component: GOODSINDEX,
    meta: { title: '商品搜索' ,keepAlive:false},
  },
  {
    path: PATH+'goods/info',
    component: GOODSINFO,
    meta: { title: '商品详情' ,keepAlive:false},
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
    meta: { title: '分类' ,keepAlive:true}
  },
  {
    path:PATH+'login/index',
    component: LOGININDEX,
    meta: { title: '会员登录',keepAlive:true }
  },
  {
    path:PATH+'reg/index',
    component: REGINDEX,
    meta: { title: '会员注册' ,keepAlive:true}
  },
  {
    path:PATH+'order/index',
    component: ORDERINDEX,
    meta: { title: '确认订单' ,auth:true}
  },
  {
    path:PATH+'order/end',
    component: ORDEREND,
    meta: { title: '订单结束',auth:true}
  },
  {
    path:PATH+'address/index',
    component: ADDRESSINDEX,
    meta: { title: '选择收货地址' ,auth:true}
  },
  {
    path:PATH+'address/add',
    component: ADDRESSADD,
    meta: { title: '新增收货地址' ,auth:true}
  },
  {
    path:PATH+'address/edit',
    component: ADDRESSEDIT,
    meta: { title: '修改收货地址' ,auth:true}
  },
  {
    path:PATH+'user/order/index',
    component: USERORDERINDEX,
    meta: { title: '全部订单' ,auth:true},
    redirect:PATH+"user/order/index/all",
    children:[
      {
        path:'all',
        component:USERORDERALL,
        meta:{title:'全部订单'}
      },
      {
        path:'review',
        component:USERORDERREVIEW,
        meta:{title:'待评价'}
      }
    ]
  },
  {
    path:PATH+'user/order/add_review',
    component: USERADDREVIEW,
    meta: { title: '评价',auth:true}
  },
  {
    path:PATH+'user/order/details',
    component: USERORDERDETAILS,
    meta: { title: '订单详情',auth:true}
  },
  {
    path:PATH+'user/profile',
    component: USERPROFILE,
    meta: { title: '个人资料',auth:true }
  },
  {
    path:PATH+'user/address',
    component: USERADDRESS,
    meta: { title: '收货地址管理',auth:true }
  },
  {
    path:PATH+'user/address/add',
    component: ADDUSERADDRESS,
    meta: { title: '新增收货地址',auth:true }
  },
  {
    path:PATH+'user/address/edit',
    component: EDITUSERADDRESS,
    meta: { title: '编辑收货地址' }
  },
  {
    path:PATH+'user/mobile',
    component: USERMOBILE,
    meta: { title: '绑定手机' ,auth:true}
  },
  {
    path:PATH+'user/modpwd',
    component: USERPASSWORD,
    meta: { title: '修改密码' ,auth:true}
  },
  {
    path:PATH+'user/fav',
    component: USERFAV,
    meta: { title: '我的收藏' ,auth:true}
  }
]
