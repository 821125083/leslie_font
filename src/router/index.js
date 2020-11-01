import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import father from '@/components/father'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/father',
      name:'father',
      component:father
    }
  ]
})
