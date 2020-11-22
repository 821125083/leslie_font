import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import aboard from '@/components/aboard'
import father from '@/components/father'
import maps from '@/components/maps'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cn',
      name: 'index',
      component: index
    },
    {
      path:'/aboard',
      name:'aboard',
      component:aboard
    },
    {
      path:'/father',
      name:'father',
      component:father
    },
    {
      path:'/',
      name:'father',
      component:father
    },
    {
      path:'/test',
      name:'test',
      component:maps
    },
    {
      path:'/cnMap',
      name:'cnMap',
      component:maps
    }
  ]
})
