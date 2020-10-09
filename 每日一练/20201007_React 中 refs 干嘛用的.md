## React 中 refs 干嘛用的

Refs 提供了一种访问在render方法中创建的 DOM 节点或者 React 元素的方法。在典型的数据流中，props 是父子组件交互的唯一方式，想要修改子组件，需要使用新的pros重新渲染它。凡事有例外，某些情况下咱们需要在典型数据流外，强制修改子代，这个时候可以使用 Refs。

咱们可以在组件添加一个 ref 属性来使用，该属性的值是一个回调函数，接收作为其第一个参数的底层 DOM 元素或组件的挂载实例。

    class UnControlledForm extends Component {
      handleSubmit = () => {
        console.log("Input Value: ", this.input.value)
      }
      render () {
        return (
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              ref={(input) => this.input = input} />
            <button type='submit'>Submit</button>
          </form>
        )
      }
    }

请注意，input 元素有一个ref属性，它的值是一个函数。该函数接收输入的实际 DOM 元素，然后将其放在实例上，这样就可以在 handleSubmit 函数内部访问它。

经常被误解的只有在类组件中才能使用 refs，但是refs也可以通过利用 JS 中的闭包与函数组件一起使用。

    function CustomForm ({handleSubmit}) {
      let inputElement
      return (
        <form onSubmit={() => handleSubmit(inputElement.value)}>
          <input
            type='text'
            ref={(input) => inputElement = input} />
          <button type='submit'>Submit</button>
        </form>
      )
    }