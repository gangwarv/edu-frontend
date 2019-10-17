
const Profile = () => import('@/views/Profile')
const Roles = () => import('@/views/user-management/role-list')
const Role = () => import('@/views/user-management/role-create')
const Users = () => import('@/views/user-management/user-list')
const User = () => import('@/views/user-management/user-create')

export default [
  {
    path: 'users',
    name: 'users',
    component: Users,
    meta: {
      breadcrumbs: ['Home', 'Users'],
      caption: 'User Management'
    }
  },
  {
    path: 'user/:id?',
    name: 'user',
    component: User,
    meta: {
      breadcrumbs: ['Home', 'User'],
      caption: 'User Management'
    }
  },
  {
    path: 'roles',
    name: 'roles',
    component: Roles,
    meta: {
      breadcrumbs: ['Home', 'Roles'],
      caption: 'Role Management'
    }
  },
  {
    path: 'role/:id?',
    name: 'role',
    component: Role,
    meta: {
      breadcrumbs: ['Home', 'Roles'],
      caption: 'Role Management',
      privilege: 'role-create'
    }
  },
  {
    path: 'profile',
    name: 'profile',
    component: Profile,
    meta: {
      breadcrumbs: ['Home', 'Profile'],
      caption: 'Profile'
    }
  }
]