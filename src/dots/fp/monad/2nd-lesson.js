const {get, put} = require('crocks/State')
const Pair = require('crocks/Pair')
const Unit = require('crocks/Unit')
const {buggers, tacos} = require('./data')
const log = require('./logger')
const prop = require('crocks/Maybe/prop')
const option = require('crocks/pointfree/option')
const compose = require('crocks/helpers/compose')

// getBuggers:: State Object (Maybe a) const getBuggers =   get(prop('buggers'))
//     .map(option(0)) defaultProps:: (String, a) -> Object -> b
const defaultProps = (key, def) => compose(option(def), prop(key))

const getBuggers = get(defaultProps('buggers', 0))

log(getBuggers.evalWith(tacos))

// reset:: () -> State String()
const reset = () => put('liuhuan')
//
log(reset().execWith('Evergreen'))

const state = {
  bubbles: 42
}

//modifyState:: (s -> s) -> State s()
const modifyState = fn =>
  {}
