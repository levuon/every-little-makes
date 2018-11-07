/*
 * 策略模式
 * 
 */
const { log } = require('./utils')

var calculateBonus = function(performancelevel, salary) {
  if(performancelevel == 'S') {
    return salary * 4
  }
  if(performancelevel == 'A') {
    return salary * 3
  }
  if(performancelevel == 'B') {
    return salary * 2
  }
}

log(calculateBonus('B', 20000))
log(calculateBonus('S', 5000))



// javascript 策略模式
var strategy = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary) {
    return salary * 3
  }
}

var calculateBonus = function(level, salary) {
  return strategy[level](salary);
}

// example
var strategies = {
  isNonEmpty: function(val, errorMsg) {
    if(val === '') return errorMsg;
  },
  maxLength: function(val, length, errorMsg) {
    if(val.length < length) return errorMsg
  },
  isMobile: function(val, errorMsg) {
    if(!/^1[3|5|8][0-9]{9}$/.test(val)) return errorMsg
  }
}

var Validator = function () {
  this.cache = []
}

Validator.prototype.add = function(value, rules) {
  // var arr = rule.split(':')
  // this.cache.push(function() {
  //   var strategy = arr.shift()
  //   arr.unshift(value);
  //   arr.push(errorMsg)
  //   return strategies[strategy].apply(null, arr)
  // })  
  var self = this;
  for(var i = 0, rule; rule = rules[i++];) {
    (function(rule){
      var strategyArr = rule.strategy.split(':')
      var errorMsg = rule.errorMsg;
      self.cache.push(function() {
        var strategy = strategyArr.shift()
        strategyArr.unshift(value);
        strategyArr.push(errorMsg)
        return strategies[strategy].apply(null, strategyArr)
      })
    })(rule)
  }
}

Validator.prototype.start = function() {
  for(var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
    var msg = validatorFunc();
    if(msg) {
      return msg;
    }
  }
}

var validatorFunc = function() {
  var validator = new Validator()
  validator.add('liu1322', [{
    strategy: 'isNonEmpty', 
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'maxLength:6', 
    errorMsg: '密码长度不能少于6位'
  }])
  validator.add('1234123', [{
    strategy: 'maxLength:6', 
    errorMsg: '密码长度不能少于6位' 
  }])
  validator.add('18616976515', [{
    strategy: 'isMobile', 
    errorMsg: '手机号码格式不对'
  }])

  var msg = validator.start();
  return msg
}

console.log(validatorFunc())
//