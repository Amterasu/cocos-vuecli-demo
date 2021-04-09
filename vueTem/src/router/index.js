import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/views/editor/editor').default,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/views/editor/editor').default,
      meta: {
        requireAuth: true
      }
    }
  ]
})
