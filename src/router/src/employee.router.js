const outRouter = [
  {
    path: '/addEmp',
    name: 'addEmp',
    component: () => import('@/view/employee/edit')
  },
  {
    path: '/Employee',
    name: 'Employee',
    component: () => import('@/view/employee/index')
  },
  {
    path: '/updateEmployee',
    name: 'updateEmployee',
    component: () => import('@/view/employee/UpdateEmployee')
  }
]

export default {outRouter}
