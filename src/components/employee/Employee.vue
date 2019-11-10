<template>
  <div>
    <el-page-header style="height: 50px" @back="goBack" title="返回"  content="员工信息">
    </el-page-header>
    姓名:<el-input type="text"  v-model="name"></el-input>
    身份证号:<el-input v-model="identity" maxlength="18"></el-input>
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<el-input v-model="age"></el-input>
    联系电话:<el-input v-model="phone" maxlength="11" class="el-input" ></el-input>
    <br />
    薪资等级:<el-select v-model="salary">
      <el-option
        v-for="item in salaryGrade"
        :key="item.keywords"
        :label="item.value"
        :value="item.keywords">
      </el-option>
    </el-select>
    <el-button  type="primary" icon="el-icon-search" @click="queryEmployee()">查   询</el-button>
    <div>
      <el-table
      :data="sites"
      style="width: 100% ;align-content: center;align-items: center">
        <el-table-column
          prop="name"
          label="姓名"
          width="80px"
          style="header-align: center">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="50px">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          width="115px"/>
        <el-table-column
          prop="identity"
          label="身份证号"
          width="175px"
          header-align="center"/>
        <el-table-column
          prop="userName"
          label="用户名"
          width="80px"/>
        <el-table-column
          prop="status"
          label="状态"
          width="50px"/>
        <el-table-column
          prop="updateTime"
          label="修改时间"
          width="175px"
          header-align="center"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          header-align="center">
          <template slot-scope="scope">
            <el-button @click="bankInfo(scope.row.id)" type="text" size="small">银行信息</el-button>
            <el-button icon="el-icon-edit" @click="update(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button icon="el-icon-delete" @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table>
        <tr align="center">
          <td colspan="11">
            <div class="block">
              <el-pagination align="center"
                             background
                             layout="prev, pager, next"
                             :total="total">
              </el-pagination>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style>
  @import "../../assets/utils.css";
</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      identity: '',
      phone: '',
      salaryGrade: [],
      salary: '',
      userName: '',
      age: '',
      sites: [],
      total: 10,
      pageSize: 10
    }
  },
  mounted () {
    this.querySalary()
    this.queryEmployee()
  },
  methods: {// 定义方法,
    remove: function (id) {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/remove', qs.stringify({
        id: id
      })).then(function (res) {
        if (res.data.status === 1) {
          alert('删除成功')
          that.$router.go(0)
        }
      })
    },
    bankInfo: function (id) {
      var that = this
      setTimeout(
        function () {
          that.$router.push({
            path: 'bank',
            query: {'id': id}})
        }
      )
    },
    update: function (id) {
      var that = this
      setTimeout(
        function () {
          that.$router.push({
            path: 'updateEmployee',
            query: {'id': id}})
        }
      )
    },
    querySalary: function () {
      var that = this
      axios.post('/kernel/employee/salaryGrade').then(function (res) {
        that.salaryGrade = res.data.obj
      })
    },
    queryEmployee: function () {
      var that = this
      var qs = require('qs')
      if (this.salary === '请选择') {
        this.salary = ''
      }
      axios.post('/kernel/employee/query', qs.stringify({
        name: this.name,
        identity: this.identity,
        phone: this.phone,
        salaryGrade: this.salary,
        userName: this.userName,
        age: this.age
      })).then(function (res) {
        that.sites = res.data.obj.list
        that.total = res.data.obj.totalCount
        that.pageSize = res.data.obj.pageSize
      })
    }
  }
}
</script>
