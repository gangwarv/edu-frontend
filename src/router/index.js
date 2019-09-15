import Router from 'vue-router'
import Vue from 'vue'

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
      path: '/signin',
      component: Login
    },
    {
      path: '/',
      component: Dash,
      children: [
        {
          path: '',
          component: Home,
          meta: {
            breadcrumbs: ['Home'],
            caption: 'Home'
          }
        },
        {
          path: 'hello',
          component: HelloWorld,
          meta: {
            breadcrumbs: ['Home', 'Hello'],
            caption: 'Hello'
          }
        },
        ...admissionRoutes,
        ...edpRoutes,
        ...masterRoutes
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'is-active'
})

// router.beforeEach((to, from, next) => {
//   // ...
//   console.warn('to', to);
//   console.log('from', from);

//   next()
// })

export default router

