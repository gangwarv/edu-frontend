
const Register = () => import('@/views/admission/student-register')

export default [
    {
        path: 'register',
        component: Register,
        meta: {
            breadcrumbs: ['Admission', 'Register'],
            caption: 'Register'
        }
    }
]