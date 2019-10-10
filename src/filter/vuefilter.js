// 这里写一些全局的过滤器
import Vue from 'vue';
import moment from 'moment';

// 全局过滤器 过滤时间戳(method里不太好用，method直接用moment转吧)
Vue.filter('dateFormat', function (dataStr, format = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(format);
  } else {
    return dataStr;
  }
});