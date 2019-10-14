
const Profile = () => import('@/views/Profile')
const Roles = () => import('@/views/edp/role-list')
const Role = () => import('@/views/edp/role-create')
const Users = () => import('@/views/edp/user-list')
const User = () => import('@/views/edp/user-create')

export default [
  {
    path: 'users',
    component: Users,
    meta: {
      breadcrumbs: ['Home', 'Users'],
      caption: 'User Management'
    }
  },
  {
    path: 'user/:id?',
    component: User,
    meta: {
      breadcrumbs: ['Home', 'User'],
      caption: 'User Management'
    }
  },
  {
    path: 'roles',
    component: Roles,
    meta: {
      breadcrumbs: ['Home', 'Roles'],
      caption: 'Role Management'
    }
  },
  {
    path: 'role/:id?',
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