$(function(){
    $.fn.stars=function(){
        var $dom=this;
        var items=$dom.find(".items");
        $dom.on("click",".items",function(){
            items.removeClass("active");
            $(this).addClass("active");
            $(this).prevAll().addClass("active");

            items.attr("data-checked",false);
            $(this).attr("data-checked",true);

        });
        return $dom;
    }
})
