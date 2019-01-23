import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/views/homepage'
import login from '@/views/login'
import signup from '@/views/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: homepage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: "/personalCenter",
      component: () => import("@/layout/personalLayout"),
      children: [
        {
          name: "personalInfo",
          path: "",
          meta: { requireAuth: true },
          component: () => import("@/views/personalInfo")
        },
        {
          name: "editPersonalInfo",
          path: "editPersonalInfo",
          meta: { requireAuth: true },
          component: () => import("@/views/editPersonalInfo")
        },
        {
          name: "restaurantApply",
          path: "restaurantApply",
          meta: { requireAuth: true },
          component: () => import("@/views/restaurantApply")
        },
        {
          name: "waitExamine",
          path: "restaurantApply/waitExamine",
          meta: { requireAuth: true },
          component: () => import("@/views/waitExamine")
        },
        {
          name: "applySuccess",
          path: "restaurantApply/applySuccess",
          meta: { requireAuth: true },
          component: () => import("@/views/applySuccess")
        }
      ]
    },
  ],
  mode:"history"
})
