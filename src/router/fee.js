
const FeeTypeList = () => import('@/views/fee/fee-type-list')
const FeeTypeCreate = () => import('@/views/fee/fee-type-create')
const FeeItemList = () => import('@/views/fee/fee-item-list')
const FeeItemCreate = () => import('@/views/fee/fee-item-create')


export default [
    {
        path: 'feetypes',
        name: 'feetypes',
        component: FeeTypeList
    },
    {
        path: 'feetype',
        name: 'feetype',
        component: FeeTypeCreate
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
    }
]