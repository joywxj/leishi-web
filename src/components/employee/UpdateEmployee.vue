<template>
  <!-- 修改员工 -->
  <div align="">
    <h1>修改信息</h1>
    姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:<input type="text"  v-model="name" />&nbsp;&nbsp;&nbsp;&nbsp;
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<input v-model="age">&nbsp;&nbsp;&nbsp;&nbsp;<br>
    联系电话:<input v-model="phone" maxlength="11">&nbsp;&nbsp;&nbsp;&nbsp;
    通讯地址:<input v-model="commAddress"><br/>
    家庭地址:<input v-model="homeAddress">&nbsp;&nbsp;&nbsp;&nbsp;
    薪资等级:<select v-model="salary" @change="salaryChange()">
    <option>请选择</option>
    <option v-for="item in salaryGrade" :value="item.keywords" :key="item.keywords">{{ item.value}}</option>
  </select>
    <br/>
    状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:<select v-model="status">
    <option>请选择</option>
    <option v-for="item in statuss" :value="item.key" :key="item.keywords">{{ item.value}}</option>
  </select>
    <br/>
    <div v-if="show">变更理由:<input  v-model="reason"/></div><br/>
    <input style="margin-left: 250px" type="button" @click="sub()" value="提        交" />
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      id: '',
      name: '',
      phone: '',
      commAddress: '',
      homeAddress: '',
      salaryGrade: [],
      salary: 1,
      age: '',
      idVeMessage: '',
      reason: '',
      b_salary: '',
      show: false,
      statuss: {'key':1, value: '在职'},
    {'key': 0,value: '离职'}],
      status:''
    }
  },
  mounted () {
    this.querySalary()
    this.queryEmployee()
  },
  methods: {// 定义方法
    salaryChange: function () {
      // var that = this
      this.show = (this.salary != this.b_salary)
    },
    querySalary: function () {
      var that = this
      axios.post('/kernel/employee/salaryGrade').then(function (res) {
        that.salaryGrade = res.data.obj
      })
    },
    queryEmployee: function () {
      var id = this.$route.query.id
      this.id = id
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/queryEmpById', qs.stringify(
        {id: id}
      )).then(function (res) {
        that.name = res.data.obj.name
        that.age = res.data.obj.age
        that.phone = res.data.obj.phone
        that.salary = res.data.obj.salaryGrade
        that.homeAddress = res.data.obj.homeAddress
        that.commAddress = res.data.obj.commAddress
        that.b_salary = res.data.obj.salaryGrade
        that.status = res.data.obj.status
      })
    },
    sub: function () {
       var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/modify', qs.stringify({
        name: this.name,
        id: this.id,
        phone: this.phone,
        commAddress: this.commAddress,
        homeAddress: this.homeAddress,
        salaryGrade: this.salary,
        age: this.age,
        reason: this.reason
      })).then(function (res) {
        if (res.data.status === 1) {
          that.$router.push({path:'Employee'});
        } else {
          alert('修改失败')
        }
      })
    }
  }
}
</script>
