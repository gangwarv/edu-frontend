const HelloWorld = () => import('@/views/HelloWorld')
const Profile = () => import('@/views/Profile')
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Dash = () => import('@/components/layout/dash')
const NotFound = () => import('@/components/layout/404')
// admission
const Register = () => import('@/views/admission/student-register')
const Course = () => import('@/views/master/course')
const Courses = () => import('@/views/master/courses')

import Router from 'vue-router'
import Vue from 'vue'

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
            breadcrumbs: [
              {
                text: 'Home'
              }
            ],
            caption: 'Home'
          }
        },
        {
          path: 'profile',
          component: Profile,
          meta: {
            breadcrumbs: [
              {
                text: 'Home',
                path: '/'
              },
              {
                text: 'Profile'
              }
            ],
            caption: 'Profile'
          }
        },
        {
          path: 'hello',
          component: HelloWorld,
          meta: {
            breadcrumbs: [
              {
                text: 'Home',
                path: '/'
              },
              {
                text: 'Hello'
              }
            ],
            caption: 'Hello'
          }
        },
        {
          path: 'hello',
          component: HelloWorld,
          meta: {
            breadcrumbs: [
              {
                text: 'Home',
                path: '/'
              },
              {
                text: 'Hello'
              }
            ],
            caption: 'Hello'
          }
        },
        {
          path: 'register',
          component: Register,
          meta: {
            breadcrumbs: [
              {
                text: 'Home',
                path: '/'
              },
              {
                text: 'Admission',
                path: '/'
              },
              {
                text: 'Register'
              }
            ],
            caption: 'Register'
          }
        },
        {
          path: 'courses',
          component: Courses,
          meta: {
            breadcrumbs: [
              {
                text: 'Home',
                path: '/'
              },
              {
                text: 'Master',
                path: '/'
              },
              {
                text: 'Courses'
              }
            ],
            caption: 'Courses'
          }

        },
        {
          path: 'course',
          component: Course,
          meta: {
            breadcrumbs: [
              {
                text: 'Home',
                path: '/'
              },
              {
                text: 'Master',
                path: '/'
              },
              {
                text: 'Course'
              }
            ],
            caption: 'Course'
          }
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'is-active',
  // linkActiveClass:'is-active'
})

// router.beforeEach((to, from, next) => {
//   // ...
//   console.warn('to', to);
//   console.log('from', from);

//   next()
// })

export default router

