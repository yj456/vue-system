import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home',
      hidden: true
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      hidden: true
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/Home'),
      children: [
        {path: '/echarts', name: 'echarts', component: () => import('@/views/echarts')},
        {path: '/table', name: 'table', component: () => import('@/views/table')}
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
