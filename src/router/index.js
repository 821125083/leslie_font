import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import aboard from '@/components/aboard';
import father from '@/components/father';
import maps from '@/components/maps';
import cnMap from '@/components/element/CnMap2';
import news from '@/components/news';
import shouye from '@/components/shouye';
import answer from '@/components/props/answer';
import gdut from '@/components/props/gdut'
import worldMap from '@/components/element/worldMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      name:'shouye',
      component:shouye
    },
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
      path:'/cn/cnMap',
      name:'cnMap',
      component:maps
    },
    {
      path:'/cn/cnMap2',
      name:'cnMap2',
      component:cnMap
    },
    {
      path:'/aboard/worldMap',
      name:'worldMap',
      component:worldMap
    },
    {
      path:'/news',
      name:'news',
      component:news
    },
    {
      path:'/answer',
      name:'answer',
      component:answer
    },
    {
      path:'/gdut',
      name:'gdut',
      component:gdut
    }
  ]
})
