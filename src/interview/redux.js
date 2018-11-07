

// Action 是一个对象。

// 1: 数据流

// action - dispatch - reducer - store - view 


createStore(reducer, preloadState, enhancer)
// enhancer 通过applymiddlerware 包装过了

enhancer = applyMiddleware(...middleware);
enhancer(createStore)(reducer, preloadState)
 


function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    let store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    //定义storeApi
    let middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chains = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chains)(store.dispatch)

    // 返回的全局的store和dispatch.
    return {
      ...store,
      dispatch
    }
  }
}