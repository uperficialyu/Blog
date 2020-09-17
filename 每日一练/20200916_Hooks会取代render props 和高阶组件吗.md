#### Hooks会取代 render props 和高阶组件吗？

1. 通常，render props和高阶组件仅渲染一个子组件。React团队认为，Hooks 是服务此用例的更简单方法。
2. 这两种模式仍然有一席之地(例如，一个虚拟的 scroller 组件可能有一个 renderItem prop，或者一个可视化的容器组件可能有它自己的 DOM 结构)。但在大多数情况下，Hooks 就足够了，可以帮助减少树中的嵌套。