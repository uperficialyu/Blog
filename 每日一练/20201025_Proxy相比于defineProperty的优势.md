## Proxy相比于defineProperty的优势

Object.defineProperty()的问题主要有三个:

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

Proxy在ES2015规范中被正式加入，它有以下几个特点: 

- 针对对象：针对整个对象，而不是对象的某个属性,所以也就不需要对keys进行遍历。这解决了Object.defineProperty0第二个问题
- 支持数组：Proxy不需要对数组的方法进行重载，省去了众多hack, 减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势:

- Proxy的第二个参数可以有13种拦截方法，这比起Object.defineProperty()要更加丰富
- Proxy作为新标准受到浏览器厂商的重点关注和性能优化，相比之下Object.defineProperty()是一个已有的老方法。
