// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import api from './api/index'
import './assets/styles/reset.css'
import './assets/styles/reorderStyle.css'

Vue.use(ElementUI)

axios.defaults.crossDomain = true
axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    window.sessionStorage.removeItem('user')
  }
  let user = JSON.parse(window.sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
