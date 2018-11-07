var SUPPORTED_DATE_LEN = {
  3: 'Year:Month:Day',
  5: 'Year:Month:Day Hour:Minutes',
  6: 'Year:Month:Day Hour:Minutes:Seconds'
};

var ONE_DAY = 24 * 3600 * 1000;
function ensureDate(input) {
  if (typeof input == 'number') {
    var date = new Date();
    date.setTime(input);
    return date;
  } else if (typeof input == 'string') {
    var parts = input.split(/[- :\/]/);
    if (parts.length in SUPPORTED_DATE_LEN) {
      return new Date(parts[0], parts[1] - 1, parts[2],
                      parts[3] || '', parts[4] || '', parts[5] || '');
    }
    return null;
  } else if (input instanceof Date) {
    return input;
  }
}


function datetimeTillNow(inputDate) {
  var inputDatetime = ensureDate(inputDate);

  if (!inputDatetime) {
    return '';
  }

  var nowDatetime = new Date();
  var diffDatetime = new Date(nowDatetime - inputDatetime);
  var diffMinutes = diffDatetime.getUTCMinutes();
  var diffHour = diffDatetime.getUTCHours();
  var diffDate = diffDatetime.getUTCDate() - 1;
  var diffMonth = Math.floor(diffDate / 30);

  if (diffMonth) {
    return diffMonth + '个月以前';
  } else if (diffDate) {
    return diffDate + '天以前';
  } else if (diffHour) {
    return diffHour + '小时以前';
  } else if (diffMinutes) {
    return diffMinutes + '分钟以前';
  } else {
    return '刚刚';
  }
}

function dealDateTillNow(inputDate) {
  let inputDatetime = ensureDate(inputDate);

  if (!inputDatetime) {
    return inputDate || '';
  }
  let nowDatetime = new Date(),
   diffDatetime = new Date(nowDatetime - inputDatetime),

   diffMinutes = diffDatetime.getUTCMinutes(),
   diffHour = diffDatetime.getUTCHours(),
   diffDate = diffDatetime.getUTCDate() - 1,
   diffMonth = Math.floor(diffDate / 30);

  if( diffMonth ) {
    return diffMonth > 12 ? `${ Math.floor( diffMonth / 12 ) }年前更新` : `${ diffMonth }个月前更新`;
  } else if ( diffDate ) {
    return `${ diffDate }天前更新`;
  } else if ( diffHour ) {
    return diffHour >= 12 ? `半天前更新` : `${ diffHour }小时前更新`;
  } else if ( diffMinutes ) {
    return diffMinutes >= 30 ? `半小时前更新` : diffMinutes < 10 ? `刚刚更新` : `${ diffMinutes }分钟前更新`;
  }else {
    return '刚刚更新';
  }
}
console.log(dealDateTillNow('2018-03-16 10:46'))
