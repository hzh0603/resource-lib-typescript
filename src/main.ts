import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引用通用组件
import './components'
// 引入全局指令
import './directives'
import './assets/style/global.less'
import './assets/style/iconfont/iconfont.css'
import './assets/style/iconfont/iconfont.js'
import './assets/style/icon.less'
import 'viewerjs/src/css/viewer.scss'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
