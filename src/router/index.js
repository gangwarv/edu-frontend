import Router from 'vue-router'
import Vue from 'vue'
import store from '../store'
import { apolloClient } from '../apollo'
import { LOGIN } from '@/graphql/auth'
import { AUTH_SET } from '@/store/auth/types'

const HelloWorld = () => import('@/views/HelloWorld')
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Dash = () => import('@/components/layout/dash')
const NotFound = () => import('@/views/404')

// routes
import masterRoutes from './master'
import userMgmtRoutes from './user-management'
import edpRoutes from './edp'
import admissionRoutes from './admission'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
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
            // privilege: 'admin'
          }
        },
        ...admissionRoutes,
        ...edpRoutes,
        ...userMgmtRoutes,
        ...masterRoutes
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'notfound')
    return next();
  if (store.state.auth) {
    let { expiringIn, validFrom } = store.state.auth;
    expiringIn = new Date(expiringIn);
    validFrom = new Date(validFrom);

    const remainingSeconds = Math.floor((expiringIn - new Date()) / 1000);
    const validityHalf = Math.floor(expiringIn - validFrom) / 2000;

    if (remainingSeconds > 1 && remainingSeconds < validityHalf) {
      apolloClient.mutate({
        mutation: LOGIN,
        variables: { userName: '--renewtoken--', password: '-- --' }
      })
        .then(({ data: { login } }) => {
          store.commit(AUTH_SET, login);
        });
    }
    if (remainingSeconds < 0) {
      next('login')
    }
    const privileges = store.state.auth.privileges.split(',');
    if (!to.meta.privilege || privileges.includes('admin') || privileges.includes(to.meta.privilege)) {
      return next()
    }

  }
  if (from.name && from.name !== 'login') {
    alert('access-denied');
    return next(from)
  }
  next('login')
})

export default router

