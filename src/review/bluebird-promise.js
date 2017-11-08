const BPromise = require('bluebird');

let actions = [{
  name: 'start',
  time: 1000
}, {
  name: 'first',
  time: 4000
}];

function executeActions(actions) {
  return BPromise.each(actions, (task) => {
    return handleTask(task);
  });
}

function handleTask(task) {
  return new Promise( (resovle, reject) => {
    setTimeout(() => {
      console.log(task);
      resovle(task)
    }, task.time)
  })
}

executeActions(actions)
  // .then(res => console.log(res));