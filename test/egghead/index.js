require('babel-core/register');

import reduce from 'lodash/reduce'
import inRange from 'lodash/inRange'




function getSize(){
  const SIZES = {
    'sm': inRange(700, 0, 639),
    'm': inRange(700, 640, 1023),
    'l': inRange(700, 1024, 1250),
    'xl': inRange(700, 1250, Number.POSITIVE_INFINITY),
    'ns': inRange(700, 640, Number.POSITIVE_INFINITY)
  }

  return reduce(SIZES, (result, value, key) => {
    if (value){
      result = [...result, key]
    }
    return result
  }, [])
}
console.log(getSize());
