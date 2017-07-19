

module.exports = (...fns) => params =>
  fns.reduce((p, n) => (!!p.then ? p.then(n) : n(p)), params);
