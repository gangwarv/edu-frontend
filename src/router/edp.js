
const Profile = () => import('@/views/Profile')
const Roles = () => import('@/views/edp/roles')

export default [
    {
        path: 'roles',
        component: Roles,
        meta: {
          breadcrumbs: ['Home', 'Roles'],
          caption: 'Role Management'
        }
      },
      {
        path: 'profile',
        component: Profile,
        meta: {
          breadcrumbs: ['Home', 'Profile'],
          caption: 'Profile'
        }
      }
]