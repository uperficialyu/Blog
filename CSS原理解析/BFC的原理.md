### BFC的含义

- MDN的定义:  块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
- BFC(block formatting context)块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则，它决定了元素如何对齐内容进行布局，以及与其他元素的关系和相互作用。 当涉及到可视化布局的时候，BFC提供了一个环境，HTML元素在这个环境中按照一定规则进行布局；
- 具有BFC特性的元素可以看做是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的的一些特性。
- BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响。

### BFC的布局规则
- 内部的盒子会在垂直方向，一个个地放置；
- 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠；
- 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此；
- BFC的区域不会与float box重叠；
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此；
- 计算BFC的高度时，浮动元素也参与计算；

### BFC的原理和功能

其实BFC是上面三种布局方式中的普通流，BFC会产生一个独立的容器，该容器内部的元素不会在布局上影响到外部的元素，在外部的普通流看来它和其他普通流元素无差别，文档最终会按照上面说的普通流计算布局。

### ![](https://cdn.nlark.com/yuque/0/2020/jpeg/298369/1582976855371-330c490b-54cf-4910-a533-0096736b379b.jpeg#align=left&display=inline&height=511&originHeight=695&originWidth=1015&size=0&status=done&style=none&width=746#align=left&display=inline&height=408&margin=%5Bobject%20Object%5D&originHeight=695&originWidth=1015&status=done&style=none&width=596)

[https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

### 触发BFC的条件

只要元素满足下面任一条件即可触发BFC特性：

- html根元素或其他包含它的元素；
- float的属性不为none；
- overflow为auto、scroll、hidden；
- display为inline-block，table-cell，table-caption中的任何一个；
- position为absolute或fixed；

![](https://cdn.nlark.com/yuque/0/2020/jpg/454050/1595833522311-f198efea-f47c-462f-924a-8719e1f6dcc4.jpg#align=left&display=inline&height=155&margin=%5Bobject%20Object%5D&originHeight=190&originWidth=390&size=0&status=done&style=none&width=318)

### BFC的用处

- overflow:auto 创建一个会包含这个浮动的 BFC，通常的做法是设置父元素 overflow: auto 或者设置其他的非默认的 overflow: visible 的值。overflow: auto 或者设置其他的非默认的 overflow: visible 的值。
- 使用display: flow-root; 一个新的 display 属性的值，它可以创建无副作用的 BFC。在父级块中使用 display: flow-root 可以创建新的 BFC。

#### 案例一: 让浮动内容和周围的内容等高

示例：

  ```css
    .box {
      background-color: rgb(224, 206, 247);
      border: 5px solid rebeccapurple;
      overflow: hidden;
    }

    .float {
      float: left;
      width: 200px;
      height: 150px;
      background-color: white;
      border: 1px solid black;
      padding: 10px;
    }
  ```

  ```html
  <div class="box">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the container.</p>
  </div>
  ```
#### 案例二: 外边距折叠

- 原因: Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 解决方法: 给上box或者下box任意一个包裹新的box并开启BFC
- 原理: BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此；

示例：

  ```css
  p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align: center;
  }
  .p1 {
    margin-bottom: 50px;
  }
  .p2 {
    margin-top: 50px;
  }
  ```

  ```html
  <p class="p1">新年快乐</p>
  <p class="p2">新年快乐</p>
  ```

效果是两个新年快乐的间距是50px。

解决办法：

  ```css
  p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align: center;
  }
  .p1 {
    margin-bottom: 50px;
  }
  .p2 {
    margin-top: 50px;
  }
  /* 相加100px  */
  /* overflow: hidden;
    1.溢出隐藏
    2.margin的折叠问题
    3.清除浮动
  */
  .parent {
    overflow: hidden;
  }
  ```

  ```html
  <p class="p1">新年快乐</p>
  <div class="parent">
    <p class="p2">新年快乐</p>
  </div>
  ```

#### 案例三: 清除浮动

- 解决方法: 给父元素开启BFC
- 原理: 计算BFC的高度时，浮动子元素也参与计算

示例：

  ```css
  /* 清除浮动有多少种方法？ 越多越好 */
  .container {
    width: 300px;
    border: 5px solid #fcc;
    overflow: auto; 
  }

  .box {
    width: 100px;
    height: 100px;
    float: left;
    border: 5px solid #f66;
  }
  ```

  ```html
  <div class="container">
    <div class="box"></div>
    <div class="box"></div>
  </div>
  <ul>
    <li>新年快乐</li>
    <li>新年快乐</li>
    <li>新年快乐</li>
    <li>新年快乐</li>
    <li>新年快乐</li>
  </ul>
  ```

#### 案例四: 自适应的两列布局(左图右文)

- 解决方法: 给父元素开启BFC
- 原理: BFC的区域不会与float box重叠；

  ```css
  /* 原理1: 层叠上下文 - html层叠上下文元素里面
    特性:  层叠顺序 =>  
    背景或边框 <  z-index负值 < 块级元素  < 浮动元素 < 行内块 <  position < z-index正值
    aside浮动元素
    main块级元素

    原理2: BFC规则
    BFC元素不会与float容器重叠
    BFC是一个独立的容器   和外面的元素互不影响
  */
  .aside {
    width: 100px;
    height: 150px;
    float: left;
    background: #f66;
  }
  .main {
    height: 200px;
    background: #fcc;
    overflow: hidden; /*这行不加会重叠*/
  }
  ```

  ```html
  <div class="aside"></div>
  <div class="main"></div>
  ```
