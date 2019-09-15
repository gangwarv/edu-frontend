
const Course = () => import('@/views/master/course')
const Courses = () => import('@/views/master/courses')

export default [
    {
        path: 'courses',
        component: Courses,
        meta: {
          breadcrumbs: ['Home', 'Courses'],
          caption: 'Courses'
        }
      },
      {
        path: 'course/:id?',
        component: Course,
        name:'course',
        meta: {
          breadcrumbs: ['Home', 'Course'],
          caption: 'Add/Update Course'
        }
      }
]