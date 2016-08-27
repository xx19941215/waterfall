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
$.waterfall.toBottom();
$waterfall.init({
      //这里有四个配置参数，需要修改的话可以自定义，不需要修改的话传入默认值就好
      waterfallWidth:1180,
      itemWidth:220,
      itemBg:"#FFFFFF",
      waterfallBg:"#F0EFED"
})
```

例如：

```javascript
 $.waterfall.toBottom(function(){
      //mock数据
      // var data = mockData();
      // $.waterfall.render(data);
      //真实数据
      //真实数据需要异步加载
     $.get("http://115.28.219.57/news/news.php").done(function(data){
       console.log(data);
       if(data.retData){
         $.waterfall.render(data.retData);
       }
     })
    })
    //这里有四个配置参数，需要修改的话可以自定义，不需要修改的话传入默认值就好
    $.waterfall.init({
      waterfallWidth:1180,
      itemWidth:220,
      itemBg:"#FFFFFF",
      waterfallBg:"#F0EFED"
    });
    
```
