
const Course = () => import('@/views/master/course-create')
const Courses = () => import('@/views/master/course-list')
const AcDepts = () => import('@/views/master/ac-dept-list')
const AcDept = () => import('@/views/master/ac-dept-create')

export default [
  {
    path: 'courses',
    name: 'courses',
    component: Courses,
    meta: {
      breadcrumbs: ['Home', 'Department', 'Courses'],
      caption: 'Courses'
    }
  },
  {
    path: 'course/:id?',
    name: 'course',
    component: Course,
    name: 'course',
    meta: {
      breadcrumbs: ['Home', 'Department', 'Course'],
      caption: 'Add/Update Course'
    }
  },
  {
    path: 'acdepts',
    name: 'acdepts',
    component: AcDepts,
    meta: {
      breadcrumbs: ['Home', 'Departments'],
      caption: 'Academic Departments'
    }
  },
  {
    path: 'acdept/:id?',
    name: 'acdept',
    component: AcDept,
    name: 'acdept',
    meta: {
      breadcrumbs: ['Home', 'Departments'],
      caption: 'Add/Update Departments'
    }
  }
]