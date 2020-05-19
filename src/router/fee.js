
const FeeGroupList = () => import('@/views/fee/fee-group-list')
const FeeGroupCreate = () => import('@/views/fee/fee-group-create')
const FeeItemList = () => import('@/views/fee/fee-item-list')
const FeeItemCreate = () => import('@/views/fee/fee-item-create')

const FeeStructList = () => import('@/views/fee/fee-structure-list')
const FeeStructCreate = () => import('@/views/fee/fee-structure-create')



export default [
    {
        path: 'feegroups',
        name: 'feegroups',
        component: FeeGroupList
    },
    {
        path: 'feegroup/:id?',
        name: 'feegroup',
        component: FeeGroupCreate
    },
    {
        path: 'feeitems',
        name: 'feeitems',
        component: FeeItemList
    },
    {
        path: 'feeitem/:id?',
        name: 'feeitem',
        component: FeeItemCreate
    },
    {
        path: 'feestructures',
        name: 'feestructures',
        component: FeeStructList
    },
    {
        path: 'feestructure',
        props: (route) => ({ coursex: route.query.course }),
        name: 'feestructure',
        component: FeeStructCreate
    },
]