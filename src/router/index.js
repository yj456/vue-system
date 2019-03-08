import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login'),
      name: '',
      hidden: true
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/Home'),
      children: []
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
