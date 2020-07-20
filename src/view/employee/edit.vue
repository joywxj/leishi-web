<template>
  <!-- 修改员工 -->
  <div>
    <el-page-header style="height: 50px" @back="goBack" title="返回"  content="添加员工" />
    <div class="form-col">
      <el-form class="from" :inline="true" :label-position="labelPosition" label-width="80px" :model="employee" :rules="employeeRules">
        <div class="form content">
          <el-form-item label="姓名">
            <el-input type="text" v-model="employee.name"/>
          </el-form-item>
          <el-form-item label="身份证号" prop="identity">
            <el-input v-model="employee.identity" maxlength="18"/>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="employee.age"/>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="employee.phone" maxlength="11" />
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="登录名称">
            <el-input v-model="employee.userName"/>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input type="password" :show-password="true" v-model="employee.password"/>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="确认密码">
            <el-input type="password" v-model="employee.pwd" @blur="verifyPassword" />
          </el-form-item>
          <el-form-item label="薪资等级">
            <el-select v-model="employee.salaryGrade">
              <el-option
                v-for="item in salaryGrade"
                :key="item.paramCode"
                :label="item.showValue"
                :value="item.paramCode">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="通讯地址">
            <el-input v-model="employee.commAddress"></el-input>
          </el-form-item>
          <el-form-item label="家庭地址">
            <el-input v-model="employee.homeAddress"></el-input>
          </el-form-item>
        </div>
        <div class="form content">
          <el-button style="margin-left: 250px" type="primary" @click="sub()" value="" >提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    var verifyPhone = () => {
      var regex = new RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$')
      if (!regex.test(this.employee.phone)) {
        this.$message({
          type: 'error',
          message: '亲爱的，你的电话号码格式不对哦^_^'
        })
        return false
      }
    }
    var verifyIdentity = () => {
      var that = this
      var regex = new RegExp('/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/')
      if (!regex.test(this.employee.identity) === true) {
        that.$message({
          type: 'error',
          message: '身证号格式有误!'
        })
        return false
      }
      var qs = require('qs')
      axios.post('/kernel/employee/verifyID', qs.stringify({
        identity: that.employee.identity
      })).then(function (res) {
        if (!res.data.obj) {
          that.$message({
            type: 'info',
            message: '身份证号：' + that.identity + '已经存在'
          })
          return false
        } else {
          var date = new Date()
          var year = date.getFullYear()
          var yy = that.employee.identity.substr(6, 4)
          that.employee.age = year - yy
        }
      })
    }
    return {
      labelPosition: 'right',
      salaryGrade: [],
      employee: {
        identity: '',
        phone: '',
        name: '',
        age: 0,
        password: '',
        salaryGrade: null
      },
      ageEnable: false,
      employeeRules: {
        identity: [
          {required: true, message: '身份证号不能为空', trigger: 'blur'},
          {validator: verifyIdentity, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '电话号码不能为空', trigger: 'blur'},
          {validator: verifyPhone, trigger: 'blur'}
        ]
      },
      idVeMessage: ''
    }
  },
  mounted () {
    window.vue = this
    this.querySalary()
  },
  methods: {// 定义方法
    goBack () {
      alert('回退')
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
      let params = {
        typeCode: 'salary'
      }
      var qs = require('qs')
      axios.post('/kernel/dictionary/query', qs.stringify(params)).then(function (res) {
        that.salaryGrade = res.data.obj
      })
    },
    verifyIdentity () {
      var that = this
      var regex = new RegExp('/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/')
      if (!regex.test(this.employee.identity) === true) {
        that.$message({
          type: 'error',
          message: '身证号格式有误!'
        })
        return false
      }
      var qs = require('qs')
      axios.post('/kernel/employee/verifyID', qs.stringify({
        identity: that.employee.identity
      })).then(function (res) {
        if (!res.data.obj) {
          that.idVeMessage = '身份证号：' + that.identity + '已经存在'
          return false
        } else {
          var date = new Date()
          var year = date.getFullYear()
          var yy = that.employee.identity.substr(6, 4)
          that.employee.age = year - yy
        }
      })
    },
    sub: function () {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/add', qs.stringify(
        that.employee
      )).then(function (res) {
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
<style>
  @import '../../assets/utils.css';
</style>
