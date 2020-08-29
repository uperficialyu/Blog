## instanceof原理

#### 作用

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

使用方法：
	
	// Function.prototype : Symbol.hasInstance
	console.log([] instanceof Array);
	// 浏览器内部其实是基于Symbol.hasInstance检测的
	console.log(Array[Symbol.hasInstance]([]));

#### 手写instanceof

方法1：

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

方法2：

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