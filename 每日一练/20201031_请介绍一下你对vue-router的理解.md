## 请介绍一下你对vue-router的理解

vue-router 有 3 种路由模式：hash、history、abstract

1. hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
2. history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
3. abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式

#### hash 模式的实现原理

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

hash 路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

#### history 模式的实现原理

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

    window.history.pushState(null, null, path);
    window.history.replaceState(null, null, path);

history 路由模式的实现主要基于存在下面几个特性：

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

#### 导航钩子函数（导航守卫）

全局守卫

- router.beforeEach 全局前置守卫 进入路由之前
- router.beforeResolve 全局解析守卫(2.5.0+) 在beforeRouteEnter调用之后调用
- router.afterEach 全局后置钩子 进入路由之后

代码

	// main.js 入口文件
	import router from './router'; // 引入路由
	router.beforeEach((to, from, next) => { 
	  next();
	});
	router.beforeResolve((to, from, next) => {
	  next();
	});
	router.afterEach((to, from) => {
	  console.log('afterEach 全局后置钩子');
	});



路由独享的守卫 你可以在路由配置上直接定义 beforeEnter 守卫

	const router = new VueRouter({
	  routes: [
	    {
	      path: '/foo',
	      component: Foo,
	      beforeEnter: (to, from, next) => {
	        // ...
	      }
	    }
	  ]
	})


组件内的守卫 你可以在路由组件内直接定义以下路由导航守卫

	const Foo = {
	  template: `...`,
	  beforeRouteEnter (to, from, next) {
	    // 在渲染该组件的对应路由被 confirm 前调用
	    // 不！能！获取组件实例 `this`
	    // 因为当守卫执行前，组件实例还没被创建
	  },
	  beforeRouteUpdate (to, from, next) {
	    // 在当前路由改变，但是该组件被复用时调用
	    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	    // 可以访问组件实例 `this`
	  },
	  beforeRouteLeave (to, from, next) {
	    // 导航离开该组件的对应路由时调用，我们用它来禁止用户离开
	    // 可以访问组件实例 `this`
	    // 比如还未保存草稿，或者在用户离开前，
	    将setInterval销毁，防止离开之后，定时器还在调用。
	  }
	}