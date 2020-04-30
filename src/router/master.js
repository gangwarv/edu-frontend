
const Course = () => import('@/views/master/course-create')
const Courses = () => import('@/views/master/course-list')
const AcDepts = () => import('@/views/master/department-list')
const AcDept = () => import('@/views/master/department-create')
const Categories = () => import('@/views/master/category-list')
const Category = () => import('@/views/master/category-create')
const Sessions = () => import('@/views/master/session-list')
const Session = () => import('@/views/master/session-create')


export default [
  {
    path: 'categories',
    name: 'categories',
    component: Categories
  },
  {
    path: 'category',
    name: 'category',
    component: Category
  },
  {
    path: 'courses',
    name: 'courses',
    component: Courses
  },
  {
    path: 'course/:id?',
    name: 'course',
    component: Course
  },
  {
    path: 'acdepts',
    name: 'acdepts',
    component: AcDepts
  },
  {
    path: 'acdept/:id?',
    name: 'acdept',
    component: AcDept
  },
  {
    path: 'sessions',
    name: 'sessions',
    component: Sessions
  },
  {
    path: 'session/:id?',
    name: 'session',
    component: Session
  }
]