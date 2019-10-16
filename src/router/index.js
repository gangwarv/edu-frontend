import Router from 'vue-router'
import Vue from 'vue'
<<<<<<< HEAD
import store from '../store';
=======
import store from '../store'
>>>>>>> master

const HelloWorld = () => import('@/views/HelloWorld')
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Dash = () => import('@/components/layout/dash')
const NotFound = () => import('@/views/404')

// routes
import masterRoutes from './master'
import edpRoutes from './edp'
import admissionRoutes from './admission'

Vue.use(Router)

const router = new Router({
  routes: [
    {
<<<<<<< HEAD
      path: '/signin',
      name: 'SignIn',
=======
      path: '/login',
      name: 'login',
>>>>>>> master
      component: Login
    },
    {
      path: '/',
      component: Dash,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          name: 'Home',
          meta: {
            breadcrumbs: ['Home'],
            caption: 'Home'
          }
        },
        {
          path: 'hello',
          component: HelloWorld,
          name: 'Hello',
          meta: {
            breadcrumbs: ['Home', 'Hello'],
            caption: 'Hello',
            privilege: 'admin'
          }
        },
        ...admissionRoutes,
        ...edpRoutes,
        ...masterRoutes
      ]
    },
    {
      path: '*',
<<<<<<< HEAD
      name: 'NotFound',
=======
      name: 'notfound',
>>>>>>> master
      component: NotFound
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
<<<<<<< HEAD
  if (to.path == '/signin' || (store.state.auth && (store.state.auth.expiresIn - new Date().getTime()) > 0)) {
    return next()
  }
  next('/signin')
=======
  if (to.name == 'login' || to.name == 'notfound' || (store.state.auth && (store.state.auth.expiresIn - new Date().getTime()) > 0)) {
    //check role access
    const privileges = store.state.auth.privileges.split(',');
    if (!to.meta.privilege || privileges.includes('admin') || privileges.includes(to.meta.privilege))
      return next()
  }
  if (confirm('are u sure?'))
    next()
  else
    next(from)
>>>>>>> master
})

export default router

