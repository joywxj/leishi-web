<template>
  <!-- 修改员工 -->
  <div align="">
    <h1>修改信息</h1>
    <div class="form-col">
      <el-form class="from" :inline="true" :label-position="labelPosition" label-width="80px" :model="employee">
        <div class="form content">
          <el-form-item label="姓名">
            <el-input type="text" v-model="employee.name"/>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input readonly v-model="employee.age"/>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="联系电话">
            <el-input v-model="employee.phone" maxlength="11"/>
          </el-form-item>
          <el-form-item label="通讯地址">
            <el-input v-model="employee.commAddress"/>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="家庭地址">
            <el-input v-model="employee.homeAddress"/>
            <br/>
          </el-form-item>
          <el-form-item label="薪资等级">
            <el-select v-model="employee.salaryGrade" @change="salaryChange()">
              <el-option>请选择</el-option>
              <el-option v-for="item in salaryDict" :value="item.paramCode" :label="item.showValue" :key="item.paramCode"></el-option>
            </el-select>
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
            <el-input  v-model="reason" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" style="margin-left: 250px" @click="sub()">提        交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      salaryDict: [],
      idVeMessage: '',
      salary: 1,
      labelPosition: 'right',
      show: false,
      employee: {
        id: '',
        name: '',
        phone: '',
        salary: 1,
        age: '',
        commAddress: '',
        homeAddress: '',
        reason: '',
        status: ''
      },
      b_salary: '',
      statuss: [{'key': '1', value: '在职'}, {'key': '0', value: '离职'}]
    }
  },
  mounted () {
    this.querySalary()
    this.queryEmployee()
  },
  methods: {// 定义方法
    salaryChange: function () {
      this.show = (this.employee.salary !== this.b_salary)
    },
    querySalary: function () {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/dictionary/query', qs.stringify(
        {typeCode: 'salary'}
      )).then(function (res) {
        that.salaryDict = res.data.obj
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
        that.employee = res.data.obj
        console.log('employ：', res.data.obj)
        // this.employee.salary = parseInt(res.data.obj.salary)
        that.b_salary = res.data.obj.salaryGrade
      })
    },
    sub: function () {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/modify', qs.stringify(this.employee)).then(function (res) {
        if (res.data.status === 1) {
          that.$router.push({path: 'Employee'})
        } else {
          alert('修改失败')
        }
      })
    }
  }
}
</script>
<style>
  @import '../../assets/utils.css';
</style>
