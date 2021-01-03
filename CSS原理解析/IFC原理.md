### IFC的原理和功能
> 存在块级格式化上下文BFC，则对应存在内联格式化上下文IFC、网格格式化上下文GFC、自适应格式化上下文FFC，这些都可以统称为格式化上下文;

![image.png](https://cdn.nlark.com/yuque/0/2020/png/454050/1595836370886-bf1a8646-ed4e-4d13-bc81-036fa4d08220.png#align=left&display=inline&height=292&margin=%5Bobject%20Object%5D&name=image.png&originHeight=562&originWidth=881&size=58668&status=done&style=none&width=458)
> IFC的含义:
> - IFC(inline Formatting Context）叫做“内联格式化上下”
> - 内部的元素从包含块的顶部开始，从左至右(默认)排列成一行形成的一个矩形盒子叫做line box；
> 


> IFC的布局规则:
> - 盒子是水平一个接一个的排列，水平的margin，内边距，边框是可以有的。
> - 垂直方向的对齐，可能是底部对齐，顶部对齐，也可能是基线对齐（这个是默认的）
> - 行框中的内联盒子的高度小于行框的高度时，内联盒子的垂直方向的对齐方式取决于vertical-align属性。
> - 当一个行框水平不能容纳内联盒子时，他们将会在垂直方向上产生多个行框，他们上下一个挨着一个，但是不会重叠。
> - 一般来说，行框的左边界紧挨着包含容器的左边界，行框的右边界紧挨着包含容器的右边界，（是两个边都紧挨着）。然而，浮动盒子可能存在于包含边框边界和行框边界之间。
> - 多个内联盒子的宽度小于包含他们的行框时，他们在水平方向的分布取决于text-align属性。
> 

> IFC的作用:
> - 水平居中：当一个块要在环境中水平居中时候，设置其为inline-block则会在外层产生IFC，通过text-align:center则可以使其水平居中。
> - 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle,其他行内元素则可以在此父元素下垂直居中。

### 理解font-size、line-height、vertical-align
> [https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)
> [https://www.cnblogs.com/10yearsmanong/p/13084706.html](https://www.cnblogs.com/10yearsmanong/p/13084706.html)
> 图片下面默认的留白:
> - 让vertical-align失效-图片设置display或者浮动、绝对定位
> - 使用其他vertical-align值(bottom/middle/top)
> - 直接修改line-height值

> - line-height为相对单位，font-size间接控制



