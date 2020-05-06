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

#### useState调用顺序
若第一次渲染时n是第一个，m是第二个，k是第三个  
则第二次渲染时必须保证顺序完全一致  
所以React不允许出现如下代码  

#### useState总结
1. 每个函数组件对应一个React节点
2. 每个节点保存着state和index
3. useState会读取state[index]
4. index由useState出现的顺序决定
5. setState会修改state，
6. 并触发更新
7. 目前的内容其实就这么简单

## useRef

#### n的分身

	import React, { useState } from 'react';
	
	function App() {
	  const [n, setN] = useState(0);
	  const log = () => setTimeout(() => {
	    console.log(`log: ${ n }`);
	  },3000)
	  return (
	    <div>
	      <p>{n}</p>
	      <p>
	        <button onClick={() => setN(n + 1)}>+1</button>
	        <button onClick={log}>log</button>
	      </p>
	    </div>
	  );
	}
	
	export default App;

#### 两种操作
点击+1在点击log 无bug  
点击log再点击+1 有bug  
问题：为什么log出了旧数据?  

如果我需要一个贯穿始终的状态应该怎么做？

1. 全局变量  
window.xxx
2. useRef  
useRef不仅可以在标签上使用，也可以用于各种数据
3. useContest  
useContext不仅贯穿始终，还能贯穿不同组件

使用useRef

	import React, { useState, useRef } from 'react';
	
	function App() {
	  const nRef = useRef(0); // {current: 0}
	  const log = () => setTimeout(() => {
	    console.log(`${nRef.current}`);
	  }, 3000)
	  const update = useState(null)[1];
	
	  return (
	    <div>
	      <p> {nRef.current}这里并不能实时更新</p>
	      <p>
	        <button
	          onClick={() => {
	            nRef.current += 1;
	            update(nRef.current);
	          }}>
	          +1
	      </button>
	        <button onClick={log}>log</button>
	      </p>
	    </div>
	  );
	}
	
	export default App;

使用useContext

	import React, { useContext, useState } from "react";
	
	const themeContext = React.createContext(null);
	
	function App() {
	  const [theme, setTheme] = useState("red");
	  return (
	    <themeContext.Provider value={{ theme, setTheme }}>
	      <div style={{color: theme}}>
	        <p>{theme}</p>
	        <div>
	          <ChildA />
	        </div>
	        <div>
	          <ChildB />
	        </div>
	      </div>
	    </themeContext.Provider>
	  );
	}
	
	function ChildA() {
	  const { setTheme } = useContext(themeContext);
	  return (
	    <div>
	      <button onClick={() => setTheme('red')}>red</button>
	    </div>
	  )
	}
	
	function ChildB() {
	  const { setTheme } = useContext(themeContext);
	  return (
	    <div>
	      <button onClick={() => setTheme('blue')}>blue</button>
	    </div>
	  )
	}
	
	export default App;

## hooks全解

## useState

使用状态

	const [n, setN] = React.useState(0)
	const [user, setUser] = React.useState({name:'F'})

注意1：不可局部更新

如果state是一个对象，能否部分setState?  
不行，因为setState不会帮我们合并属性  
那么useReducer会合并属性吗？也不会!  

	import React, { useState } from "react";
	
	function App() {
	  const [user, setUser] = useState({ name: 'Frank', age: 18 })
	  const onClick = () => {
	    setUser({
	      ...user,
	      name: 'Jack'
	    })
	  };
	
	  return (
	    <div C lassName=" App">
	      <h1>{user.name}</h1>
	      <h2>{user.age}</h2>
	      <button onClick={onClick}>Click</button>
	    </div>
	  );
	}
	
	export default App;

注意2：地址要变  

setState(obj)如果obj地址不变，那么React就认为数据没有变化

useState可以使用函数

	const [state, setState] = useState(()=>{
		return initialState
	})

该函数返回初始state,且只执行一次  
setState接受函数  
setN(i=>i+1)  
什么时候用这种方式？  
如果你能接受这种形式，应该优先使用这种形式  

	import React, { useState } from 'react';
	
	function App() {
	  const [x, setX] = useState( () => (2+2) );
	
	  const click = () => {
	    // setX(x+1)
	    // setX(x+1)
	
	    setX(x => x+1)
	    setX(x => x+1)
	  }
	
	  return (
	    <div>
	      <p>You clicked {x} times</p>
	      <button onClick={click}>
	        Click me
	      </button>
	    </div>
	  );
	}
	
	export default App;

## useReducer

用来践行Flux/Redux的思想，看代码，共分4步走

1. 创建初始值initialState
2. 创建所有操作reducer(state, action)
3. 传给useReducer,得到读和写API
4. 调用写({type:操作类型'})
5. 总得来说useReducer是useState的复杂版

简单的一个useReducer

	import React, { useReducer } from "react";
	
	const initial = {
	  n: 0
	};
	
	const reducer = (state, action) => {
	  if (action.type === 'add') {
	    return { n: state.n + action.number }
	  } else if (action.type === 'multi') {
	    return { n: state.n * 2 }
	  } else {
	    throw new Error('unknow type')
	  }
	}
	
	function App() {
	  const [state, dispatch] = useReducer(reducer, initial);
	  const { n } = state;
	
	  const onClick = () => {
	    dispatch({ type: 'add', number: 1 })
	  };
	  const onClick2 = () => {
	    dispatch({ type: 'add', number: 2 })
	  }
	  const onClick3 = () => {
	    dispatch({ type: 'multi', number: 2 })
	  }
	
	  return (
	    <div>
	      <h1>n: {n}</h1>
	      <button onClick={onClick}>+1</button>
	      <button onClick={onClick2}>+2</button>
	      <button onClick={onClick3}>*2</button>
	    </div>
	  );
	}
	
	export default App;

#### 如何代替Redux
步骤

1. 将数据集中在一个store对象
2. 将所有操作集中在reducer
3. 创建一个Context
4. 创建对数据的读写API
5. 将第四步的内容放到第三步的Context
6. 用Context. Provider将Context提供给所有组件
7. 各个组件用useContext获取读写API

一个简单useReduce代码
	import React, { useReducer, useContext, useEffect, createContext } from 'react';
	
	const store = {
	  user: null,
	  books: null,
	  movies: null 
	};
	
	const reducer = (state, action) => { 
	  switch (action.type) {
	    case 'setUser':
	      return { ...state, user: action.user };
	    case 'setBooks':
	      return { ...state, books: action.books };
	    case 'setMovies':
	      return { ...state, movies: action.movies };
	    default:
	      throw new Error();
	  }
	}
	
	const Context = createContext(null);
	
	function App() {
	  const[state, dispatch] = useReducer(reducer, store);
	
	  return (
	    <Context . Provider value={{state, dispatch}}>
	    <User /> 
	    <hr />
	    <Books />
	    <Movies />
	  </Context.Provider>
	  );
	}
	
	function User() {
	  const { state, dispatch } = useContext(Context);
	  useEffect(() => {
	    ajax("/user").then(user => {
	      dispatch({ type: "setUser", user: user });
	    });
	  }, []);
	
	  return (
	    <div>
	    <h1>个人信息</h1>
	    <div>name: {state.user ? state.user.name : ""}</div> 
	    </div>
	  );
	}
	
	function Books() {
	  const { state, dispatch } = useContext(Context);
	  useEffect(() => {
	  ajax("/books").then(books => {
	    dispatch({ type: "setBooks", books: books });
	  });
	  }, []);
	
	  return (
	    <div> 
	      <h1>我的书籍</h1>
	      <ol>
	        {state.books ? state.books.map(book => <li key={book.id}>{book.name}</li>) : ''}
	      </ol>
	    </div>
	  );
	}
	
	function Movies() {
	  const { state, dispatch } = useContext(Context);
	  useEffect(() => {
	    ajax("/movies").then(movies => {
	      dispatch({ type: "setMovies", movies: movies });
	    });
	  }, []);
	
	  return (
	    <div>
	      <h1>我的电影</h1>
	      <ol>
	        {
	        state.movies
	        ? state.movies.map(movie => <li key={movie.id}>{movie.name}</li>)
	          : '加载中'
	        }
	      </ol>
	    </div>
	  );
	}
	
	export default App;
	  
	function ajax(path) {
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      if (path === "/user") {
	        resolve({
	          id: 1,
	          name: 'Fuck'
	        });
	      } else if (path === '/books') {
	        resolve([
	          {
	            id: 1,
	            name: 'JavaScript高级程序设计'
	          },
	          {
	            id: 2,
	            name: "JavaScript 精粹"
	          }
	        ]);
	      } else if (path === "/movies") {
	        resolve([
	          {
	            id: 1,
	            name: '爱在黎明破晓前'
	          },
	          {
	            id: 2,
	            name: '恋恋笔记本'
	          }
	        ]);
	      }
	    }, 2000);
	  });
	}
 
## useContext
上下文

1. 全局变量是全局的上下文
2. 上下文是局部的全局变量

使用方法

1. 使用C = createContext(initial)创建上下文
2. 使用<C.provider>圈定作用域
3. 在作用域内使用useContext(C)来使用上下文

context的使用：

	import React, { useState, useContext, createContext } from 'react';
	
	const C = createContext(null);
	
	function App() {
	  const [n, setN] = useState(0);
	  return (
	    <C.Provider value={{ n, setN }}>
	      <Baba />
	    </C.Provider>
	  );
	}
	
	function Baba() {
	  return ( 
	    <div>
	      我是爸爸<Child />
	    </div> 
	  );
	}
	
	function Child() {
	  const { n, setN } = useContext(C);
	  const onClick = () => {
	    setN(i => i + 1);
	  };
	
	return (
	  <div>
	    我是儿子我得到的n: {n}
	    <button onClick= {onClick }>+1</button>
	    </div>
	  );
	}
	
	export default App;


useContext注意事项

1. 不是响应式的
2. 你在一个模块将C里面的值改变
3. 另一个模块不会感知到这个变化