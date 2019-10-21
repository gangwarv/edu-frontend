
const Course = () => import('@/views/master/course-create')
const Courses = () => import('@/views/master/course-list')
const AcDepts = () => import('@/views/master/ac-dept-list')
const AcDept = () => import('@/views/master/ac-dept-create')
const Categories = () => import('@/views/master/category-list')
const Category = () => import('@/views/master/category-create')


export default [
  {
    path: 'categories',
    name: 'categories',
    component: Categories,
    meta: {
      breadcrumbs: ['Home', 'Categories'],
      caption: 'Categories'
    }
  },
  {
    path: 'category',
    name: 'category',
    component: Category,
    meta: {
      breadcrumbs: ['Home', 'Category'],
      caption: 'Category'
    }
  },
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