import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'

import bank from '@/view/bank/index'
import ts from '@/view/timesheet/index'
import lettery from '@/view/lettery'

Vue.use(Router)

const router = {
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/bank',
      name: 'bank',
      component: bank
    },
    {
      path: '/bank/edit',
      name: 'edit',
      component: () => import('@/view/bank/edit')
    },
    {
      path: '/ts',
      name: 'timesheetindex',
      component: ts
    },
    {
      path: '/lettery',
      name: 'lettery',
      component: lettery
    },
    {
      path: '/edit',
      name: 'addEmp',
      component: () => import('@/view/employee/edit')
    },
    {
      path: '/employee',
      name: 'Employee',
      component: () => import('@/view/employee/index')
    }
    // ,
    // {
    //   path: '/updateEmployee',
    //   name: 'updateEmployee',
    //   component: () => import('@/view/employee/UpdateEmployee')
    // }
  ]
}
export default new Router(router)
