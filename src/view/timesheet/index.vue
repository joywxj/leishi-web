<template>
  <div>
    <h1 align="center">工时管理</h1>
    <el-form inline="true" v-model="timesheet">
      <el-row>
        <el-form-item label="员工姓名">
          <el-input type="text"  v-model="timesheet.emName" />
        </el-form-item>
        <el-form-item label="工地名称">
          <el-select v-model="timesheet.cstId">
            <option>请选择</option>
            <option v-for="item in ems" v-bind:key="item.keywords" v-bind:value="item.keywords">{{ item.value}}</option>
          </el-select>
        </el-form-item>
        <el-form-item label="年">
          <el-select v-model="year">
            <option>请选择</option>
            <option v-for="item in yeararr" v-bind:key="item.key" v-bind:value="item.key">{{ item.value}}</option>
          </el-select>
        </el-form-item>
        <el-form-item label="月">
          <el-select v-model="month">
            <option>请选择</option>
            <option v-bind:value="1">1月</option>
            <option v-bind:value="2">2月</option>
            <option v-bind:value="3">3月</option>
            <option v-bind:value="4">4月</option>
            <option v-bind:value="5">5月</option>
            <option v-bind:value="6">6月</option>
            <option v-bind:value="7">7月</option>
            <option v-bind:value="8">8月</option>
            <option v-bind:value="9">9月</option>
            <option v-bind:value="10">10月</option>
            <option v-bind:value="11">11月</option>
            <option v-bind:value="12">12月</option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query()">查   询</el-button>
          <el-button type="primary" @click="importFile()">导   入</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div>
      <el-table align="center" :data="list">
        <el-table-column
        prop="emName"
        label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="cstName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="years"
          label="年">
        </el-table-column>
        <el-table-column
          prop="months"
          label="月">
        </el-table-column>
        <el-table-column
          prop="day01"
          label="day01">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300"
          header-align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" @click="update(scope.row.id)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table >
        <tr align="center" v-bind:key="site.id" v-for="site in sites">
          <td>{{ site.emName }}</td>
          <td>{{ site.cstName }}</td>
          <td>{{ site.years }}</td>
          <td>{{ site.months }}</td>
          <td>{{ site.day01 }}</td>
          <td style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"><button v-on:click="update(site.id)">修改</button></td>
          <td style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"><button v-on:click="remove(site.id)">删除</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      timesheet: {
      },
      emName: '',
      cstId: '',
      month: '',
      count: 1,
      year: '',
      ems: [],
      yeararr: [],
      list: [],
      file: ''
    }
  },
  mounted () {
    this.queryEmDic()
    this.query()
    this.getYear()
  },
  methods: {// 定义方法,
    importFile: function () {
      var that = this
      var qs = require('qs')
      alert(that.file)
      axios.post('/kernel/work/importFile', qs.stringify({
        // file: that.file
      })).then(function (res) {
        if (res.data.status === 1) {
          alert('删除成功')
          that.$router.go(0)
        }
      })
    },
    getYear: function () {
      var date = new Date()
      var year = date.getFullYear()
      this.yeararr = [{'key': year, value: year}, {'key': year - 1, value: year - 1}, {
        'key': year - 2,
        value: year - 2
      }]
    },
    remove: function (id) {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/work/remove', qs.stringify({
        id: id
      })).then(function (res) {
        if (res.data.status === 1) {
          alert('删除成功')
          that.$router.go(0)
        }
      })
    },
    update: function (id) {
      var that = this
      setTimeout(
        function () {
          that.$router.push({path: 'conUpdate', query: {'id': id}})
        }
      )
    },
    queryEmDic: function () {
      var that = this
      axios.post('/kernel/work/getWorkDict').then(function (res) {
        that.ems = res.data.obj
      })
    },
    query: function () {
      var that = this
      var qs = require('qs')
      if (that.cstId === '请选择') {
        that.cstId = ''
      }
      if (that.year === '请选择') {
        that.year = ''
      }
      if (that.month === '请选择') {
        that.month = ''
      }
      axios.post('/kernel/timesheet/query', qs.stringify({
        ...that.timesheet
      })).then(function (res) {
        that.list = res.data.obj.list
        that.count = res.data.obj.totalCount
      })
    }
  }
}
</script>
