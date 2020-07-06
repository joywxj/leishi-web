import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Employee from '@/view/employee/index'
import addEmp from '@/view/employee/AddEmployee'
import updateEmployee from '@/view/employee/UpdateEmployee'
import bank from '@/view/bank/Bank'
import updateBank from '@/view/bank/updateBank'
import addBank from '@/view/bank/AddBank'
import ts from '@/view/timesheet/index'
import lettery from '@/view/lettery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/addEmp',
      name: 'addEmp',
      component: addEmp
    },
    {
      path: '/Employee',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/updateEmployee',
      name: 'updateEmployee',
      component: updateEmployee
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
    }
  ]
})
