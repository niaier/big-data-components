import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/home/Home.vue')
      },
      {
        path: 'demoTransfer',
        name: 'DemoTransfer',
        component: () => import(/* webpackChunkName: "Transfer" */ '@/views/demo/transfer/Transfer.vue')
      },
      {
        path: 'originTransfer',
        name: 'OriginTransfer',
        component: () => import(/* webpackChunkName: "Transfer" */ '@/components/Transfer.vue')
      }


    ]
  },

  // {
  //   path: '/transfer',
  //   name: 'Transfer',
  //   component: () => import(/* webpackChunkName: "Transfer" */ '@/components/Transfer.vue')
  // },
  // {
  //   path: '/checkbox',
  //   name: 'Checkbox',
  //   component: () => import(/* webpackChunkName: "checkbox" */ '@/components/Checkbox.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
