
// function afterLayoutFlush(func) {
//   let rafHandle = undefined
//   let timeoutHandle = undefined

//   const scheduleRAF = rafFunc => () => {
//     if(rafHandle !== undefined) return;

//     rafHandle = requestAnimationFrame(() => {
//       rafHandle = undefined
//       rafFunc()
//     })
//   }
//   const scheduleTimeout = ( timeoutFun ) => {

//     if(timeoutHandle !== undefined) return;

//     timeoutHandle = setTimeout(() => {
//       // clear the handle to signal that the timeout handler has been executed
//       timeoutHandle = undefined
//       timeoutFun() 
//     }, 0)
//   }

//   let wrappedFunc = scheduleTimeout(func)
//   if ( typeof requestAnimationFrame === 'function' ) {
// 		wrappedFunc = scheduleRAF( wrappedFunc );
//   }
  
//   wrappedFunc.cancel = () => {
// 		if ( rafHandle !== undefined ) {
// 			cancelAnimationFrame( rafHandle );
// 			rafHandle = undefined;
// 		}

// 		if ( timeoutHandle !== undefined ) {
// 			clearTimeout( timeoutHandle );
// 			timeoutHandle = undefined;
// 		}
// 	};

// 	return wrappedFunc;
// }

// afterLayoutFlush(() => console.log('after'))
// console.log('12312')





function debounce(func, threshold, execAsap) {
  let timer;

  return function debounced() {
    let self = this

    if(timer) {
      clearTimeout(timer)
    } else if(execAsap){
      func.apply(this, arguments)
    }
    timer = setTimeout(func, threshold || 100)
  }
}


debounce( )