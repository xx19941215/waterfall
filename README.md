# A Waterfall Plugin

[演示DEMO](http://xiaoxiao.work/waterfall/dist/)

### 如何使用
下载后

```
$ npm install
$ glup serve
```
使用步骤：

插件依赖于`jQuery`，所以页面需要先引入`jQuery`，然后引入`waterfall.min.js`。

1.页面中设置一个类为`waterfall`的容器。

2.设置调用参数。

```javascript
/*
参数说明:
$.waterfall.toBottom(callback);//指定当瀑布流需要新添加数据时的回调参数，回调函数应该完成数据获取和渲染工作。
$.waterfall.init({
    //分别设置列数,项目的外边距，项目的背景，容器的背景颜色，具体可以看下面的示例
    colNum:5,
    margin:30,
    itemBg:"#FFFFFF",
    waterfallBg:"#F0EFED"
});
$.waterfall.render(data);//使用数据完成瀑布流的布局
*/

```

具体例子：

```javascript
 $.waterfall.toBottom(function(){
      //mock数据
      // var data = mockData();
      // $.waterfall.render(data);
      //真实数据
      //真实数据需要异步加载,image_url为空的话会添加一张默认图片
     $.get("http://115.28.219.57/news/news.php").done(function(data){
       if(data.retData){
         $.waterfall.render(data.retData);
       }
     })
    })
    //这里有四个配置参数，需要修改的话可以自定义，不需要修改的话传入默认值就好
    $.waterfall.init({
        colNum:5,
        margin:30,
        itemBg:"#FFFFFF",
        waterfallBg:"#F0EFED"
    });
   //备注：数据格式
   数据格式:
   [{
         image_url : "images/"+getRandom()+".jpg",
         url:"#",
         title:"一会儿吃什么？"
      },
      数据格式:
      {
          image_url : "images/"+getRandom()+".jpg",
          url:"#",
          title:"一会儿吃什么？"
      },
      ...

      ]
```
