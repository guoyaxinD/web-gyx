export default {
  cartData:localStorage.cart!=undefined?JSON.parse(localStorage.cart):[],
  isLogin:localStorage.isLogin!=undefined?localStorage.isLogin:false,
  uid:localStorage.uid!=undefined?localStorage.uid:'',
  nickname:localStorage.nickname!=undefined?localStorage.nickname:'',
  authToken:localStorage.authToken!=undefined?localStorage.authToken:'',
  priceTotal:localStorage.priceTotal!=undefined?localStorage.priceTotal:0,
  freightTotal:localStorage.freightTotal!=undefined?localStorage.freightTotal:0
}
