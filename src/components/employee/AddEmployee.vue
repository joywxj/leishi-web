<template>
  <!-- 修改员工 -->
  <div>
    <h1 style="margin-left: 200px;">添加员工</h1>
    姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:<input type="text"  v-model="name" />&nbsp;&nbsp;&nbsp;&nbsp;
    身份证号:<input v-model="identity" maxlength="18" @blur="verifyIdentity"><span style="color: red">{{idVeMessage}}</span><br/>
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<input v-model="age">&nbsp;&nbsp;&nbsp;&nbsp;
     登录名称:<input v-model="userName"><br/>
    登录密码:<input TYPE="password" v-model="password">&nbsp;&nbsp;&nbsp;&nbsp;
    确认密码:<input TYPE="password" v-model="pwd" @blur="verifyPassword"><br/>
    联系电话:<input v-model="phone" maxlength="11" @blur="verifyPhone">&nbsp;&nbsp;&nbsp;&nbsp;
    通讯地址:<input v-model="commAddress"><br/>
    家庭地址:<input v-model="homeAddress">&nbsp;&nbsp;&nbsp;&nbsp;
    薪资等级:<select v-model="salary">
    <option>请选择</option>
    <option v-for="item in salaryGrade" v-bind:value="item.keywords" v-bind:key="item.keywords" >{{ item.value}}</option>
  </select><br/><br/>
    <input style="margin-left: 250px" type="button" @click="sub()" value="提        交" />
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      identity: '',
      phone: '',
      commAddress: '',
      homeAddress: '',
      salaryGrade: [],
      salary: 1,
      userName: '',
      age: 0,
      password: '',
      idVeMessage: '',
      pwd: ''
    }
  },
  mounted () {
    this.querySalary()
  },
  methods: {// 定义方法
    verifyPhone: function () {
      var regex = new RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$')
      if (!regex.test(this.phone)) {
        alert('亲，你的电话号码格式有误!')
        return false
      }
    },
    verifyPassword: function () {
      if (this.password === '' || this.pwd === '') {
        alert('密码不可为空')
        return false
      }
      if (this.password !== this.pwd) {
        alert('密码不一致')
        return false
      }
    },
    querySalary: function () {
      var that = this
      axios.post('/kernel/employee/salaryGrade').then(function (res) {
        that.salaryGrade = res.data.obj
      })
    },
    verifyIdentity: function () {
      var that = this
      var regex = new RegExp('/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/')
      if (!regex.test(this.identity) === true) {
        that.idVeMessage = '身证号格式有误!'
        return false
      } else {
        that.idVeMessage = ''
      }
      var qs = require('qs')
      axios.post('/kernel/employee/verifyID', qs.stringify({
        identity: this.identity
      })).then(function (res) {
        if (res.data.obj) {
          that.idVeMessage = '身份证号：' + that.identity + '已经存在'
          return false
        } else {
          var date = new Date()
          var year = date.getFullYear()
          var yy = that.identity.substr(6, 4)
          that.age = year - yy
          that.idVeMessage = ''
        }
      })
    },
    sub: function () {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/add', qs.stringify({
        name: this.name,
        identity: this.identity,
        phone: this.phone,
        commAddress: this.commAddress,
        homeAddress: this.homeAddress,
        salaryGrade: this.salary,
        userName: this.userName,
        age: this.age,
        password: this.password
      })).then(function (res) {
        if (res.data.status === 1) {
          alert('新增成功')
          that.$router.push({path: 'Employee'})
        } else {
          alert('新增失败')
        }
      })
    }
  }
}
</script>
