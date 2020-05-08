# React基础

## 目录
1. 生命周期

## 生命周期

在 V16 版本中引入了 Fiber 机制。这个机制一定程度上的影响了部分生命周期的调用，并且也引入了新的 2 个 API 来解决问题。
在之前的版本中，如果你拥有一个很复杂的复合组件，然后改动了最上层组件的 state，那么调用栈可能会很长。
 
调用栈过长，再加上中间进行了复杂的操作，就可能导致长时间阻塞主线程，带来不好的用户体验。Fiber 就是为了解决该问题而生。

Fiber 本质上是一个虚拟的堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染，在不影响体验的情况下去分段计算更新。

对于异步渲染，现在渲染有两个阶段：reconciliation 和 commit 。前者过程是可以打断的，后者不能暂停，会一直更新界面直到完成。

Reconciliation 阶段

1. componentWillMount
2. componentWillReceiveProps
3. shouldComponentUpdate
4. componentWillUpdate

Commit 阶段

1. componentDidMount
2. componentDidUpdate
3. componentWillUnmount

##### componentWillMount
组件即将被渲染到页面之前触发，此时可以进行开启定时器、向服务器发送请求等操作

##### componentWillReceiveProps
组件接收到属性时触发

##### shouldComponentUpdate
当组件接收到新属性，或者组件的状态发生改变时触发。组件首次渲染时并不会触发

##### componentWillUpdate
组件即将被更新时触发

##### componentDidMount
组件已经被渲染到页面中后触发：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作

##### componentDidUpdate
组件被更新完成后触发。页面中产生了新的DOM的元素，可以进行DOM操作

##### componentWillUnmount
组件被销毁时触发。这里我们可以进行一些清理操作，例如清理定时器，取消Redux的订阅事件等等。

## setState

setState 在 React 中是经常使用的一个 API，核心原因就是因为这个 API 是异步的。

首先 setState 的调用并不会马上引起 state 的改变，并且如果你一次调用了多个 setState ，那么结果可能并不如你期待的一样。

	handle() {
	  // 初始化 `count` 为 0
	  console.log(this.state.count) // -> 0
	  this.setState({ count: this.state.count + 1 })
	  this.setState({ count: this.state.count + 1 })
	  this.setState({ count: this.state.count + 1 })
	  console.log(this.state.count) // -> 0
	}

第一，两次的打印都为 0，因为 setState 是个异步 API，只有同步代码运行完毕才会执行。setState 异步的原因我认为在于，setState 可能会导致 DOM 的重绘，如果调用一次就马上去进行重绘，那么调用多次就会造成不必要的性能损失。设计成异步的话，就可以将多次调用放入一个队列中，在恰当的时候统一进行更新过程。

第二，虽然调用了三次 setState ，但是 count 的值还是为 1。因为多次调用会合并为一次，只有当更新结束后 state 才会改变，三次调用等同于如下代码：

	Object.assign(  
	  {},
	  { count: this.state.count + 1 },
	  { count: this.state.count + 1 },
	  { count: this.state.count + 1 },
	)

当然你也可以通过以下方式来实现调用三次 setState 使得 count 为 3
	
	handle() {
	  this.setState((prevState) => ({ count: prevState.count + 1 }))
	  this.setState((prevState) => ({ count: prevState.count + 1 }))
	  this.setState((prevState) => ({ count: prevState.count + 1 }))
	}

如果你想在每次调用 setState 后获得正确的 state ，可以通过如下代码实现

	handle() {
	    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
	        console.log(this.state)
	    })
	}