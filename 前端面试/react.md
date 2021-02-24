## 目录

1. React的请求应该放在哪个⽣命周期中
2. jsx的本质是什么
3. React组件通信如何实现
4. React最新的⽣命周期是怎样的
5. setState到底是异步还是同步
6. React中keys的作用是什么
7. 受控组件和非受控组件区别是啥
8. 如何避免组件的重新渲染
9. 谈一下你对fiber的理解
10. 什么是高阶组件
11. 虚拟DOM是什么
12. 讲下redux的⼯作流程
13. react-redux是如何⼯作的
14. redux与mobx的区别
15. redux中如何进⾏异步操作
16. redux异步中间件之间的优劣

#### 1、React的请求应该放在哪个⽣命周期中？

React的异步请求到底应该放在哪个⽣命周期⾥，有⼈认为在componentWillMount中可以提前进⾏异步请求，避免⽩屏，其实这个观点是有问题的。

由于JavaScript中异步事件的性质，当您启动API调⽤时，浏览器会在此期间返回执⾏其他⼯作。当React渲染⼀个组件时，它不会等待componentWillMount它完成任何事情。React继续前进并继续render，没有办法“暂停”渲染以等待数据到达。

⽽且在componentWillMount请求会有⼀系列潜在的问题。⾸先，在服务器渲染时，如果在componentWillMount⾥获取数据，fetch data会执⾏两次，⼀次在服务端⼀次在客户端，这造成了多余的请求。其次，在React 16进⾏React Fiber重写后, componentWillMount可能在⼀次渲染中多次调⽤。

⽬前官⽅推荐的异步请求是在componentDidmount中进⾏。如果有特殊需求需要提前请求，也可以在特殊情况下在constructor中请求。react 17之后componentWillMount会被废弃，仅仅保留UNSAFE_componentWillMount。

#### 2、jsx的本质是什么？

首先了解下jsx是什么

1. JSX是一种JavaScript的语法扩展（eXtension），也在很多地方称之为JavaScript XML，因为看起就是一段XML语法；
2. 它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用；
3. 它不同于Vue中的模块语法，你不需要专门学习模块语法中的一些指令（比如v-for、v-if、v-else、v-bind）。

JSX其实是嵌入到JavaScript中的一种结构语法。

实际上，jsx仅仅只是React.createElement(component, props, ...children)函数的语法糖。所有的jsx最终都会被转换成React.createElement的函数调用。

createElement需要传递三个参数

参数一：type
- 当前ReactElement的类型；
- 如果是标签元素，那么就使用字符串表示 “div”；
- 如果是组件元素，那么就直接使用组件的名称；

参数二：config
- 所有jsx中的属性都在config中以对象的属性和值的形式存储

参数三：children
- 存放在标签中的内容，以children数组的方式进行存储； 
- 当然，如果是多个元素呢？React内部有对它们进行处理，处理的源码在下方

#### 3、React组件通信如何实现？

React组件间通信⽅式:

- ⽗组件向⼦组件通讯：⽗组件可以向⼦组件通过传props 的⽅式，向⼦组件进⾏通讯；
- ⼦组件向⽗组件通讯：props+回调的⽅式，⽗组件向⼦组件传递props进⾏通讯，此props为作⽤域为⽗组件⾃身的函数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中；
- 兄弟组件通信：找到这两个兄弟节点共同的⽗节点，结合上⾯两种⽅式由⽗节点转发信息进⾏通信；
- 跨层级通信：Context设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤户、主题或⾸选语⾔，对于跨越多层的全局数据通过 Context通信再适合不过；
- 发布订阅模式：发布者发布事件，订阅者监听事件并做出反应，我们可以通过引⼊event模块进⾏通信；
- 全局状态管理⼯具：借助Redux或者Mobx等全局状态管理⼯具进⾏通信，这种⼯具会维护⼀个全局状态中⼼Store，并根据不同的事件产⽣新的状态。

#### 4、React最新的⽣命周期是怎样的？

React 16之后有三个⽣命周期被废弃(但并未删除)

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

官⽅计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，⽬的是为了向下兼容，但是对于开发者⽽⾔应该尽量避免使⽤他们，⽽是使⽤新增的⽣命周期函数替代它们。

⽬前React16.8+的⽣命周期分为三个阶段，分别是挂载阶段、更新阶段、卸载阶段。

挂载阶段：

- constructor：构造函数，最先被执⾏，我们通常在构造函数⾥初始化state对象或者给⾃定义⽅法绑定this；
- getDerivedStateFromProps：static getDerivedStateFromProps(nextProps, prevState)，这是个静态⽅法，当我们接收到新的属性想去修改我们state， 可以使⽤getDerivedStateFromProps
- render：render函数是纯函数，只返回需要渲染的东⻄，不应该包含其它的业务逻辑，可以返回原⽣的DOM、React组件、Fragment、Portals、字符串和数字、 Boolean和null等内容；
- componentDidMount：组件装载之后调⽤，此时我们可以获取到DOM节点并操作，⽐如对canvas，svg的操作，服务器请求，订阅都可以写在这个⾥⾯，但是记得在componentWillUnmount中取消订阅；

更新阶段：

- getDerivedStateFromProps: 此⽅法在更新个挂载阶段都可能会调⽤；
- shouldComponentUpdate：shouldComponentUpdate(nextProps, nextState)，有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回⼀个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true，我们通常利⽤此⽣命周期来优化React程序性能；
- render：更新阶段也会触发此⽣命周期；
- getSnapshotBeforeUpdate：getSnapshotBeforeUpdate(prevProps, prevState),这个⽅法在render之后，componentDidUpdate之前调⽤，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有⼀个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此⽣命周期必须与componentDidUpdate搭配使⽤；
- componentDidUpdate：componentDidUpdate(prevProps, prevState, snapshot)，该⽅法在getSnapshotBeforeUpdate⽅法之后被调⽤，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的，如果触发某些回调函数时需要⽤到DOM元素的状态，则将对⽐或计算的过程迁移⾄getSnapshotBeforeUpdate，然后在componentDidUpdate中统⼀触发回调或更新状态。

卸载阶段:

-componentWillUnmount：当我们的组件被卸载或者销毁了就会调⽤，我们可以在这个函数⾥去清除⼀些定时器，取消⽹络请求，清理⽆效的DOM元素等垃圾清理⼯作。

总结：

- componentWillMount：在渲染之前执行，用于根组件中的 App 级配置；
- componentDidMount：在第一次渲染之后执行，可以在这里做AJAX请求，DOM的操作或状态更新以及设置事件监听器；
- componentWillReceiveProps：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
- shouldComponentUpdate：确定是否更新组件。默认情况下，它返回true。如果确定在state或props更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法；
- componentWillUpdate：在shouldComponentUpdate返回true确定要更新组件之前件之前执行；
- componentDidUpdate：它主要用于更新DOM以响应props或state更改；
- componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。

#### 5、setState到底是异步还是同步？

先给出答案: 有时表现出异步，有时表现出同步。

- setState只在合成事件和钩⼦函数中是“异步”的，在原⽣事件和setTimeout中都是同步的；
- setState的“异步”并不是说内部由异步代码实现，其实本身执⾏的过程和代码都是同步的，只是合成事件和钩⼦函数的调⽤顺序在更新之前，导致在合成事件和钩⼦函数中没法⽴⻢拿到更新后的值，形成了所谓的“异步”，当然可以通过第⼆个参数setState(partialState, callback)中的callback拿到更新后的结果；
- setState的批量更新优化也是建⽴在“异步”（合成事件、钩⼦函数）之上的，在原⽣事件和setTimeout中不会批量更新，在“异步”中如果对同⼀个值进⾏多次 setState，setState的批量更新策略会对其进⾏覆盖，取最后⼀次的执⾏，如果是同时setState多个不同的值，在更新时会对其进⾏合并批量更新。

#### 6、React中keys的作用是什么？

  ```javascript
  render () {
    return (
      <ul>
        {this.state.todoItems.map(({item,i}) => {
          return <li key={i}>{item}</li>
        })}
      </ul>
    )
  }
  ```

在React Diff算法中React会借助元素的Key值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。

#### 7、受控组件和非受控组件区别是啥？

- 受控组件是React控制中的组件，并且是表单数据真实的唯一来源。
- 非受控组件是由DOM处理表单数据的地方，而不是在 React 组件中。

尽管非受控组件通常更易于实现，因为只需使用refs即可从DOM中获取值，但通常建议优先选择受控制的组件，而不是非受控制的组件。

这样做的主要原因是受控组件支持即时字段验证，允许有条件地禁用/启用按钮，强制输入格式。

#### 8、如何避免组件的重新渲染？

React中最常见的问题之一是组件不必要地重新渲染。React提供了两个方法，在这些情况下非常有用：

- React.memo()：这可以防止不必要地重新渲染函数组件；
- PureComponent：这可以防止不必要地重新渲染类组件。

这两种方法都依赖于对传递给组件的props的浅比较，如果props没有改变，那么组件将不会重新渲染。虽然这两种工具都非常有用，但是浅比较会带来额外的性能损失，因此如果使用不当，这两种方法都会对性能产生负面影响。

通过使用React Profiler，可以在使用这些方法前后对性能进行测量，从而确保通过进行给定的更改来实际改进性能。

#### 9、谈一下你对fiber的理解？

参考：https://juejin.cn/post/6844903582622285831

简单的来说就是，react的渲染和更新分为两个阶段：

- reconciliation阶段：执行diff算法，纯JS计算；
- commit阶段：将diff结果渲染DOM。

但是这么操作，可能会造成性能问题，比如：

- JS是单线程，且和DOM渲染共用一个线程；
- 当组件足够复杂，组件更新时计算和渲染都压力大；
- 同时再有DOM操作需求(动画，鼠标拖拽等)，将卡顿。

解决方案fiber：

- 将reconciliation阶段进行任务拆分（commit无法拆分）；
- DOM需要渲染时暂停，空闲时恢复；
- window.requestIdleCallback（方法将在浏览器的空闲时段内对要调用的函数进行排队）

#### 10、什么是高阶组件？

高阶组件(HOC)是接受一个组件并返回一个新组件的函数。基本上，这是一个模式，是从React的组合特性中衍生出来的，称其为纯组件，因为它们可以接受任何动态提供的子组件，但不会修改或复制输入组件中的任何行为。

  ```javascript
  const EnhancedComponent = higherOrderComponent(WrappedComponent);
  ```

HOC 可以用于以下许多用例：

1. 代码重用、逻辑和引导抽象
2. 渲染劫持
3. state抽象和操作
4. props处理

#### 11、虚拟DOM是什么？

虚拟DOM本质就是用一个原生的JavaScript对象去描述一个DOM节点，是对真实DOM的一层抽象。

真实DOM节点：

  ```html
  <div id="container">
    <ul>
      <li></li>
    </ul>
  </div>
  ```

JS模拟虚拟DOM：

  ```javascript
  const tree = Element('div', { id: 'container' }, {
    Element('ul', {}, [
      Element('li', {}, ['新节点值'])
    ]),
  });

  const root = tree.render();
  document.querySelector('#container').appendChild(root);
  ```

可以看到虚拟DOM对象最基本的三个属性：

- 标签类型
- 标签元素的属性
- 标签元素的子节点

#### 12、讲下redux的⼯作流程？

⾸先，我们看下⼏个核⼼概念：

- Store：保存数据的地⽅，你可以把它看成⼀个容器，整个应⽤只能有⼀个Store；
- State：Store对象包含所有数据，如果想得到某个时点的数据，就要对Store⽣成快照，这种时点的数据集合，就叫State；
- Action： State的变化，会导致View的变化。但是，⽤户接触不到State，只能接触到View。所以，State的变化必须是View导致的。Action就是View发出的通知，表示State应该要发⽣变化了；
- Action Creator：View要发送多少种消息，就会有多少种Action。如果都⼿写，会很麻烦，所以我们定义⼀个函数来⽣成Action，这个函数就叫Action Creator；
- Reducer：Store收到Action以后，必须给出⼀个新的State，这样View才会发⽣变化。这种State的计算过程就叫做Reducer。Reducer是⼀个函数，它接受Action和当前State作为参数，返回⼀个新的State；
- dispatch：是View发出Action的唯⼀⽅法。

然后我们过下整个⼯作流程：

1. ⾸先，⽤户（通过View）发出Action，发出⽅式就⽤到了dispatch⽅法；
2. 然后，Store⾃动调⽤Reducer，并且传⼊两个参数：当前State和收到的Action，Reducer会返回新的State；
3. State⼀旦有变化，Store就会调⽤监听函数，来更新View。

到这⼉为⽌，⼀次⽤户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种⽅式保证了流程的清晰。

#### 13、react-redux是如何⼯作的？

- Provider: Provider的作⽤是从最外部封装了整个应⽤，并向connect模块传递store
- connect: 负责连接React和Redux
  - 获取state: connect通过context获取Provider中的store， 通过store.getState()获取整个store tree 上所有state
  - 包装原组件: 将state和action通过props的⽅式传⼊到原组件内部wrapWithConnect返回⼀个ReactComponent对象Connect，Connect重新render外部传⼊的原组件WrappedComponent，并把connect中传⼊的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的⽅式传给WrappedComponent
  - 监听store tree变化: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进⾏⽐较，从⽽确定是否调⽤ this.setState() ⽅法触发Connect及其⼦组件的重新渲染

#### 14、redux与mobx的区别？

两者对⽐：

- redux将数据保存在单⼀的store中，mobx将数据保存在分散的多个store中
- redux使⽤plain object保存数据，需要⼿动处理变化后的操作；mobx适⽤observable保存数据，数据变化后⾃动处理响应的操作
- redux使⽤不可变状态，这意味着状态是只读的，不能直接去修改它，⽽是应该返回⼀个新的状态，同时使⽤纯函数；mobx中的状态是可变的，可以直接对其进⾏修改
mobx相对来说⽐较简单，在其中有很多的抽象，mobx更多的使⽤⾯向对象的编程思维；redux会⽐较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助⼀系列的中间件来处理异步和副作⽤
- mobx中有更多的抽象和封装，调试会⽐较困难，同时结果也难以预测；⽽redux提供能够进⾏时间回溯的开发⼯具，同时其纯函数以及更少的抽象，让调试变得更加的容易

场景辨析：

- 基于以上区别，我们可以简单得分析⼀下两者的不同使⽤场景。
- mobx更适合数据不复杂的应⽤：mobx难以调试，很多状态⽆法回溯，⾯对复杂度⾼的应⽤时，往往⼒不从⼼。
- redux适合有回溯需求的应⽤：⽐如⼀个画板应⽤、⼀个表格应⽤，很多时候需要撤销、重做等操作，由于redux不可变的特性，天然⽀持这些操作。
- mobx适合短平快的项⽬：mobx上⼿简单，样板代码少，可以很⼤程度上提⾼开发效率。
- 当然mobx和redux也并不⼀定是⾮此即彼的关系，你也可以在项⽬中⽤redux作为全局状态管理，⽤mobx作为组件局部状态管理器来⽤。

#### 15、redux中如何进⾏异步操作？

- 当然，我们可以在componentDidmount中直接进⾏请求⽆须借助redux。
- 但是在⼀定规模的项⽬中，上述⽅法很难进⾏异步流的管理，通常情况下我们会借助redux的异步中间件进⾏异步处理。
- redux异步流中间件其实有很多，但是当下主流的异步中间件只有两种redux-thunk、redux-saga，当然redux-observable可能也有资格占据⼀席之地，其余的异步中间件不管是社区活跃度还是npm下载量都⽐较差了。

#### 16、redux异步中间件之间的优劣？

redux-thunk优点：

- 体积⼩：redux-thunk的实现⽅式很简单，只有不到20⾏代码；
- 使⽤简单：redux-thunk没有引⼊像redux-saga或者redux-observable额外的范式，上⼿简单。

redux-thunk缺陷：

- 样板代码过多：与redux本身⼀样，通常⼀个请求需要⼤量的代码，⽽且很多都是重复性质的；
- 耦合严重：异步操作与redux的action偶合在⼀起，不⽅便管理；
- 功能孱弱：有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装。

redux-saga优点：

- 异步解耦：异步操作被被转移到单独saga.js中，不再是掺杂在action.js或component.js中；
- action摆脱thunk function: dispatch的参数依然是⼀个纯粹的 action (FSA)，⽽不是充满 “⿊魔法” thunk function；
- 异常处理：受益于 generator function 的saga实现，代码异常/请求失败都可以直接通过try/catch语法直接捕获处理；
- 功能强⼤：redux-saga提供了⼤量的Saga辅助函数和Effect创建器供开发者使⽤，开发者⽆须封装或者简单封装即可使⽤；
- 灵活：redux-saga可以将多个Saga可以串⾏/并⾏组合起来，形成⼀个⾮常实⽤的异步flow；
- 易测试，提供了各种case的测试⽅案，包括mock task，分⽀覆盖等等。

redux-saga缺陷：

- 额外的学习成本：redux-saga不仅在使⽤难以理解的generator function，⽽且有数⼗个API，学习成本远超reduxthunk，最重要的是你的额外学习成本是只服务于这个库的，与redux-observable不同，redux-observable虽然也有额外学习成本但是背后是rxjs和⼀整套思想；
- 体积庞⼤：体积略⼤，代码近2000⾏，min版25KB左右；
- 功能过剩：实际上并发控制等功能很难⽤到，但是我们依然需要引⼊这些代码；
- ts⽀持不友好：yield⽆法返回TS类型。

redux-observable优点：

- 功能最强：由于背靠rxjs这个强⼤的响应式编程的库，借助rxjs的操作符，你可以⼏乎做任何你能想到的异步处理；
- 背靠rxjs：由于有rxjs的加持，如果你已经学习了rxjs，redux-observable的学习成本并不⾼，⽽且随着rxjs的升级reduxobservable也会变得更强⼤。

redux-observable缺陷：

- 学习成本奇⾼：如果你不会rxjs，则需要额外学习两个复杂的库；
- 社区⼀般：redux-observable的下载量只有redux-saga的1/5，社区也不够活跃，在复杂异步流中间件这个层⾯reduxsaga仍处于领导地位。
