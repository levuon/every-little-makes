module.exports = function addCommonParams(params) {
  var qs = merge({
    client: 'web', // 被嵌入客户端，默认为web
    source: 'web', // 流量来源，如wechat，默认为web
    systemtime: new Date().getTime(),

    // 以下为不变字段
    platform: 'web', // 始终为web
    cver: '6.2'
  }, params);

  return qs;
};