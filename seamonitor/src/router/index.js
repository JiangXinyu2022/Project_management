import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'//登陆界面
import RegisterView from '../views/RegisterView.vue'//注册界面
import AdminhomeView from '../views/AdminhomeView.vue'//管理员首页
import UserhomeView from '../views/UserhomeView.vue'//用户首页

import DatacenterView from '../views/DatacenterView.vue'//数据中心
import MaininfoView from '../views/MaininfoView.vue' //主要信息
import UnderseaView from '../views/UnderseaView.vue'//水下系统
import SmartcenterView from '../views/SmartcenterView.vue'//职能中心
import AdmanageView from '../views/AdmanageView.vue'//管理员管理
import DataBase from '../views/DataBase.vue'//数据库交互

import DataView from '../views/DataView.vue' //后端数据

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/dataview',
    name: 'dataview',
    component: DataView
  },
  // 路由配置
  {
    path: '/adminhome',
    name: 'adminhome',
    component: AdminhomeView,
    meta: {
      show: true // 控制是否显示内容的元信息
    },
    children: [
      {
        path: 'main-info', 
        name: 'main-info',
        component: MaininfoView, // 子组件，内容部分
        meta: {
          showContent: 'main-info', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'data-center', 
        name: 'data-center',
        component: DatacenterView, // 子组件，内容部分
        meta: {
          showContent: 'data-center', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'under-sea', 
        name: 'under-sea',
        component: UnderseaView, // 子组件，内容部分
        meta: {
          showContent: 'under-sea', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'smart-center', 
        name: 'smart-center',
        component: SmartcenterView, // 子组件，内容部分
        meta: {
          showContent: 'smart-center', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'admin-management', 
        name: 'admin-management',
        component: AdmanageView, // 子组件，内容部分
        meta: {
          showContent: 'admin-management', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'data-base', 
        name: 'data-base',
        component: DataBase, // 子组件，内容部分
        meta: {
          showContent: 'data-base', // 控制是否显示内容的元信息
          show: false
        }
      },
    ]
  },
  {
    path: '/userhome',
    name: 'userhome',
    component: UserhomeView,
    meta: {
      show: true // 控制是否显示内容的元信息
    },
    children: [
      {
        path: 'main-info', 
        name: 'main-info',
        component: MaininfoView, // 子组件，内容部分
        meta: {
          showContent: 'main-info', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'data-center', 
        name: 'data-center',
        component: DatacenterView, // 子组件，内容部分
        meta: {
          showContent: 'data-center', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'under-sea', 
        name: 'under-sea',
        component: UnderseaView, // 子组件，内容部分
        meta: {
          showContent: 'under-sea', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'smart-center', 
        name: 'smart-center',
        component: SmartcenterView, // 子组件，内容部分
        meta: {
          showContent: 'smart-center', // 控制是否显示内容的元信息
          show: false
        }
      },
      {
        path: 'data-base', 
        name: 'data-base',
        component: DataBase, // 子组件，内容部分
        meta: {
          showContent: 'data-base', // 控制是否显示内容的元信息
          show: false
        }
      },
    ]
  },
]


const router = new VueRouter({
  routes
})

export default router
