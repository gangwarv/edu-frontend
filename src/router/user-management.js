
const Profile = () => import('@/views/Profile')
const Roles = () => import('@/views/user-management/role-list')
const Role = () => import('@/views/user-management/role-create')
const Users = () => import('@/views/user-management/user-list')
const User = () => import('@/views/user-management/user-create')

export default [
  {
    path: 'users',
    name: 'users',
    component: Users
  },
  {
    path: 'user/:id?',
    name: 'user',
    component: User
  },
  {
    path: 'roles',
    name: 'roles',
    component: Roles
  },
  {
    path: 'role/:id?',
    name: 'role',
    component: Role,
    meta: {
      privilege: 'noonehas'
    }
  },
  {
    path: 'profile',
    name: 'profile',
    component: Profile
  }
]