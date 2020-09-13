## React 中 keys 的作用是什么

    render () {
      return (
        <ul>
          {this.state.todoItems.map(({item,i}) => {
            return <li key={i}>{item}</li>
          })}
        </ul>
      )
    }

在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染