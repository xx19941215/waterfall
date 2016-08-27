/**
 * Created by xiaoxiao on 2016/8/27.
 */
var waterfall = (function ($) {
  var colHeightArray = [],
    timer = null,
    data = [],
    bottomHandler = null,
    $ct = $(".waterfall"),
     ctWidth = $ct.width(),
    options = {},
    itemWidth = 0;
  function init(opts) {
    if(opts){
      //如果设置选项
      options = opts;
      options.waterfallBg && $ct.css("background",options.waterfallBg);
      //计算每个col的宽度
      if(options.colNum && options.margin){
        itemWidth = Math.floor((ctWidth - (options.colNum - 1) * options.margin)/options.colNum);
      } 
      options.margin = opts.margin;
      
    }
    //绑定事件
    bind();
    //初次加载
    if(scrollBottom($ct)){
      console.log("bottom");
      bottomHandler && bottomHandler();
    }
  }

  function render(d) {
    //处理数据
    //console.log(d);
    if(d){
      d.forEach(function(item,index){
        if(!item.image_url){
          item.image_url = "images/1.jpg";
        }
      });
      data = d;
      domComplete();
    }else {
      alert("load error data");
    }

  }
  function domComplete(){
    //根据options添加DOM节点
    initalDom();
    var def = [];
    var $itemList = $ct.find(".new");
    $itemList.each(function () {
      var deferred = $.Deferred();//定义一个Deferred对象
      $(this).find("img").on("load", function () {
        deferred.resolve();
      })
      def.push(deferred);
    })
    $.when.apply(null, def).done(function(){
      layout();
      $ct.find(".new").each(function(){
        $(this).attr("class","item");
      });
    }).done(function(){
      //如果内容仍然不够
      if(scrollBottom($ct)){
        console.log("内容仍然不够");
        bottomHandler && bottomHandler();
      }
    }).fail(function(){
      console.log("失败");
    })
  }
  function layout(){

    var $itemList = $ct.find(".item"),
    colNum = options.colNum,
    margin = options.margin;    
    console.log(colNum);
    //修改绝对定位坐标重新排列
    $itemList.each(function (index, ele) {
      var itemHeight = $(ele).outerHeight(true) + margin;
      
      //第一排的情况
      if (index < colNum) {

        $(ele).css({
          "left": index * (itemWidth+margin) +"px",
          "top": 0,
          "opacity": 1
        })
        colHeightArray[index] = itemHeight;
      } else {
        var minCol = getMinVal(colHeightArray);
        $(ele).css({
          "left": minCol * (itemWidth+margin) +"px",
          "top": colHeightArray[minCol] + "px",
          "opacity": 1
        });
        colHeightArray[minCol] += itemHeight;
      }
      
    })
    //设置容器高度
    $ct.css("height",Math.max.apply(Math,colHeightArray)+"px");
  }

  function bind() {
    $(window).on("scroll",function(){
      if(timer) clearTimeout(timer);
      timer = setTimeout(function(){
        if(scrollBottom()){
          console.log("bottom");
          bottomHandler && bottomHandler();
        }
      },100)
    })

    $(window).on("resize",function(){
      console.log("resize");
      if(scrollBottom()){
        console.log("bottom");
        bottomHandler && bottomHandler();
      }
      //清空col数组重新计算
      colHeightArray = [];
      layout();
    })
  }
  function scrollBottom(){
    var ctHeight = $ct.height() - 30;
    if(ctHeight < $(window).scrollTop() + $(window).height()){
      return true;
    }
    return false;
  }
  function getMinVal(arr) {
    var min = arr[0], index = 0;
    arr.forEach(function (item, indx) {
      if (item < min) {
        min = item;
        index = indx
      }
    })
    return index;
  }
  function toBottom(handler){
    bottomHandler = handler;
  }

  function initalDom() {
    var html = "";

    data.forEach(function (item, index) {
      html += '<div class="item new" style="width:'+itemWidth+'px;background:'+options.itemBg+'"><a href="' + item.url + '"><img src="' + item.image_url + '" alt=""></a><p>' + item.title + '</p></div>'
    });

    $ct.append($(html));
  }
  return {
    init: init,
    render: render,
    toBottom:toBottom
  }
})($);
$.extend({
  waterfall:waterfall
});