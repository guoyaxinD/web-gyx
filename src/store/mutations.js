export default {
  addCartData(state,data) {//添加购物车
    state.cartData=localStorage.cart!=undefined?JSON.parse(localStorage.cart):[];
    state.priceTotal=parseFloat(localStorage.priceTotal).toFixed(2);
    state.freightTotal=parseFloat(localStorage.freightTotal).toFixed(2);
    if(data.gid!='' && data.gid>0) {
      let existGid=false,priceTotal=0,freightTotal=0,aFreight=[];
      for(let i=0;i<state.cartData.length;i++) {
        //如果购物车商品有重复修改数量和价格
        //获取属性转义成字符类型好做匹配
        if (data.gid == state.cartData[i].gid && JSON.stringify(data.attrs)==JSON.stringify(state.cartData[i].attrs)) {
          state.cartData[i].amount=parseInt(state.cartData[i].amount)+parseInt(data.amount);
          state.cartData[i].attrs=data.attrs;
          existGid=true;
          break;
        }
      }
      //增加购物车商品
      if(existGid==false){
        state.cartData.push(data);
      }
      //计算总价
      for(let i=0;i<state.cartData.length;i++) {
        priceTotal += (state.cartData[i].price * state.cartData[i].amount);
        aFreight.push(state.cartData[i].freight);
      }
      freightTotal=Math.max.apply(null,aFreight);
      //console.log(JSON.stringify(state.cartData))
      state.priceTotal=priceTotal.toFixed(2);
      state.freightTotal=freightTotal.toFixed(2)
      localStorage.cart=JSON.stringify(state.cartData);
      localStorage.priceTotal=priceTotal.toFixed(2);
      localStorage.freightTotal=freightTotal.toFixed(2);
    }
  },
  checkedCartData(state,data){//修改价格
    let priceTotal=0;
    for(let i=0;i<state.cartData.length;i++){
      if(data.cartId==state.cartData[i].cartId){
        state.cartData[i].checked=data.checked;
        break;
      }
    }
    for(let i=0;i<state.cartData.length;i++){
      if(state.cartData[i].checked==true) {
        priceTotal += (state.cartData[i].price * state.cartData[i].amount);
      }
    }
    state.priceTotal=priceTotal.toFixed(2);
    localStorage.cart=JSON.stringify(state.cartData);
    localStorage.priceTotal=priceTotal.toFixed(2);
  },
  allCheckedCartData(state,data){//点击全选按钮
    let priceTotal=0,freightTotal=0,aFreight=[];
    if(data){
      for(let i=0;i<state.cartData.length;i++){
          state.cartData[i].checked=true;
        priceTotal += (state.cartData[i].price * state.cartData[i].amount);
        aFreight.push(state.cartData[i].freight);
      }
      freightTotal=Math.max.apply(null,aFreight);
    }else{
      for(let i=0;i<state.cartData.length;i++){
        state.cartData[i].checked=false;
        priceTotal = 0;
        freightTotal=0;
      }
    }
    state.priceTotal=priceTotal.toFixed(2);
    state.freightTotal=freightTotal.toFixed(2);
    localStorage.cart=JSON.stringify(state.cartData);
    localStorage.priceTotal=priceTotal.toFixed(2);
    localStorage.freightTotal=freightTotal.toFixed(2);
  },
  changeAmount(state,data){//更改数量
    var priceTotal=0;
    if(data) {
      for (let i = 0; i < state.cartData.length; i++) {
        if (state.cartData[i].cartId == data.cartId) {
          state.cartData[i].amount = data.amount;
          break;
        }
      }
    }
    for(let i=0;i<state.cartData.length;i++) {
        if (state.cartData[i].checked){
          priceTotal += (state.cartData[i].price * state.cartData[i].amount);
        }
    }
    state.priceTotal=priceTotal.toFixed(2);
    localStorage.priceTotal=priceTotal.toFixed(2);
    localStorage.cart=JSON.stringify(state.cartData);
  },
  delCart(state,data){//删除购物车里的宝贝
    var priceTotal=0,freightTotal=0,aFreight=[];
    state.cartData.splice(data.index,1);
    for(let i=0;i<state.cartData.length;i++) {
      if(state.cartData[i].checked) {
        priceTotal += (state.cartData[i].price * state.cartData[i].amount);
        aFreight.push(state.cartData[i].freight);
      }
    }
    freightTotal=Math.max.apply(null,aFreight);
    state.priceTotal=priceTotal.toFixed(2);
    state.freightTotal=freightTotal.toFixed(2);
    localStorage.priceTotal=priceTotal.toFixed(2);
    localStorage.cart=JSON.stringify(state.cartData);
    localStorage.freightTotal=freightTotal.toFixed(2);
  }

}
