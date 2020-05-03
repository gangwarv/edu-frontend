
const Course = () => import('@/views/shared/course-create')
const Courses = () => import('@/views/shared/course-list')
const AcDepts = () => import('@/views/shared/department-list')
const AcDept = () => import('@/views/shared/department-create')
const Categories = () => import('@/views/shared/category-list')
const Category = () => import('@/views/shared/category-create')
const Sessions = () => import('@/views/shared/session-list')
const Session = () => import('@/views/shared/session-create')


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