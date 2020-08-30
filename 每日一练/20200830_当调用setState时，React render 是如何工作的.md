## 当调用setState时，React render 是如何工作的？

咋们可以将“render”分为两个步骤：

1. 虚拟DOM渲染：当render方法被调用时，它会返回一个新的组件的虚拟DOM结构。当调用setState（）时，render会被再次调用，因为默认情况下shouldComponentUpdate总是返回true，所以默认情况下React是没有优化的。
2. 原生DOM渲染：React只会在虚拟DOM中修改真实DOM节点，而且修改的次数非常少————这是一个很棒的React特性，它优化了真实DOM的变化，使React变得更快。