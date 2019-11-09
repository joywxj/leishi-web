import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Employee from '@/components/employee/Employee'
import addEmp from '@/components/employee/AddEmployee'
import updateEmployee from '@/components/employee/UpdateEmployee'
import bank from '@/components/bank/Bank'
import updateBank from '@/components/bank/updateBank'
import addBank from '@/components/bank/AddBank'
import timesheetindex from '@/components/timesheet/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/timesheet/index',
      name: 'timesheetindex',
      component: timesheetindex
}
  ]
})
