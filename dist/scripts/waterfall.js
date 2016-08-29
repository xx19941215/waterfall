/**
 * Created by xiaoxiao on 2016/8/27.
 */
var waterfall = (function ($) {
  //记录每列高度的数组
  var colHeightArray = [],
    //计时器句柄
    timer = null,
    //需要显示的数据
    data = [],
    //滑动到底部的回调函数
    bottomHandler = null,
    //瀑布流容器
    $ct = $(".waterfall"),
    //瀑布流容器宽度
     ctWidth = $ct.width(),
    //接收配置选项的数组
    options = {},
    //初始化每个item的宽度为0
    itemWidth = 0;
  function init(opts) {
      //给options赋值
      options = opts;
      //改变瀑布流背景颜色
      options.waterfallBg && $ct.css("background",options.waterfallBg);
      //计算每个col的宽度
      if(options.colNum && options.margin){
        itemWidth = Math.floor((ctWidth - (options.colNum - 1) * options.margin)/options.colNum);
      }
    //绑定事件
    bind();
    //初次加载
    if(scrollBottom($ct)){
      bottomHandler && bottomHandler();
    }
  }

  function render(d) {
    //处理数据
    if(d){
      d.forEach(function(item,index){
        //设置默认图片
        if(!item.image_url){
          item.image_url = "images/1.jpg";
        }
      });
      //保存处理过的数据到data变量
      data = d;
      //完成图片加载和定位计算
      domComplete();
    }else {
      alert("load error data");
    }

  }
  function domComplete(){
    //根据options添加DOM节点
    initalDom();
    //设置def数组存储Deferred对象
    var def = [];
    var $itemList = $ct.find(".new");
    $itemList.each(function () {
      var deferred = $.Deferred();//定义一个Deferred对象
      $(this).find("img").on("load", function () {
        deferred.resolve();
      })
      def.push(deferred);
    })
    //当请求的图片都加载完毕开始计算定位
    $.when.apply(null, def).done(function(){
      layout();
      $ct.find(".new").each(function(){
        $(this).attr("class","item");
      });
    }).done(function(){
      //这里处理的一般是首次加载的情况
      // 如果内容仍然不够
      if(scrollBottom($ct)){
        bottomHandler && bottomHandler();
      }
    }).fail(function(){
      console.log("error");
    })
  }
  function layout(){
    //找到所有的item计算绝对定位的坐标值
    var $itemList = $ct.find(".item"),
      //获取配置选项的列数
    colNum = options.colNum,
      //获取配置选项的margin值
    margin = options.margin;    
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
  //事件绑定
  function bind() {
    $(window).on("scroll",function(){
      //性能考虑
      if(timer) clearTimeout(timer);
      timer = setTimeout(function(){
        //滑到了底部重新加载新数据
        if(scrollBottom()){
          bottomHandler && bottomHandler();
        }
      },100)
    })
    //resize事件
    $(window).on("resize",function(){
      console.log("resize");
      if(scrollBottom()){
        bottomHandler && bottomHandler();
      }
      //清空col数组重新计算
      colHeightArray = [];
      layout();
    })
  }
  //判断是否滑到了底部
  function scrollBottom(){
    var ctHeight = $ct.height() - 30;
    if(ctHeight < $(window).scrollTop() + $(window).height()){
      return true;
    }
    return false;
  }
  //获取最小值
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
  //设置滑到底部的回调函数
  function toBottom(handler){
    bottomHandler = handler;
  }
  //根据数据构建DOM树
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