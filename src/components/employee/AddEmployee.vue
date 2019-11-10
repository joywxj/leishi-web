<template>
  <!-- 修改员工 -->
  <div>
    <el-page-header style="height: 50px" @back="goBack" title="返回"  content="添加员工" />
    姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:<el-input type="text"  v-model="name"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
    身份证号:<el-input v-model="identity" maxlength="18" @blur="verifyIdentity"></el-input><span style="color: red">{{idVeMessage}}</span><br/>
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<el-input v-model="age"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
     登录名称:<el-input v-model="userName" ></el-input><br/>
    登录密码:<el-input TYPE="password" v-model="password"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
    确认密码:<el-input TYPE="password" v-model="pwd" @blur="verifyPassword" ></el-input><br/>
    联系电话:<el-input v-model="phone" maxlength="11" @blur="verifyPhone" ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
    通讯地址:<el-input v-model="commAddress"></el-input><br/>
    家庭地址:<el-input v-model="homeAddress"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
    薪资等级:<el-select v-model="salary">
    <el-option
      v-for="item in salaryGrade"
      :key="item.keywords"
      :label="item.value"
      :value="item.keywords">
    </el-option>
  </el-select><br/><br/>
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
