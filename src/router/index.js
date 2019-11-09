import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Employee from '@/components/Employee'
import addEmp from '@/components/AddEmployee'
import ZhiLing from '@/components/ZhiLing'
import updateEmployee from '@/components/UpdateEmployee'
import bank from '@/components/Bank'
import updateBank from '@/components/updateBank'
import addBank from '@/components/AddBank'
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
