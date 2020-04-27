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

