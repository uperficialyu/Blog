#### js有哪些数据类型

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

#### 你有哪些方式检测数据类型

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

#### 编写一个万能数据类型检测方法

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

#### 讲下instanceof原理

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

#### 手写instanceof

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
