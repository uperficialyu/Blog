## 目录

1. 闭包是什么
2. 闭包的作⽤
3. js有哪些数据类型
4. 你有哪些方式检测数据类型
5. 编写一个万能数据类型检测方法
6. 讲下instanceof原理
7. 手写instanceof
8. 为什么会有BigInt的提案
9. null与undefined的区别是什么
10. 谈谈你对原型链的理解
11. 如何判断是否是数组
12. 谈⼀谈你对this的了解
13. async/await是什么
14. async/await相⽐于Promise的优势
15. 简单介绍一下V8引擎的垃圾回收机制
16. 哪些操作会造成内存泄漏
17. 如何实现深拷贝
18. 手写AJAX
19. 移动端的点击事件的有延迟，时间是多久，为什么会有？怎么解决这个延时
20. promise基础
21. 跨域cors中如何传递cookie
22. for of，for in和forEach，map的区别
23. 如何判断一个变量是不是数组
24. 类数组和数组的区别是什么
25. ==和===有什么区别
26. ES6中的class和ES5的类有什么区别
27. 数组的哪些API会改变原数组
28. 在JS中什么是变量提升？什么是暂时性死区
29. 如何正确的判断this? 箭头函数的this是什么
30. 谈谈你对JS执行上下文栈和作用域链的理解
31. 数组去重的几种方式



#### 1、闭包是什么？

MDN的解释：闭包是函数和声明该函数的词法环境的组合。

按照我的理解就是：闭包=函数和函数体内可访问的变量总和。

我们平时，在函数里面是可以访问函数外部的一个变量的。但是，反过来，在外部是不可以直接拿到函数内部的局部变量的。同样在A函数里面，想拿B函数的局部变量是不被允许的。但是有时候我们又有这种需求的时候，然后我们可以通过闭包来实现。假设我们现在有一个A函数，然后我在里面又声明一个子函数。那我这个时候，我就先不调用该子函数。我把这个函数直接给return出去，然后我在函数的外部用一个变量来接收这个返回值。然后我用A函数里面的变量的时候，我在调用这个函数，这个时候数据就返回到外面了，那么这种写法就是闭包。那么我们把数据返回到外部了，那这里就有一种情况，本来局部变量会被垃圾回收机制回收了。但是我们把它返回到外面了，如果还存在引用的情况下，它是不会被消除的，所以闭包不能乱用，用的太多的话也会造成内存的一些浪费。但是呢，我在一些资料的时候，广义上说，只要是函数就是闭包。

#### 2、闭包的作⽤？

1. 保护：保护自己的私有变量不受外界干扰（操作自己的私有变量和外界没有关系）
2. 保存：如果当前上下文不被释放（只要让上下文的某个东西被外部占用即可），则存储的这些私有变量也不会被释放，可以供其下级上下文中调用，相当于把一些值保存起来了。

我们把函数执行所带来的两大作用，称之为“闭包”（闭包不是任何的代码，而是函数运行的机制），市面上大多认为：只有上下文不被释放才是闭包，因为这样才保留下来了。

#### 3、js有哪些数据类型？

js中的数据类型主要分为2种：

1. 基本数据类型（值类型）
    - number（数字）
    - string（字符串）
    - boolean（布尔）
    - null（空）
    - undefind（未定义）
    - symbol（唯一值） ES6中新增的数据类型（不能被new） 创建唯一值Symbol(10)===Symbol(10):false
    - bigint（大数据值） ES6中新增的数据类型（不能被new） Number.MAX_SAFE_INTEGER（最大安全数）
2. 引用数据类型
    - object（对象）
    - Array（数组）
    - RegExp（正则）
    - Date（日期）
    - function（函数）

复杂数据类型存储在堆内存，存储的是地址。当我们把对象赋值给另外一个变量的时候，复制的是地址，指向同一块内存空间，当其中一个对象改变时，另一个对象也会变化。

#### 4、你有哪些方式检测数据类型？

1. typeof
    - typeof(null) => "object"
    - typeof(数组/正则/日期/对象) => "object"
2. instanceof
    - 检测当前实例是否属于这个类（也可以用来检测数据类型：对typeof的补充）
    - 不能用来处理基本数据类型（基本数据类型基于构造函数方式创建的实例是可以的）
    - 只要出现在实例的原型链上的类，检测结果都是TRUE（页面中可以手动更改原型链的指向，这样导致检测结果不一定准确）
3. constructor
    - constructor也是一样可以被更改的（这个检测结果也不一定准确）
    - 基本数据类型也可以处理
4. Object.prototype.toString.call([val])
    - 其它类的原型上的toString基本上都是转换为字符串的，只有Object原型上的是检测数据类型的返回结果 "[object 所属的类]"
    - Object.prototype.toString执行，它中的this是谁，就是检测谁的数据类型
    - Object.prototype.toString.call(xxx)
    - ({}).toString.call(xxx)
    - 最强大的检测数据类型方法（基本上没有弊端）

#### 5、编写一个万能数据类型检测方法？

  ```javascript
  function toType(obj) {
    let type = Object.prototype.toString.call(obj);
    return /^\[object ([a-z]+)\]$/i.exec(type)[1].toLowerCase();
  }
  console.log(toType(1)); //=>"number"
  console.log(toType(NaN)); //=>"number"
  console.log(toType([])); //=>"array"
  console.log(toType(/^\d+$/)); //=>"regexp"
  console.log(toType({})); //=>"object"
  ```

#### 6、讲下instanceof原理？

instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。

使用方法：

  ```javascript
  let arr = [],
  reg = /^$/;
  console.log(arr instanceof Array); //=>true
  console.log(reg instanceof Array); //=>false
  console.log(1 instanceof Number); //=>false
  console.log(new Number(1) instanceof Number); //=>true
  console.log(Symbol() instanceof Symbol); //=>false
  console.log(arr instanceof Object); //=>true
  function Fn() {}
  Fn.prototype = Array.prototype;
  let f = new Fn;
  console.log(f instanceof Array); //=>true
  ```

#### 7、手写instanceof？

方法1：

  ```javascript
	// => example：要检测的实例
	// => classFunc:要检测的类
	function instance_of(example, classFunc) {
	  let classPrototype = classFunc.prototype,
	    proto = Object.getPrototypeOf(example);
	  while (true) {
	    if (proto === null) {
	      return false;
	    }
	    if (proto === classPrototype) {
	      return true;
	    }
	    proto = Object.getPrototypeOf(proto);
	  }
	}
	let res = instance_of([12, 23], Array);
	console.log(res); //=>true
  ```

方法2：

  ```javascript
	// =>example：要检测的实例
	// =>classFunc:要检测的类
	function instance_of(example, classFunc) {
	  let classPrototype = classFunc.prototype,
	    proto = example.__proto__;
	  while (true) {
	    if (proto === null) {
	      // 到了Object.prototype.__proto__
	      return false;
	    }
	    if (proto === classPrototype) {
	      // 在当前实例的原型链上找到了当前类
	      return true;
	    }
	    proto = proto.__proto__;
	  }
	}
	let res = instance_of([12, 23], Array);
	console.log(res); //=>true
  ```

#### 8、为什么会有BigInt的提案？

JavaScript中Number.MAX_SAFE_INTEGER表示最⼤安全数字，计算结果是9007199254740991，即在这个数范围内不会出现精度丢失（⼩数除外）。但是⼀旦超过这个范围，js就会出现计算不准确的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决，因此官⽅提出了BigInt来解决此问题。

#### 9、null与undefined的区别是什么？

null表示为空，代表此处不应该有值的存在，⼀个对象可以是null，代表是个空对象，⽽null本身也是对象。undefined表示『不存在』，JavaScript是⼀⻔动态类型语⾔，成员除了表示存在的空值外，还有可能根本就不存在（因为存不存在只在运⾏期才知道），这就是undefined的意义所在。

#### 10、谈谈你对原型链的理解？

这个问题关键在于两个点，⼀个是原型对象是什么，另⼀个是原型链是如何形成的。

原型对象：

绝⼤部分的函数(少数内建函数除外)都有⼀个prototype属性，这个属性是原型对象⽤来创建新对象实例，⽽所有被创建的对象都会共享原型对象，因此这些对象便可以访问原型对象的属性。例如hasOwnProperty()⽅法存在于Obejct原型对象中，它便可以被任何对象当做⾃⼰的⽅法使⽤。

  ```javascript
  ⽤法：object.hasOwnProperty(propertyName)
  hasOwnProperty()函数的返回值为Boolean类型。如果对象object具有名称为propertyName的属性，则返回true，否则返回false。
  ```

  ```javascript
  var person = {
    name: "Messi",
    age: 29,
    profession: "football player"
  };
  console.log(person.hasOwnProperty("name")); //true
  console.log(person.hasOwnProperty("hasOwnProperty")); //false
  console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); //true
  ```

由以上代码可知，hasOwnProperty()并不存在于person对象中，但是person依然可以拥有此⽅法。所以person对象是如何找到Object对象中的⽅法的呢？靠的是原型链。

原型链：

原因是每个对象都有__proto__属性，此属性指向该对象的构造函数的原型。对象可以通过__proto__与上游的构造函数的原型对象连接起来，⽽上游的原型对象也有⼀个__proto__，这样就形成了原型链。

#### 11、如何判断是否是数组？

es6中加⼊了新的判断⽅法：

  ```javascript
  if(Array.isArray(value)) {
    return true;
  }
  ```

在考虑兼容性的情况下可以⽤toString的⽅法：

  ```javascript
  if(!Array.isArray){
    Array.isArray = function(arg){
      return Object.prototype.toString.call(arg)==='[object Array]'
    }
  }
  ```

#### 12、谈⼀谈你对this的了解？

this的指向不是在编写时确定的，⽽是在执⾏时确定的，同时，this不同的指向在于遵循了⼀定的规则。⾸先，在非严格情况下，this是指向全局对象的，⽐如在浏览器就是指向window。

  ```javascript
  var name = "Bale";
  function sayName () {
    console.log(this.name);
  };
  sayName(); //"Bale"
  ```

其次，如果函数被调⽤的位置存在上下⽂对象时，那么函数是被隐式绑定的。

  ```javascript
  function f() {
    console.log( this.name );
  }
  var obj = {
    name: "Messi",
    f: f
  };
  obj.f(); // 被调⽤的位置恰好被对象obj拥有，因此结果是Messi
  ```

再次，显示改变this指向，常⻅的⽅法就是call、apply、bind。以bind为例：

  ```javascript
  function f() {
    console.log( this.name );
  }
  var obj = {
    name: "Messi",
  };
  var obj1 = {
    name: "Bale"
  };
  f.bind(obj)(); // Messi，由于bind将obj绑定到f函数上后返回⼀个新函数，因此需要再在后⾯加上括号进⾏执⾏，这是bind与apply和call的区别
  ```

最后，也是优先级最⾼的绑定new绑定。⽤new调⽤⼀个构造函数，会创建⼀个新对象，在创造这个新对象的过程中，新对象会⾃动绑定到Person对象的this上，那么this⾃然就指向这个新对象。

  ```javascript
  function Person(name) {
    this.name = name;
    console.log(name);
  }
  var person1 = new Person('Messi'); // Messi
  ```

绑定优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

那么箭头函数的this指向哪⾥？

箭头函数不同于传统JavaScript中的函数，箭头函数并没有属于⾃⼰的this，它的所谓的this是捕获其所在上下⽂的this值，作为⾃⼰的this值，并且由于没有属于⾃⼰的this，⽽箭头函数是不会被new调⽤的，这个所谓的this也不会被改变。

我们可以⽤Babel理解⼀下箭头函数：

  ```javascript
  // ES6
  const obj = {
    getArrow() {
      return () => {
        console.log(this === obj);
      };
    }
  }
  ```

转换后：

  ```javascript
  // ES5，由Babel转译
  var obj = {
    getArrow: function getArrow() {
      var _this = this;
      return function () {
        console.log(_this === obj);
      };
    }
  };
  ```

#### 13、async/await是什么？

async函数，就是Generator函数的语法糖，它建⽴在Promises上，并且与所有现有的基于Promise的API兼容。

1. Async—声明⼀个异步函数(async function someName(){...})
2. ⾃动将常规函数转换成Promise，返回值也是⼀个Promise对象
3. 只有async函数内部的异步操作执⾏完，才会执⾏then⽅法指定的回调函数
4. 异步函数内部可以使⽤await
1. Await—暂停异步的功能执⾏(var result = await someAsyncCall();)
2. 放置在Promise调⽤之前，await强制其他代码等待，直到Promise完成并返回结果
3. 只能与Promise⼀起使⽤，不适⽤与回调
4. 只能在async函数内部使⽤

#### 14、async/await相⽐于Promise的优势？

- 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调⽤也会带来额外的阅读负担
- Promise传递中间值⾮常麻烦，⽽async/await⼏乎是同步的写法，⾮常优雅
- 错误处理友好，async/await可以⽤成熟的try/catch，Promise的错误捕获⾮常冗余
- 调试友好，Promise的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个.then代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then代码块，因为调试器只能跟踪同步代码的『每⼀步』。

#### 15、简单介绍一下V8引擎的垃圾回收机制

v8的垃圾回收机制基于分代回收机制，这个机制又基于世代假说，这个假说有两个特点，一是新生的对象容易早死，另一个是不死的对象会活得更久。基于这个假说v8引擎将内存分为了新生代和老生代。新创建的对象或者只经历过一次的垃圾回收的对象被称为新生代。经历过多次垃圾回收的对象被称为老生代。

新生代被分为From和To两个空间，To一般是闲置的。当From空间满了的时候会执行Scavenge算法进行垃圾回收。当我们执行垃圾回收算法的时候应用逻辑将会停止，等垃圾回收结束后再继续执行。这个算法分为三步：

1. 首先检查From空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足条件则晋升到老生代。如果不满足条件则移动To空间。
2. 如果对象不存活，则释放对象的空间。
3. 最后将From空间和To空间角色进行交换。

新生代对象晋升到老生代有两个条件：
1. 第一个是判断是对象否已经经过一次Scavenge回收。若经历过，则将对象从From空间复制到老生代中；若没有经历，则复制到To空间。
2. 第二个是To空间的内存使用占比是否超过限制。当对象从From空间复制到To空间时，若To空间使用超过25%，则对象直接晋升到老生代中。设置25%的原因主要是因为算法结束后，两个空间结束后会交换位置，如果To空间的内存太小，会影响后续的内存分配。

老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。

由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。为了解决这个问题V8引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行。

#### 16、哪些操作会造成内存泄漏？

相关知识点：

1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用
4. 闭包

回答：

1. 第一种情况是我们由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。
2. 第二种情况是我们设置了setInterval定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
3. 第三种情况是我们获取一个DOM元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。
4. 第四种情况是不合理的使用闭包，从而导致某些变量一直被留在内存当中。

#### 17、如何实现深拷贝？

  ```javascript
  function cloneDeep(obj) {
    const constructor = obj.constructor;
    if (obj === null) return null;
    if (typeof obj !== "object") return obj;
    if (/^(RegExp|Date)$/i.test(constructor.name)) return new constructor(obj);
    let clone = new constructor();
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) break;
      clone[key] = cloneDeep(obj[key]);
    }
    return clone;
  }
  ```

#### 18、手写AJAX？

  ```javascript
	var request = new XMLHttpRequest()
	request.open('GET', '/a/b/c?name=ff', true);
	request.onreadystatechange = function () {
	if(request.readyState === 4 && request.status === 200) {
	  console.log(request.responseText);
	}};
	request.send();
  ```

#### 19、移动端的点击事件的有延迟，时间是多久，为什么会有？怎么解决这个延时？

移动端点击有300ms的延迟是因为移动端会有双击缩放的这个操作，因此浏览器在click之后要等待300ms，看用户有没有下一次点击，来判断这次操作是不是双击。

有三种办法来解决这个问题：

1. 通过meta标签禁用网页的缩放。
2. 通过meta标签将网页的viewport设置为ideal viewport。
3. 调用一些js库，比如FastClick。

click延时问题还可能引起点击穿透的问题，就是如果我们在一个元素上注册了touchStart的监听事件，这个事件会将这个元素隐藏掉，我们发现当这个元素隐藏后， 触发了这个元素下的一个元素的点击事件，这就是点击穿透。

#### 20、promise基础？

直接new Promise没有参数，报错

  ```javascript
  let p1 = new Promise();
  // Uncaught TypeError: Promise resolver undefined is not a function
  ```

语法：

  ```javascript
  new Promise( function(resolve, reject) {...} /* executor */  );
  ```

参数：

1. 在NEW PROMISE的同时就把executor函数执行了
2. executor函数中有两个默认的形参：resolve/reject 函数
3. executor函数中一般用来管理一个异步编程（当然只写同步的也可以）

描述：

1. 每一个PROMISE的实例都有两个重要的信息
2. [[PromiseStatus]]：PROMISE状态（pending准备状态/resolved(fulfilled)成功状态/rejected失败状态）
3. [[PromiseValue]]：PROMISE值（一般存放异步编程的处理结果）

使用方法：

  ```javascript
  let p1 = new Promise((resolve, reject) => {
    setTimeout(_ => {
      // resolve(100);
      // reject(200);
    }, 1000);
    // reject(100); //=>resolve/reject的执行是异步编程，需要等到THEN把方法存放好后，在根据状态通知THRN存放的某个方法执行
  });

  Promise.resolve(100) // 创建一个状态为成功值为100的PROMISE实例
  Promise.reject(200) ...
  Promise.all([promise1,promise2,...]) // 所有实例都成功，整体返回的PROMISE实例才是成功，只要有一个失败，整体实例就是失败的
  Promise.race([promise1,promise2,...]) // 多个PROMISE实例同时进行，谁先处理完，以谁的状态作为最后的整体状态（不论是成功还是失败）
  ```

执行顺序：

1. P1成功还是失败直接看EXECUTOR函数中执行的是哪个方法
2. 每一次执行THEN会返回一个新的POMISE实例  P2
3. 不管P1.THEN中哪个方法执行，只要执行不报错，则P2的状态就是成功，相反只要报错，P2就是失败，并且方法返回的结果就是P2的VALUE值
4. 如果P1.THEN中某个方法的执行，返回的是一个新的PROMISE实例，则新实例的最后结果直接影响了P2的结果

示例

  ```javascript
  let p2 = p1.then(result => {
    // 当PROMISE实例状态为成功，执行THEN存放的第一个函数；RESULT是[[PromiseValue]]
    return 10;
  }, reason => {
    // 当PROMISE实例状态为失败，执行THEN存放的第二个函数；
    return Promise.resolve('OK');
  });

  let p3 = p2.then(result => {}, reason => {});
  ```

下面等价

  ```javascript
  p3.then(null,reason => {})
  p3.catch(reason => {});
  ```

如果THEN中的某个方法没有写，则顺延至下一个TEHN的指定方法中

  ```javascript
  Promise.reject('NO').then(result => {
    console.log('成功:' + result);
    return 1;
  }, /* reason => {
    return Promise.reject(reason);
  } */).then(/* result => {
    return Promise.resolve(result);
  },  */reason => {
    console.log('失败:' + reason);
  });

  Promise.reject('NO').then(result => {
    
  }).catch(reason => {

  }).then(result=>{

  });
  ```

#### 21、跨域cors中如何传递cookie？

浏览器默认情况下无法主动跨域向后端发送cookie，如果你要发送cookie给server的话, 就需要将withCredentials设置为true了。

#### 22、for of，for in和forEach，map的区别？

1. for...of循环：具有iterator接口，就可以用for...of循环遍历它的成员(属性值)。for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象、Generator对象，以及字符串。for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。对于普通的对象，for...of结构不能直接使用，会报错，必须部署了Iterator接口后才能使用。可以中断循环。
2. for...in循环：遍历对象自身的和继承的可枚举的属性, 不能直接获取属性值。可以中断循环。
3. forEach: 只能遍历数组，不能中断，没有返回值(或认为返回值是undefined)，不修改原数组。
4. map: 只能遍历数组，不能中断，返回值是修改后的数组，不修改原数组。

#### 23、如何判断一个变量是不是数组？

1. 使用Array.isArray判断，如果返回true，说明是数组
2. 使用instanceof Array判断，如果返回true，说明是数组
3. 使用Object.prototype.toString.call判断，如果值是 [object Array]，说明是数组
4. 通过constructor来判断，如果是数组，那么arr.constructor===Array(不准确，因为我们可以指定obj.constructor=Array)

  ```javascript
  function fn() {
    console.log(Array.isArray(arguments)) // false; 因为arguments是类数组，但不是数组
    console.log(Array.isArray([1,2,3,4])); // true
    console.log(arguments instanceof Array); // fasle
    console.log([1,2,3,4] instanceof Array); // true
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
    console.log(Object.prototype.toString.call([1,2,3,4])); // [object Array]
    console.log(arguments.constructor === Array); // false
    arguments.constructor = Array;
    console.log(arguments.constructor === Array); // true
    console.log(Array.isArray(arguments)); // false
  }
  ```

#### 24、类数组和数组的区别是什么？

1. 拥有length属性，其它属性（索引）为非负整数（对象中的索引会被当做字符串来处理）;
2. 不具有数组所具有的方法；

类数组是一个普通对象，而真实的数组是Array类型。

常见的类数组有：函数的参数arugments，DOM对象列表(比如通过document.querySelectorAll得到的列表)，jQuery对象(比如$("div"))。

类数组可以转换为数组：

  ```javascript
  //第一种方法
  Array.prototype.slice.call(arrayLike);
  //第二种方法
  [...arrayLike];
  //第三种方法:
  Array.from(arrayLike);
  ```

任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象。

#### 25、==和===有什么区别？

===不需要进行类型转换，只有类型相同并且值相等时，才返回true。

==如果两者类型不同，首先需要进行类型转换。具体流程如下:

1. 首先判断两者类型是否相同，如果相等，判断值是否相等
2. 如果类型不同，进行类型转换
3. 判断比较的是否是null或者是undefined，如果是, 返回true
4. 判断两者类型是否为string和number，如果是，将字符串转换成number
5. 判断其中一方是否为boolean，如果是，将boolean转为number再进行判断
6. 判断其中一方是否为object且另一方为string、number或者symbol，如果是，将object转为原始类型再进行判断

  ```javascript
  let person1 = {
    age:25
  }
  let person2 = person1;
  person2.gae = 20;
  console.log(person1 === person2); // true,注意复杂数据类型，比较的是引用地址
  ```

思考: []==![]

我们来分析一下: []==![]是true还是false？

1. 首先，我们需要知道!优先级是高于==(更多运算符优先级可查看：运算符优先级)
2. ![]引用类型转换成布尔值都是true，因此![]的是false
3. 根据上面的比较步骤中的第五条，其中一方是boolean，将boolean转为number再进行判断，false转换成number，对应的值是0
4. 根据上面比较步骤中的第六条，有一方是 number，那么将object也转换成Number，空数组转换成数字，对应的值是0(空数组转换成数字，对应的值是0，如果数组中只有一个数字，那么转成number就是这个数字，其它情况，均为NaN)
5. 0 == 0；为true

#### 26、ES6中的class和ES5的类有什么区别？

1. ES6 class内部所有定义的方法都是不可枚举的;
2. ES6 class必须使用 new 调用;
3. ES6 class不存在变量提升;
4. ES6 class默认即是严格模式;
5. ES6 class子类必须在父类的构造函数中调用super()，这样才有this对象；ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。

#### 27、数组的哪些API会改变原数组？

修改原数组的API有：splice/reverse/fill/copyWithin/sort/push/pop/unshift/shift

不修改原数组的API有：slice/map/forEach/every/filter/reduce/entry/entries/find

#### 28、在JS中什么是变量提升？什么是暂时性死区？

变量提升就是变量在声明之前就可以使用，值为undefined。

在代码块内，使用 let/const 命令声明变量之前，该变量都是不可用的(会抛出错误)。这在语法上，称为“暂时性死区”。暂时性死区也意味着 typeof 不再是一个百分百安全的操作。

  ```javascript
  typeof x; // ReferenceError(暂时性死区，抛错)
  let x;
  typeof y; // 值是undefined，不会报错
  ```

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 29、如何正确的判断this? 箭头函数的this是什么？

this的绑定规则有四种：默认绑定，隐式绑定，显式绑定，new绑定。

1. 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
2. 函数是否通过call,apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
3. 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
4. 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象。
5. 如果把null或者undefined作为this的绑定对象传入call、apply或者bind, 这些值在调用时会被忽略，实际应用的是默认绑定规则。
6. 箭头函数没有自己的this，它的this继承于上一层代码块的this。

  ```javascript
  var number = 5;
  var obj = {
    number: 3,
    fn1: (function() {
      var number;
      this.number *= 2;
      number = number * 2;
      number = 3;
      return function() {
        var num = this.number;
        this.number *= 2;
        console.log(num);
        number *= 3;
        console.log(number);
      }
    })()
  }
  var fn1 = obj.fn1;
  fn1.call(null);
  obj.fn1();
  console.log(window.number);
  ```

答案：10,9,3,27,20

#### 30、谈谈你对JS执行上下文栈和作用域链的理解？

执行上下文就是当前JavaScript代码被解析和执行时所在环境，JS执行上下文栈可以认为是一个存储函数调用的栈结构，遵循先进后出的原则。

1. JavaScript执行在单线程上，所有的代码都是排队执行。
2. 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
3. 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行-完成后，当前函数的执行上下文出栈，并等待垃圾回收。
4. 浏览器的JS执行引擎总是访问栈顶的执行上下文。
5. 全局上下文只有唯一的一个，它在浏览器关闭时出栈。

作用域链: 无论是 LHS 还是 RHS 查询，都会在当前的作用域开始查找，如果没有找到，就会向上级作用域继续查找目标标识符，每次上升一个作用域，一直到全局作用域为止。

#### 31、数组去重的几种方式？

1. 利用ES6 Set去重

  ```javascript
  function unique (arr) {
    return Array.from(new Set(arr))
  }
  var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(arr))
   //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
  ```

不考虑兼容性，这种去重的方法代码最少。这种方法还无法去掉“{}”空对象，后面的高阶方法会添加去掉重复“{}”的方法。

2. 利用for嵌套for，然后splice去重

  ```javascript
  function unique(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {         //第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr))
  //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和{}没有去重，两个null直接消失了
  ```

双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。

3. 利用indexOf去重

  ```javascript
  function unique(arr) {
    if (!Array.isArray(arr)) {
      console.log('type error!')
      return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (array.indexOf(arr[i]) === -1) {
        array.push(arr[i])
      }
    }
    return array;
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr))
  // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
  ```

新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则push进数组。

4. 利用sort()

  ```javascript
  function unique(arr) {
    if (!Array.isArray(arr)) {
      console.log('type error!')
      return;
    }
    arr = arr.sort()
    var arrry = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1]) {
        arrry.push(arr[i]);
      }
    }
    return arrry;
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr))
  // [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]      //NaN、{}没有去重
  ```

利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。

5. 利用hasOwnProperty

  ```javascript
  function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
  }
  var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(arr));
  //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]   //所有的都去重了
  ```

利用hasOwnProperty 判断是否存在对象属性

6. 利用filter

  ```javascript
  function unique(arr) {
    return arr.filter(function (item, index, arr) {
      //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
      return arr.indexOf(item, 0) === index;
    });
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr))
  //[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
  ```

7. 利用递归去重

  ```javascript
  function unique(arr) {
    var array = arr;
    var len = array.length;

    array.sort(function (a, b) {   //排序后更加方便去重
      return a - b;
    })

    function loop(index) {
      if (index >= 1) {
        if (array[index] === array[index - 1]) {
          array.splice(index, 1);
        }
        loop(index - 1);    //递归loop，然后数组去重
      }
    }
    loop(len - 1);
    return array;
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr));
  //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
  ```

8. 利用Map数据结构去重

  ```javascript
  function arrayNonRepeatfy(arr) {
    let map = new Map();
    let array = new Array();  // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
      if (map.has(arr[i])) {  // 如果有该key值
        map.set(arr[i], true);
      } else {
        map.set(arr[i], false);   // 如果没有该key值
        array.push(arr[i]);
      }
    }
    return array;
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr));
  //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
  ```

9. 利用reduce+includes

  ```javascript
  function unique(arr) {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
  }
  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
  console.log(unique(arr));
  // [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
  ```