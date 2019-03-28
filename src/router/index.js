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
            },
            {
              name: "personalStatistics",
              path: "statistics",
              component: () => import("@/views/personalStatistics")
            },
          ]
        },
        {
          name: "restaurantList",
          path: "restaurantList",
          component: () => import("@/views/restaurantList")
        },
        {
          name: "restaurantDetail",
          path: "restaurantDetail_:rid",
          component: () => import("@/views/restaurantDetail")
        },
        {
          name: "orderDetailOfUser",
          path: "orderDetail",
          component: () => import("@/views/orderDetailOfUser")
        },
        {
          name: "orderListOfUser",
          path: "orderList",
          component: () => import("@/views/orderListOfUser")
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
            {
              name: "editRestaurantInfo",
              path: "editRestaurantInfo",
              component: () => import("@/views/editRestaurantInfo")
            },
          ]
        },
        {
          name: "commodityAdmin",
          path: "commodityAdmin",
          component: () => import("@/views/commodityAdmin")
        },
        {
          name: "packageAdmin",
          path: "packageAdmin",
          component: () => import("@/views/packageAdmin")
        },
        {
          name: "discountAdmin",
          path: "discountAdmin",
          component: () => import("@/views/discountAdmin")
        },
        {
          name: "orderListOfRestaurant",
          path: "orderList",
          component: () => import("@/views/orderListOfRestaurant")
        },
        {
          name: "orderDetailOfRestaurant",
          path: "orderDetail",
          component: () => import("@/views/orderDetailOfRestaurant")
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
        },
        {
          name: "modifyAdmin",
          path: "modifyAdmin",
          component: () => import("@/views/modifyAdmin")
        },
        {
          name: "modificationDetail",
          path: "modificationDetail",
          component: () => import("@/views/modificationDetail")
        },
        {
          name: "rulesDesign",
          path: "rulesDesign",
          component: () => import("@/views/rulesDesign")
        },
        {
          name: "systemStatistics",
          path: "statistics",
          component: () => import("@/views/systemStatistics")
        },
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
