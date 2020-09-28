## React 中的 useState() 是什么

下面说明useState(0)的用途

    ...
    const [count, setCounter] = useState(0);
    const [moreStuff, setMoreStuff] = useState(...);
    ...
    const setCount = () => {
        setCounter(count + 1);
        setMoreStuff(...);
        ...
    };

useState 是一个内置的 React Hook。useState(0) 返回一个元组，其中第一个参数count是计数器的当前状态，setCounter 提供更新计数器状态的方法。

咱们可以在任何地方使用setCounter方法更新计数状态-在这种情况下，咱们在setCount函数内部使用它可以做更多的事情，使用 Hooks，能够使咱们的代码保持更多功能，还可以避免过多使用基于类的组件。