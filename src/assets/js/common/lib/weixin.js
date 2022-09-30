var WeixinClass=function(vAppId,vTimestamp,vNoncestr,vSignature){
    this.wxConfig(vAppId,vTimestamp,vNoncestr,vSignature);
};
WeixinClass.prototype={
    //监听微信加载
    wxRead:function(callback){
        document.addEventListener("WeixinJSBridgeReady",function() {
            callback();
        },false);
    },
    wxConfig:function(vAppId,vTimestamp,vNoncestr,vSignature){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: vAppId, // 必填，公众号的唯一标识
            timestamp: vTimestamp, // 必填，生成签名的时间戳
            nonceStr: vNoncestr, // 必填，生成签名的随机串
            signature: vSignature,// 必填，签名，见附录1
            jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline","hideMenuItems","showMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    },
    wxReady:function(callback){
        wx.ready(function(){
            callback();
        });
    },
    //分享到朋友圈
    shareTimeline:function(vTitle,vLink,vImgUrl,vSuccessCallback,vCancelCallback){
        wx.onMenuShareTimeline({
            title: vTitle, // 分享标题
            link: vLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vImgUrl, // 分享图标
            success: function () {
                if(vSuccessCallback) {
                    vSuccessCallback();
                }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                if(vCancelCallback) {
                    vCancelCallback();
                }
            }
        });
    },
    //分享给朋友
    shareAppMessage:function (vTitle,vDesc,vLink,vImgUrl,vType,vDataUrl,vSuccessCallback,vCancelCallback){
        wx.onMenuShareAppMessage({
            title: vTitle, // 分享标题
            desc: vDesc, // 分享描述
            link: vLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vImgUrl, // 分享图标
            type: vType, // 分享类型,music、video或link，不填默认为link
            dataUrl: vDataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                vSuccessCallback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                vCancelCallback();
            }
        });
    },
    //微信支付
    weixinPay:function (pAppid,pTimeStamp,pNonceStr,pPackage,pSign,pSkipurl){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":pAppid,     //公众号名称，由商户传入
                "timeStamp":pTimeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":pNonceStr, //随机串
                "package":pPackage,
                "signType":"MD5",         //微信签名方式：
                "paySign":pSign //微信签名
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    window.location.href=pSkipurl;
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    },
    //批量隐藏功能按钮接口
    hideMenuItems:function(pArr){
        wx.hideMenuItems({
            menuList: pArr,
            success:function(ret){

            },
            fail:function(ret){
            }
        });
    },
    //批量显示功能按钮接口
    showMenuItems:function(pArr){
        wx.showMenuItems({
            menuList: pArr
        });
    }
};

//这个判断支持模块化比如react和vue
if ( typeof module != 'undefined' && module.exports ) {
    module.exports = WeixinClass;
} else if ( typeof define == 'function' && define.amd ) {
    define( function () { return WeixinClass; } );
} else if(typeof window != "undefined") {
    window.WeixinClass = WeixinClass;
}
