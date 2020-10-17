import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/login.vue')
const Home = () => import('@/views/home/home.vue')
const Layout = () => import('@/views/layout/layout.vue')
const Image = () => import('@/views/image_com/image.vue')
const Article = () => import('@/views/article/article.vue')
const Publish = () => import('@/views/publish/publish.vue')
const Comment = () => import('@/views/comment/comment.vue')
const Fans = () => import('@/views/fans/fans.vue')
const Settings = () => import('@/views/settingsc/settings.vue')

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
        path: "/",
        name: '/home',
        component: Home
      },
      {
        path: 'article',
        name: 'article',
        component: Article
      },
      {
        path: "image",
        name: 'image',
        component: Image
      },
      {
        path:'publish',
        name:'publish',
        component: Publish
      },
      {
        path: 'comment',
        name: 'comment',
        component: Comment
      },
      {
        path: 'fans',
        name: 'fans',
        component: Fans
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings
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
