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
  }]

const router = new VueRouter({
  routes
})

// 全局前置导航
router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.sessionStorage.getItem('token'))
  //如果你去的不是login页面的话  我们再进行判断:如果你是取的页面里面有token的话,就放行,否则的话就强行跳回login页面,进行登录
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