## 笔试题-js基础

### 第1题: ['1', '2', '3'].map(parseInt) what & why ?
    ['1', '2', '3'].map(parseInt); // 1 NaN NaN
	['1', '2', '3'].map((item, index) => {
		return parseInt(item, index)
	});
	parseInt('1', 0) // 1
	parseInt('2'，1) // NaN
	parseInt('3', 2) // NaN 3 不是二进制

parseInt()：函数解析一个字符串参数,并返回一个指定基数的整数(数学系统的基础)。  

	const intValue =parseInt(string[, Iradix]);

string：要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用ToString抽象操作)。字符串开头的空白符将会被忽略。  
radix：一个介于2和36之间的整数(数学系统的基础)，示上述字符串的基数。默认为10。  
返回值：返回-个整数或NaN


### 第2题:什么是防抖和节流?有什么区别?如何实现?
防抖：动作绑定事件，动作发生后一定时间后触发事件，在这段时间内，如果该动作又发生,则重新等待一定时间再触发事件。

	function debounce(func, time) {
		let timer = null;
		return () =》{
			clearTimeout(timer) ;
			timer = setTimeout(()=> {
				func.apply(this, arguments)
			}, time);
		}
	}

	