import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/login.vue')
const Home = () => import('@/views/home/home.vue')
const Layout = () => import('@/views/layout/layout.vue')
const Image = () => import('@/views/image_com/image.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: "",
        name: '/home',
        component: Home
      },
      {
        path: "",
        name: '/image',
        component: Image
      }
    ]
  }

]

const router = new VueRouter({
  routes
})


// 前置导航
router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.sessionStorage.getItem('token'))
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
