+function($){'use strict';
    var UpRefresh=function(opts,callback){
        if(opts instanceof Object) {
            this.opts = opts;
            this.iMaxPage=this.opts.maxPage;
            this.oWin=$(window);
            this.fnCallback=callback;
            this.iOffsetBottom=this.opts.offsetBottom;
            this.iCurPage=this.opts.curPage;
            this.init();
        }
    };
    UpRefresh.prototype={
        init:function(){
            var _this=this;
            _this.eventScroll();
        },
        eventScroll:function(){
            var _this=this;
            _this.oWin.on("scroll",_this.scrollBottom());
        },
        scrollBottom:function(){
            var _this=this;
            var bScroll=true;
            return function(){
                if(!bScroll){
                    return;
                }
                bScroll=false;
                setTimeout(function(){
                    var iScrollHeight=$(document).innerHeight();//等于offsetHeight
                    var iScrollTop=_this.oWin.scrollTop();
                    var iWinHeight=_this.oWin.height();
                    if(iScrollHeight-(iWinHeight+iScrollTop)<=_this.iOffsetBottom){
                        if(_this.iCurPage<_this.iMaxPage) {
                            //console.log("scrollHeight:"+iScrollHeight+",winHeight:"+(parseInt(iScrollTop)+parseInt(iWinHeight)));
                            _this.iCurPage++;
                            //console.log(_this.iCurPage);
                            _this.fnCallback(_this.iCurPage);
                        }
                    }
                    bScroll=true;
                },600);
            }
        }
    };
    $.fn.uprefresh=function(opts,callback){
        return new UpRefresh(opts,callback);
    }
}(window.jQuery);
