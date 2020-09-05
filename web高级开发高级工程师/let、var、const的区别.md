## let、var、const的区别

#### JS中声明变量或者函数的方式

	// 【传统】
	var n = 10;
	function func(){}
	var func = function(){};

	// 【ES6】
	let n = 10;
	const m = 20;
	let func = ()=>{};
	import xxx from 'xxx';

#### let和const的定义

	// =>const设置的是常量，存储的值不能被改变 【不对】
	// =>const创建的变量，它的指针指向一旦确定，不能再被修改【正确】
	// =>let设置的是变量，存储的值可以改变 【正确】
	const n = 10;
	n = 20; // =>Uncaught TypeError: Assignment to constant variable.
	console.log(n); 

	const obj = {
	  name: 'hello'
	};
	obj.name = "world";
	console.log(obj);  //=> {name:"world"}

#### let 和 var 的区别？

1. let不存在变量提升
2. let不允许重复声明
3. let会产生块级作用域
4. 暂时性死区的问题

变量提升：在当前上下文代码自上而下执行之前，会把所有带var/function关键字的进行提前的声明或者定义（带var是只声明，带function是声明+定义(赋值)都完成了）

	// EC(G)  
	// 变量提升: var a;  func=AAAFFF000;  
	// 代码执行：

	console.log(a); //=>undefined
	func(); // =>"OK"
	var a = 12;
	function func() {
		console.log('OK');
	}

	**********************************************************************

	// EC(G)
	// 变量提升：--
	// 代码执行 

	console.log('STRAT');
	console.log(a); //=>Uncaught ReferenceError: Cannot access 'a' before initialization 代码执行中遇到输出a,检测到下面有基于let声明的操作，则提示不允许在声明之前使用这个变量
	func();
	let a = 12;
	let func = () => {
		console.log('OK');
	}; 
	
	********************************************************************

	// Uncaught SyntaxError: Identifier 'a' has already been declared 重复声明的检测和报错，不是发生在代码执行阶段，发生在词法解析阶段（不论基于什么声明的变量，只要上下中有这个变量，都不能再基于let重复声明了）
	
	console.log('START');
	var a = 12;
	let a = 13;
	console.log(a);  

	********************************************************************
		
	暂时性死区（浏览器的BUG）
		 
	// console.log(a); //Uncaught ReferenceError: a is not defined
	// console.log(typeof a); //=>检测一个未被声明的变量，不会报错，结果是"undefined"
	// typeof window !== "undefined"  =>说明当前环境下存在window（浏览器环境） JQ源码中也是基于这样的方式处理的
	
	// console.log(typeof a); //=>Uncaught ReferenceError: Cannot access 'a' before initialization
	// let a;

	********************************************************************

前端代码中的上下文（作用域）

1. 全局上下文
2. 函数执行形成的私有上下文

----------

	var a = 12;
	if (1 == 1) {
	  console.log(a); //12
	  var a = 13;
	  console.log(a); //13
	}
	console.log(a); //13 

如果代码块中出现了 let/const/function 则当前代码块会产生一个 块级上下文（词法/块级作用域） => 私有的上下文

	let a = 12;
	if (1 == 1) {
	  // console.log(a); //=>Uncaught ReferenceError: Cannot access 'a' before initialization
	  let a = 13;
	  console.log(a); //13
	}
	console.log(a); //12 

即使混在一起，跨级作用域只对let/const/function生效，对var不生效的

	var n = 12;
	let m = 13;
	if (1 == 1) {
	  var n = 120;
	  let m = 130;
	  console.log(n, m); //=>120 130
	}
	console.log(n, m); //=>120 13 

循环

	for (var i = 0; i < 5; i++) {
	  // i 都是全局的
	}
	console.log(i); //=>5 */
	
	for (let i = 0; i < 5; i++) {
	  // 私有的块级上下文
	  // 循环几次会产生几个块级上下文
	}
	// console.log(i); //=>Uncaught ReferenceError: i is not defined