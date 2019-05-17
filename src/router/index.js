import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Employee from '@/components/Employee'
import addEmp from '@/components/AddEmployee'
import ZhiLing from '@/components/ZhiLing'
import updateEmployee from '@/components/UpdateEmployee'
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
      path: '/ZhiLing',
      name: 'ZhiLing',
      component: ZhiLing
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
    }
  ]
})
