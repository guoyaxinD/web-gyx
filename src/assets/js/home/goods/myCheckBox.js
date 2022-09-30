+function($){
    var mycheckbox=function(opts,$dom){
        this.opts = $.extend({},mycheckbox.DEFAULTS, opts);
        this.paramVals='';
        this.strparamVales='';
        this.strparamarr=[];
        this.paramdian='';
        this.nextParamItems;
        this.$dom=$dom;
        this.paramItemsNum=this.opts.paramItemsNum;
        this.hiddenItemsNum=this.opts.hiddenItemsNum;
        this.show();
        this.bindEvent();
    };
    mycheckbox.DEFAULTS={
        paramItemsNum:3,
        hiddenItemsNum:3
    };
    mycheckbox.prototype={
        show:function(){
            var _this=this;
            var paramRows=_this.$dom.find(".items");
            if(paramRows.length>_this.paramItemsNum){
                _this.nextParamItems=paramRows.eq(_this.paramItemsNum-1).nextAll();
                _this.nextParamItems.hide();
            }
        },
        bindEvent:function(){
            var _this=this;

            _this.$dom.on("click",".rows-content .items",function(e){
                _this.paramVals='';
                $(this).toggleClass("active");
                if($(this).attr("data-checked")=='0') {
                    $(this).attr("data-checked","1");
                    _this.strparamarr.unshift($(this).attr("data-title"));
                    if(_this.strparamarr.length<=3){
                        var paramlength=_this.strparamarr.length;
                        _this.paramdian="";
                    }else{
                        var paramlength=3;
                        _this.paramdian="...";
                    }
                    for(var i=0;i<paramlength;i++){
                        _this.paramVals+=_this.strparamarr[i]+",";
                    }
                    _this.strparamVales = _this.paramVals.substring(0,_this.paramVals.length-1);
                    $(this).parent().prev().html(_this.strparamVales+_this.paramdian);
                }else if($(this).attr("data-checked")=='1'){
                    $(this).attr("data-checked","0");
                    var strparamLength=_this.strparamarr.length;
                    for(var i=0;i<strparamLength;i++){
                        if(_this.strparamarr[i]==$(this).attr("data-title")){
                            _this.strparamarr.splice(i,1);
                            break;
                        }
                    }
                    if(_this.strparamarr.length<=3){
                        var paramlength=_this.strparamarr.length;
                        _this.paramdian="";
                    }else{
                        var paramlength=3;
                        _this.paramdian="...";
                    }
                    for(var i=0;i<paramlength;i++){
                        _this.paramVals+=_this.strparamarr[i]+",";
                    }
                    _this.strparamVales = _this.paramVals.substring(0,_this.paramVals.length-1);
                    $(this).parent().prev().html(_this.strparamVales+_this.paramdian);

                }
            });

            _this.$dom.on("click",function(e){
                if(e.target.className.indexOf('touchTarget')>0) {
                  if (_this.nextParamItems!=undefined) {
                    if (_this.nextParamItems.is(':visible')) {
                      _this.nextParamItems.hide();
                    } else {
                      $(this).parent().find(".param-rows").each(function (i) {
                        if ($(this).find(".items").length > _this.hiddenItemsNum) {
                          $(this).find(".items").eq(_this.hiddenItemsNum - 1).nextAll().hide();
                        }
                      });
                      _this.nextParamItems.show();
                    }
                    if ($(this).find(".arrow").hasClass("active")) {
                      $(this).children(".arrow").removeClass("active");
                    } else {
                      $("#param-area").find(".arrow").removeClass("active");
                      $(this).children(".arrow").addClass("active");
                    }
                  }
                }

            });

        }
    };
    $.fn.mycheckbox=function(option){
      return new mycheckbox(option,$(this));
        // return this.each(function() {
        //   var $this = $(this);
        //   var data = $this.data('y.mycheckbox');
        //   if (data == null || data == undefined) {
        //     $this.data('y.mycheckbox', ( data = new mycheckbox(option,$this)));
        //   }
		 //    });
    }
}(window.jQuery);
