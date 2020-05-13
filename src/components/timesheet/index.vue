<template>
  <div>
    <h1 align="center">工时管理</h1>
    员工姓名:<el-input type="text"  v-model="emName" />
    工地名称:<select v-model="cstId">
    <option>请选择</option>
    <option v-for="item in ems" v-bind:key="item.keywords" v-bind:value="item.keywords">{{ item.value}}</option>
  </select>&nbsp;
    年:<select v-model="year">
    <option>请选择</option>
    <option v-for="item in yeararr" v-bind:key="item.key" v-bind:value="item.key">{{ item.value}}</option>
  </select>&nbsp;
    月:<select v-model="month">
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
  </select>&nbsp;
    <input type="button" @click="query()" value="查   询" />
    <input type="file"/>
    <input type="button" @click="importFile()" value="导   入" />
    <div>
      <table >
        <tr align="center">
          <td style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">员工姓名</td>
          <td style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">工地名称</td>
          <td>年</td>
          <td>月</td>
          <td>day01</td>
          <td>day02</td>
          <td>day03</td>
          <td>day04</td>
          <td>day05</td>
          <td>day06</td>
          <td>day07</td>
          <td>day08</td>
          <td>day09</td>
          <td>day10</td>
          <td>day11</td>
          <td>day12</td>
          <td>day13</td>
          <td>day14</td>
          <td>day15</td>
          <td>day16</td>
          <td>day17</td>
          <td>day18</td>
          <td>day19</td>
          <td>day20</td>
          <td>day21</td>
          <td>day22</td>
          <td>day23</td>
          <td>day24</td>
          <td>day25</td>
          <td>day26</td>
          <td>day27</td>
          <td>day28</td>
          <td>day29</td>
          <td>day30</td>
          <td>day31</td>
          <td style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">修改</td>
          <td style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">删除</td>
        </tr>
        <tr align="center" v-bind:key="site.id" v-for="site in sites">
          <td>{{ site.emName }}</td>
          <td>{{ site.cstName }}</td>
          <td>{{ site.years }}</td>
          <td>{{ site.months }}</td>
          <td>{{ site.day01 }}</td>
          <td>{{ site.day02 }}</td>
          <td>{{ site.day03 }}</td>
          <td>{{ site.day04 }}</td>
          <td>{{ site.day05 }}</td>
          <td>{{ site.day06 }}</td>
          <td>{{ site.day07 }}</td>
          <td>{{ site.day08 }}</td>
          <td>{{ site.day09 }}</td>
          <td>{{ site.day10 }}</td>
          <td>{{ site.day11 }}</td>
          <td>{{ site.day12 }}</td>
          <td>{{ site.day13 }}</td>
          <td>{{ site.day14 }}</td>
          <td>{{ site.day15 }}</td>
          <td>{{ site.day16 }}</td>
          <td>{{ site.day17 }}</td>
          <td>{{ site.day18 }}</td>
          <td>{{ site.day19 }}</td>
          <td>{{ site.day20 }}</td>
          <td>{{ site.day21 }}</td>
          <td>{{ site.day22 }}</td>
          <td>{{ site.day23 }}</td>
          <td>{{ site.day24 }}</td>
          <td>{{ site.day25 }}</td>
          <td>{{ site.day26 }}</td>
          <td>{{ site.day27 }}</td>
          <td>{{ site.day28 }}</td>
          <td>{{ site.day29 }}</td>
          <td>{{ site.day30 }}</td>
          <td>{{ site.day31 }}</td>
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
      emName: '',
      cstId: '',
      month: '',
      count: 1,
      year: '',
      ems: [],
      yeararr: [],
      sites: [],
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
        emName: that.emName,
        cstId: that.cstId,
        years: that.year,
        months: that.month
      })).then(function (res) {
        that.sites = res.data.obj.list
        that.count = res.data.obj.totalCount
      })
    }
  }
}
</script>
