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
          <el-form-item v-if="!id" label="身份证号" prop="identity">
            <el-input v-model="employee.identity" maxlength="18"/>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="年龄" prop="age">
            <el-input readonly v-model="employee.age"/>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="employee.phone" maxlength="11" />
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="薪资等级">
            <el-select v-model="employee.salaryGrade" @change="salaryChange()">
              <el-option
                v-for="item in salaryGrade"
                :key="item.paramCode"
                :label="item.showValue"
                :value="item.paramCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="!id" label="登录名称">
            <el-input v-model="employee.userName"/>
          </el-form-item>
          <el-form-item v-else label="登录名称">
            <el-input disabled v-model="employee.userName"/>
          </el-form-item>

        </div>
        <div class="form content">
          <el-form-item v-if="!id" label="确认密码">
            <el-input type="password" v-model="employee.pwd" @blur="verifyPassword" />
          </el-form-item>
          <el-form-item v-if="!id" label="登录密码">
            <el-input type="password" :show-password="true" v-model="employee.password"/>
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
          <el-form-item label="状态">
            <el-select v-model="employee.status">
              <el-option>请选择</el-option>
              <el-option v-for="item in statuss" :value="item.key"  :label="item.value" :key="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="show" label="变更理由">
            <el-input v-model="employee.reason"/>
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
      show: false,
      id: this.$route.query.id,
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
      idVeMessage: '',
      statuss: [{'key': '1', value: '在职'}, {'key': '0', value: '离职'}]
    }
  },
  mounted () {
    window.vue = this
    this.querySalary()
    let id = this.$route.query.id
    if (id) {
      this.show = false
      this.queryEmployee(id)
    }
  },
  methods: {// 定义方法
    salaryChange () {
      this.show = (this.employee.salary !== this.b_salary)
    },
    queryEmployee (id) {
      this.id = id
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/queryEmpById', qs.stringify(
        {id: id}
      )).then(function (res) {
        that.employee = res.data.obj
        console.log('employ：', res.data.obj)
        that.b_salary = res.data.obj.salaryGrade
      })
    },
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
      axios.post('/kernel/dictionary/list', qs.stringify(params)).then(function (res) {
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
      let id = this.$route.query.id
      let url = id ? '/kernel/employee/modify' : '/kernel/employee/add'
      axios.post(url, qs.stringify(
        that.employee
      )).then(function (res) {
        if (res.data.status === 1) {
          that.$message({
            type: 'info',
            message: (id ? '修改' : '新增') + '成功'
          })
          that.$router.push({path: 'employee'})
        } else {
          that.$message({
            type: 'error',
            message: (id ? '修改' : '新增') + '失败'
          })
        }
      })
    }
  }
}
</script>
<style>
  @import '../../assets/utils.css';
</style>
