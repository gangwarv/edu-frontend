
const Profile = () => import('@/views/Profile')
const Roles = () => import('@/views/edp/role-list')
const Role = () => import('@/views/edp/role-create')

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
    path: 'role',
    component: Role,
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