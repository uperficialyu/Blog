## 目录

1. 两种盒模型分别说一下

#### 1、两种盒模型分别说一下？

盒模型可以分为：标准盒模型和ie盒模型  
可以使用boo-sizing设置content-box、border-box  

**W3C标准盒子（content-box）**：又称内容盒子，是指块元素box-sizing属性为content-box的盒模型。一般在现代浏览器中使用的都是正常盒模型content-box。它所说的width一般只包含内容，不包含padding与margin，并且盒子的大小会以内容优先，自动扩展，子元素可以撑开父元素。
可以理解为现实生活中的气球，大小可以随内容的变化而变化。
![](https://img-blog.csdnimg.cn/2018103116294097.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNzIwNjgz,size_16,color_FFFFFF,t_70)
在这种盒模型下，我们所说的元素的 width ，实际上只包含 content

	盒子总宽度 = margin + border + padding + width

IE盒子（border-box）：又称怪异盒模型（边框盒子），是指块元素box-sizing属性为border-box的盒模型。一般在IE浏览器中默认为这种怪异盒模型，但是由于其自身的特殊性，手机页面中也有使用怪异盒模型。怪异盒模型中，父元素的盒模型确定，子元素无法撑开父元素的盒模型。  
可以理解为现实生活中的铁箱子，大小不能被内容改变。
![](https://img-blog.csdnimg.cn/20181031163315990.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNzIwNjgz,size_16,color_FFFFFF,t_70)

在这种盒模型下，我们所说的元素的 width ，实际上包含了 content + padding + border

	盒子总宽 = margin + width

比如，现在我们可以通过实例来看看它们的具体的不同：

	一个盒子模型如下：margin:20px,border:10px,padding:10px;width:200px;height:50px;
	现计算出两种盒子模型下盒子的宽高。
W3C标准盒子：

	盒子占用空间的宽高：（在浏览器页面所占空间）
	Width = 200 + 10*2 + 10*2 + 20*2 = 280 px;
	Height = 50 + 10*2 + 10*2 + 20*2 = 130 px;

	盒子实际宽高：
	Width = 200 + 10*2 + 10*2 = 240 px;
	Height = 50 + 10*2 + 10*2 = 90 px;

 
IE盒子：

	盒子占用空间的宽高：（在浏览器页面所占空间）
	Width =  200 + 20*2 = 240 px;
	Height = 50 + 20*2 = 90 px;

	盒子实际宽高：
	Width = 200 px;
	Height = 50 px;