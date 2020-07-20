import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'

import bank from '@/view/bank/Bank'
import updateBank from '@/view/bank/updateBank'
import addBank from '@/view/bank/AddBank'
import ts from '@/view/timesheet/index'
import lettery from '@/view/lettery'
import employee from './src/employee.router'
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
      path: '/updateBank',
      name: 'updateBank',
      component: updateBank
    },
    {
      path: '/addBank',
      name: 'addBank',
      component: addBank
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
}
export default new Router(router)
