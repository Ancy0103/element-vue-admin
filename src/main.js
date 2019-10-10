import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
// ui组件库
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
// http请求
import axios from 'axios';
import VueAxios from 'vue-axios';
// 全局过滤器
import './filter/vuefilter';
// 挂载moment
import moment from 'moment';
Vue.prototype.$moment = moment;//赋值使用

Vue.config.productionTip = false;
// 全局axios
Vue.use(VueAxios, axios);
// 全局element
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
