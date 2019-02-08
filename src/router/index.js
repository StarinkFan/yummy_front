import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/views/homepage'
import login from '@/views/login'
import signup from '@/views/signup'

Vue.use(Router)


const router = new Router({
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
      path: '/user',
      name: 'user',
      component: () => import("@/layout/userLayout"),
      children: [
        {
          path: "personalCenter",
          name: 'personalCenter',
          component: () => import("@/layout/personalCenterLayout"),
          children: [
            {
              name: "personalInfo",
              path: "",
              component: () => import("@/views/personalInfo")
            },
            {
              name: "editPersonalInfo",
              path: "editPersonalInfo",
              component: () => import("@/views/editPersonalInfo")
            },
            {
              name: "restaurantApply",
              path: "restaurantApply",
              component: () => import("@/views/restaurantApply")
            },
            {
              name: "waitExamine",
              path: "restaurantApply/waitExamine",
              component: () => import("@/views/waitExamine")
            },
            {
              name: "applySuccess",
              path: "restaurantApply/applySuccess",
              component: () => import("@/views/applySuccess")
            }
          ]
        },
      ]
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: () => import("@/layout/restaurantLayout"),
      children: [
        {
          path: "restaurantCenter",
          name: 'restaurantCenter',
          component: () => import("@/layout/restaurantCenterLayout"),
          children: [
            {
              name: "restaurantInfo",
              path: "",
              component: () => import("@/views/restaurantInfo")
            },
          ]
        },
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      component: () => import("@/layout/managerLayout"),
      children: [
        {
          name: "applyAdmin",
          path: "applyAdmin",
          component: () => import("@/views/applyAdmin")
        },
        {
          name: "applicationDetail",
          path: "applicationDetail",
          component: () => import("@/views/applicationDetail")
        }
      ]
    }

  ],
  mode:"history",
});


router.beforeEach((to, from, next) => {
  if (to.path === '/login'|| to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      if(to.path.indexOf("/user/")>-1&&localStorage.getItem('Authorization')!=="user"){
        next('/login');
      }
      if(to.path.indexOf("/restaurant/")>-1&&localStorage.getItem('Authorization')!=="restaurant"){
        next('/login');
      }
      if(to.path.indexOf("/manager/")>-1&&localStorage.getItem('Authorization')!=="manager"){
        next('/login');
      }
      next();
    }
  }
});

export default router;
