import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.use(ElementUI)
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/index.css'
import router from './router'
import store from './store'
import utils from './assets/js/utils'
Vue.prototype.$http = utils;
import fastclick from 'fastclick';
import moment from 'moment';
import sitenav from '@/common/sitenav'
Vue.component('sitenav',sitenav)
moment.locale('en', {
  weekdays : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
});
Vue.prototype.$moment = moment; //赋值使用
Vue.prototype.axios = axios; //赋值使用
Vue.config.productionTip = false
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router, 
  components: { App },
  template: '<App/>'
})
