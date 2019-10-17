
const ImpExp = () => import('@/views/edp/import-export')

export default [
  {
    path: 'impexp',
    name: 'impexp',
    component: ImpExp,
    meta: {
      breadcrumbs: ['Home', 'EDP'],
      caption: 'Import/Export'
    }
  }
]