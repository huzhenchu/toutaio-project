import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/login.vue')
const Home = () => import('@/views/home/home.vue')
const Layout = () => import('@/views/layout/layout.vue')

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
        name: 'home',
        component: Home
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
