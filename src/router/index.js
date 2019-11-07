import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Index from '../views/Index'
import Home from '../views/Home'
import MyBook from '../views/MyBook'
import Detail from '../views/Detail'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/index',
    component: Index,
    children: [{
      path: '/index/home',
      component: Home,
    }, {
      path: '/index/my_book',
      component: MyBook,
      meta: { needLogin: true }
    }, {
      path: '/detail/:id',
      component: Detail,
      meta: { needLogin: true }
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫，meta字段里面添加needLogin标识
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (localStorage.getItem('username')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
