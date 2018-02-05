const datetime = require('./datetime');

console.log(new Date());

console.log(datetime.formatDate(new Date()));
console.log(datetime.formatDate(new Date(), true));
console.log(datetime.formatDate(new Date(), false, '/'));




console.log(datetime.formatDatetime(new Date()));
console.log(datetime.formatDatetime(new Date(), true));

console.log(datetime.formatLocalDate(new Date(), false));
console.log(datetime.formatLocalDate(new Date(), true));


console.log(datetime.formatLocalDateWithWeek('2017-11-20', true))
console.log(datetime.formatLocalDateWithWeek(new Date(), true));


console.log(datetime.formatLocalDatetime('2017-11-20 12:00'))
console.log(datetime.formatLocalDatetime(new Date()));


console.log(datetime.formatWeek('2017-11-20'));
console.log(datetime.formatWeek('2017-11-20', true));

console.log(datetime.formatDay('2017-11-20'));
console.log(datetime.formatDay(1511418625473));


console.log(datetime.formatTime('2017-11-20'));
console.log(datetime.formatTime(new Date()));
console.log(datetime.formatTime(1511418625473));

console.log(datetime.formatTime('2017-11-20', true));
console.log(datetime.formatTime(new Date(), true));
console.log(datetime.formatTime(1511418625473, true));




console.log(datetime.diffDay('2017-11-20', '2017-11-23'));

