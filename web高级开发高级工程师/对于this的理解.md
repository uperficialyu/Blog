### this的几种情况

this的绑定规则主要有下面5种：

1. 默认绑定
2. 隐式绑定
3. 显示绑定
4. new绑定
5. 箭头函数绑定

  ```javascript
  function func() {
    /*
      * EC(FUNC)私有上下文
      *    作用域链:<当前上下文,函数作用域>
      *    初始化THIS:（执行主体 !== 执行上下文）
      *    初始化ARGUMENTS:（箭头函数不用，因为没有ARGUMENTS）
      *    形参赋值:
      *    变量提升:
      *    代码执行:
      *
      */
    console.log(this);
  }
  ```

函数的执行主体是谁，和函数在在哪创建的，以及在哪执行的都没有关系

规律：

1. document.body.onclick=function(){}  this->body
2. 方法执行，我们去看方法名前面是否有“点”，有“点”它前面是谁this就是谁，没有“点”在非严格模式下this是window，严格模式下this是undefind

示例1：

  ```javascript
  window.name = "WINDOW";
  function func() {
    console.log(this);
  }
  let obj = {
    name: 'OBJ',
    func
  };
  func(); // => this:window
  obj.func(); // => this:obj 
  ```

示例2：

  ```javascript
  let arr = [];
  arr.slice(); // => slice中的this:arr
  arr.__proto__.slice(); // => slice中的this:arr.__proto__
  ```

示例3：

  ```javascript
  // 匿名函数（自执行函数/回调函数等）执行，一般方法中的THIS都是WINDOW|UNDEFINED
  (function () {
    console.log(this);
  })();
  ```

示例4：

  ```javascript
  setTimeout(function () {
    // 回调函数：把函数作为值传递给另外一个函数，在另外一个函数的某个阶段把他执行
    console.log(this); // -> window
  }, 1000);
  ```

示例5：

  ```javascript
  [10, 20, 30].forEach(function (item, index) {
    console.log(this); // =>forEach中第二个参数不传递this:window，传递[context]，则this:[context]
  },[context]);
  ```

#### 综合练习1：

  ```javascript
  var x = 3,
    obj = {x: 5};
  obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
      this.x *= (++x)+y;
      console.log(x);
    }
  })();
  var fn = obj.fn;
  obj.fn(6);
  fn(4);
  console.log(obj.x, x);
  ```

答案：

- 13
- 234
- 95 234

解析：

