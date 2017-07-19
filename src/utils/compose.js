


const compose = (...fns) => params => fns.reduce((p, n) => n(p), params)

const composePromise = ( ...fns ) => params => fns.reduce( ( p, n ) => p.then( result => n( result ) ) , Promise.resolve( params ) );

const listPormise = (...list) => promiseFn => list.reduce( (p, n) => p.then( () => promiseFn( n )), Promise.resolve() )


module.exports = {
  compose,
  composePromise,
  listPormise
}
