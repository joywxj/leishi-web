<template>
  <div>
    <el-page-header style="height: 50px" @back="goBack" title="返回"  content="员工信息">
    </el-page-header>
    <el-form inline="true">
      <el-row>
        <el-form-item label="姓名">
          <el-input type="text"  v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="identity" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="phone" maxlength="11" class="el-input" ></el-input>
        </el-form-item>
        <el-button  type="primary" icon="el-icon-search" @click="queryEmployee()">查   询</el-button>
        <el-button  type="primary" icon="el-icon-plus" @click="add()">新增</el-button>

      </el-row>
    </el-form>
    <div>
      <el-table
      :data="list"
      style="width: 100% ;align-content: center;align-items: center"
      empty-text="暂无数据"
      >
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
          :formatter="timestampToTime"
          width="175px"
          header-align="center"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="300"
          header-align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-bank-card" @click="bankInfo(scope.row.id)" type="primary" size="small">银行信息</el-button>
            <el-button icon="el-icon-edit" @click="update(scope.row.id)" type="primary" size="small">编辑</el-button>
            <el-button icon="el-icon-delete" @click="remove(scope.row.id)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination align="center"
                       background
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style>
  @import "../../assets/utils.css";
</style>
<script>
import axios from 'axios'
import moment from 'moment' //导入文件
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
      list: [],
      total: 10,
      pageSize: 10
    }
  },
  mounted () {
    this.querySalary()
    this.queryEmployee()
  },
  methods: {// 定义方法,
    timestampToTime (row, column) {
      // var date = row[column.property];
      // if (date === undefined) {
      //   return "";
      // }
      let format = "YYYY-MM-DD HH:mm:ss";
     var time = moment(row.updateTime).format(format)
      return time
      // var moment = require("moment");
      // return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    remove (id) {
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
    bankInfo (id) {
      var that = this
      setTimeout(
        function () {
          that.$router.push({
            path: 'bank',
            query: {'id': id}})
        }
      )
    },
    update (id) {
      var that = this
      setTimeout(
        function () {
          that.$router.push({
            path: 'updateEmployee',
            query: {'id': id}})
        }
      )
    },
    querySalary () {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/dictionary/query', qs.stringify({
        typeCode: 'salary'
      })).then(function (res) {
        that.salaryGrade = res.data.obj
      })
    },
    queryEmployee () {
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
        age: this.age,
        page: 1,
        size: 10
      })).then(function (res) {
        that.list = res.data.obj.list
        that.total = res.data.obj.totalCount
        that.pageSize = res.data.obj.pageSize
      })
    },
    add () {
      var that = this
      setTimeout(
        function () {
          that.$router.push({
            path: 'addEmp'
          })
        }
      )
    }
  }
}
</script>
