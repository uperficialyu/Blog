// let p1 = new Promise();
// Uncaught TypeError: Promise resolver undefined is not a function

// 在NEW PROMISE的同时就把executor函数执行了
// =>executor函数中有两个默认的形参：resolve/reject 函数
// =>executor函数中一般用来管理一个异步编程（当然只写同步的也可以）

// 每一个PROMISE的实例都有两个重要的信息
// =>[[PromiseStatus]]：PROMISE状态（pending准备状态/resolved(fulfilled)成功状态/rejected失败状态）
// =>[[PromiseValue]]：PROMISE值（一般存放异步编程的处理结果）

// resolve/reject这个两个函数的执行，目的就是改变[[PromiseStatus]]/[[PromiseValue]]
// =>一但状态设置为成功或者失败，则不能在改变为其它的
// =>resolve执行是成功   reject执行是失败
// =>执行函数传递的结果就是[[PromiseValue]]

//=>>> Promise.resolve(100) 创建一个状态为成功值为100的PROMISE实例
//=>>> Promise.reject(200) ...
//=>>> Promise.all([promise1,promise2,...]) 所有实例都成功，整体返回的PROMISE实例才是成功，只要有一个失败，整体实例就是失败的
//=>>> Promise.race([promise1,promise2,...]) 多个PROMISE实例同时进行，谁先处理完，以谁的状态作为最后的整体状态（不论是成功还是失败）

/* let p1 = new Promise((resolve, reject) => {
	/!* setTimeout(_ => {
		// resolve(100);
		// reject(200);
	}, 1000); *!/
	reject(100); //=>resolve/reject的执行是异步编程，需要等到THEN把方法存放好后，在根据状态通知THRN存放的某个方法执行
});
// P1成功还是失败直接看EXECUTOR函数中执行的是哪个方法
// 每一次执行THEN会返回一个新的POMISE实例  P2
// =>不管P1.THEN中哪个方法执行，只要执行不报错，则P2的状态就是成功，相反只要报错，P2就是失败，并且方法返回的结果就是P2的VALUE值
// =>如果P1.THEN中某个方法的执行，返回的是一个新的PROMISE实例，则新实例的最后结果直接影响了P2的结果
let p2 = p1.then(result => {
	// 当PROMISE实例状态为成功，执行THEN存放的第一个函数；RESULT是[[PromiseValue]]
	return 10;
}, reason => {
	// 当PROMISE实例状态为失败，执行THEN存放的第二个函数；
	return Promise.resolve('OK');
});

let p3 = p2.then(result => {}, reason => {}); */

//=>>> p3.then(null,reason => {})
// p3.catch(reason => {});

// 如果THEN中的某个方法没有写，则顺延至下一个TEHN的指定方法中
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