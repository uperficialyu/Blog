# React hooks 精讲

## hooks 简洁

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## useState原理
useState的基本用法

	import React, { useState } from 'react';

	function App() {
	  // 声明一个新的叫做 “count” 的 state 变量
	  const [count, setCount] = useState(0);
	
	  return (
	    <div>
	      <p>You clicked {count} times</p>
	      <button onClick={() => setCount(count + 1)}>
	        Click me
	      </button>
	    </div>
	  );
	}
- 点击button会发生什么？
- 执行setCount的时候会发生什么？n会变吗？App()会重新执行吗？
- 如果App()会重新执行，那么useState(0)的时候，n每次的值会有什么不同吗？

#### 分析
- setCount  
setCount一定会修改数据x，将count+1存入x  
setCount一定会触发<App />重新渲染（re-render）
- useState  
useState肯定会从x读取count的最新值
- x  
每个组件有自己的数据x，我们将其命名为state

#### 尝试实现React.useState

	import React from 'react';
	import ReactDOM from 'react-dom';
	
	function myUseState(initialValue) {
	  let state = initialValue;
	  function setState(newState) {
	    state = newState;
	    render();
	  }
	  return [state, setState];
	}
	
	const render = () => {
	  ReactDOM.render(<App />, document.getElementById('root'));
	}
	
	function App() {
	  const [n, setN] = myUseState(0);
	  console.log(n,'n')
	  return (
	    <div className="App">
	      <p>{n}</p>
	      <p>
	        <button onClick={() => setN(n+1)}>加1</button>
	      </p>
	    </div>
	  );
	}
	
	export default App;

测试发现，完全没有变化啊。  
因为MyUseState会将state重置  
那么我们需要一个不会被myUseState重置的变量  
那么这个变量只需要声明在myUseState外面就可以  

#### 优化刚刚的React.useState

	import React from 'react';
	import ReactDOM from 'react-dom';
	
	// eslint-disable-next-line no-unused-vars
	let _state;
	
	function myUseState(initialValue) {
	  _state = _state === undefined ? initialValue : _state;
	  function setState(newState) {
	    _state = newState;
	    render();
	  }
	  return [_state, setState];
	}
	
	const render = () => {
	  ReactDOM.render(<App />, document.getElementById('root'));
	}
	
	function App() {
	  const [n, setN] = myUseState(0);
	  // const [x, setX] = myUseState(0);
	  console.log(n,'n')
	  // console.log(x,'x')
	  return (
	    <div className="App">
	      <p>{n}</p>
	      {/* <p>{x}</p> */}
	      <p>
	        <button onClick={() => setN(n+1)}>加1</button>
	        {/* <button onClick={() => setX(x+1)}>加1</button> */}
	      </p>
	    </div>
	  );
	}
	
	export default App;

useState原理就这么简单吗？我们已经实现的自己的useState了吗？  
如果一个组件同时用了2个useState怎么办？  
由于数据都放在_state中，所以2个state会数据冲突。

#### 改进思路
1. 把_state当做一个对象  
比如_state = { n: 0, m: 0 }
不行，因为useState(0)根本不知道变量n还是m  
2. 把_state做成数组  
比如_state = [0,0]  
好像可以，我们来试试看

优化后代码：

	import React from 'react';
	import ReactDOM from 'react-dom';
	
	// eslint-disable-next-line no-unused-vars
	let _state = [];
	let index = 0;
	
	function myUseState(initialValue) {
	  const currentIndex = index;
	  index += 1;
	  _state[currentIndex] = _state[currentIndex] || initialValue;
	  function setState(newState) {
	    _state[currentIndex] = newState;
	    render();
	  }
	  return [_state[currentIndex], setState];
	}
	
	const render = () => {
	  index = 0;
	  ReactDOM.render(<App />, document.getElementById('root'));
	}
	
	function App() {
	  const [n, setN] = myUseState(0);
	  const [x, setX] = myUseState(0);
	  console.log(n,'n')
	  console.log(x,'x')
	  return (
	    <div className="App">
	      <p>{n}</p>
	      <p>{x}</p>
	      <p>
	        <button onClick={() => setN(n+1)}>加1</button>
	        <button onClick={() => setX(x+1)}>加1</button>
	      </p>
	    </div>
	  );
	}
	
	export default App;




