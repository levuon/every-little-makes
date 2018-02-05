var SUPPORTED_DATE_LEN = {
 3: 'Year:Month:Day',
 5: 'Year:Month:Day Hour:Minutes',
 6: 'Year:Month:Day Hour:Minutes:Seconds'
};

var ONE_DAY = 24 * 3600 * 1000;

/**
* 确保入参是 是Date类型
* @param {*} input 
*/
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

var output = {
 /**
  * @argument 
  * @return Date
  */
 parse: function(inputDate) {
   return ensureDate(inputDate);
 },

 /**
  * 
  */
 formatDate: function(inputDate, isFull, separator) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   var output = [];

   if (isFull) {
     output.push(inputDate.getFullYear());
   }

   var month = (inputDate.getMonth() + 1);
   output.push((month < 10) ? '0' + month : month);

   var date = inputDate.getDate();
   output.push((date < 10) ? '0' + date : date);

   return output.join(separator || '-');
 },

 formatDatetime: function (inputDate, isFull) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   return this.formatDate(inputDate, isFull) + ' ' + this.formatTime(inputDate, isFull);
 },

 formatLocalDate: function(inputDate, isFull) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   var output = [];

   if (isFull) {
     output.push(inputDate.getFullYear());
     output.push('年');
   }

   output.push(inputDate.getMonth() + 1);
   output.push('月');

   output.push(inputDate.getDate());
   output.push('日');

   return output.join('');
 },

 formatLocalDateWithWeek: function(inputDate, isFull) {
   return [
     this.formatLocalDate(inputDate, isFull),
     '(', this.formatWeek(inputDate), ')',
   ].join('');
 },

 formatLocalDatetime: function(inputDate) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   return this.formatLocalDateWithWeek(inputDate) + ' ' + this.formatTime(inputDate);
 },

 formatWeek: function(inputDate, isShort) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   var weekStr = ['日', '一', '二', '三', '四', '五', '六'];
   var now = new Date();

   if (inputDate.getFullYear() === now.getFullYear() && inputDate.getMonth() === now.getMonth() && inputDate.getDate() === now.getDate()) {
     return '今天';
   } else {
     return (isShort ? '周' : '星期') + weekStr[inputDate.getDay()];
   }
 },

 formatDay: function(inputDate) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   return inputDate.getDate();
 },

 formatTime: function(inputDate, addSeconds) {
   inputDate = ensureDate(inputDate);

   if (!inputDate) {
     return '';
   }

   var output = [];
   var hours = inputDate.getHours();
   output.push((hours < 10) ? '0' + hours : hours);

   var minutes = inputDate.getMinutes();
   output.push((minutes < 10) ? '0' + minutes : minutes);

   if (addSeconds) {
     var seconds = inputDate.getSeconds();
     output.push((seconds < 10) ? '0' + seconds : seconds);
   }

   return output.join(':');
 },

 caculateDuration: function(startDatetime, endDatetime) {
   startDatetime = ensureDate(startDatetime);
   endDatetime = ensureDate(endDatetime);

   if (!startDatetime || !endDatetime) {
     return '';
   }

   var diffDatetime = new Date(endDatetime - startDatetime);
   var diffDate = diffDatetime.getUTCDate() - 1;
   var diffHour = diffDatetime.getUTCHours();
   var diffMinutes = diffDatetime.getUTCMinutes();

   diffHour = diffHour + diffDate * 24;

   var duration = diffHour ? diffHour + '小时' : '';
   duration += diffMinutes ? diffMinutes + '分钟' : '';

   return duration;
 },
 getMonthName: function(month) {
   var _month = Number(month);
   if (isNaN(_month) || (_month < 1 || _month > 12)) {
     return '';
   }
   var monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
   return monthNames[_month - 1];
 },

 //日期对比
 compareDay: function(left, right) {
   return this.compare(left, right, 'date');
 },

 //option: 'date' | 'time'
 compare: function(left, right, option) {
   var leftDate = ensureDate(left),
       rightDate = ensureDate(right);
   if (!leftDate || !rightDate) return null;

   if (option === 'date' || option === 'd') {
     leftDate.setHours(0, 0, 0, 0);
     rightDate.setHours(0, 0, 0, 0);
   }
   return leftDate.getTime() - rightDate.getTime();
 },

 diffDay: function(left, right) {
   var leftDate = ensureDate(left),
       rightDate = ensureDate(right);

   return Math.ceil((rightDate - leftDate) / ONE_DAY);
 },

 datetimeTillNow: function(inputDate) {
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
 },

 dealDateTillNow: function (inputDate) {
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
     return diffHour >= 12 ? '半天前更新' : `${ diffHour }小时前更新`;
   } else if ( diffMinutes ) {
     return diffMinutes >= 30 ? '半小时前更新' : diffMinutes < 10 ? '刚刚更新' : `${ diffMinutes }分钟前更新`;
   }else {
     return '刚刚更新';
   }
 }
};

module.exports = output;
