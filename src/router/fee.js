
const FeeItemList = () => import('@/views/fee/fee-item-list')
const FeeItemCreate = () => import('@/views/fee/fee-item-create')

export default [
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