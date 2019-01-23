// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

import axios from './httpConfig/url_config'
import Vuex from 'vuex'
import store from './vuex/store'
import echarts from 'echarts'
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'

Vue.use(ElementUI)
Vue.use(Vuex);
Vue.use(vueEventCalendar, {locale: 'en'}) //可以设置语言，支持中文和英文

Vue.config.productionTip = false;
Vue.prototype.$axios= axios;
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
