const log = require('./logger')
const State = require('crocks/State')
const Pair = require('crocks/Pair')
const { add, pluralize } = require('./helpers')
// State s a
// (s -> (a,s))

//m:: State Number Number
const m =
  State(state => Pair(state + 1, state))

// 46
// log( m.runWith(45).fst() )  
// 45
// log( m.runWith(45).snd() ) 


// updateValue:: Number -> State Number
const updateValue = x =>
  State(s => Pair(s + x, s))

// log(updateValue(10).runWith(20).snd()) // 20 Pair的初始值 
// log(updateValue(10).runWith(20).fst()) // 30
  
// updateState:: Number -> State Number
const updateState = x =>
  State(s => Pair(s, s + x))

// log(updateState(10).runWith(20).snd()) // 30 Pair的初始值 
// log(updateState(10).runWith(20).fst()) // 20

let getState = () =>
  State(s => Pair(s, s)) 

const makeAwesome = 
  pluralize('Awesome', 'Awesomes')


log(getState()
  .map(add(1))
  .map(makeAwesome)
  .runWith(30)
  .fst()
)