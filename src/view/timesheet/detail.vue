<template>
    <div>
<!--   工时详情页面   -->
      <el-calendar
        v-model="value"
        disdabled
      >
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{data}"
        >
          <p :class="data.isSelected ? 'is-selected' : ''" style="text-align: center">
            {{ data.day.split('-').slice(1).join('-') }}<br/> {{ initTs(data.day) === 0 || initTs(data.day) === '' ? '' : (initTs(data.day) + ' H')}}
            <el-button type="primary" v-if="compareDate(data.day, currentDate)" icon="el-icon-edit" size="mini" round @click="edit(data.day)"></el-button>
          </p>
        </template>
      </el-calendar>
      <el-dialog
        title="编辑工时"
        :visible="editVisiable"
        :before-close="handleClose"
      >
        <el-form v-model="timesheet">
          <div>
            <el-form-item label="工时">
              <el-input v-model="day"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <el-button @click="subTs()">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
import moment from 'moment' // 导入文件
import axios from 'axios'
export default {
  name: 'detail',
  data () {
    return {
      name: '',
      day: 0,
      years: 0,
      months: 0,
      ecInfo: {
      },
      tempDate: 1,
      id: 1,
      dataRang: [],
      value: new Date(),
      currentDate: new Date(),
      timesheet: {},
      editVisiable: false
    }
  },
  mounted () {
    this.initTimesheet()
  },
  methods: {

    compareDate (beforeDate, afterDate) {
      return moment(beforeDate) < moment(afterDate)
    },
    subTs () {
      this.setTs(this.tempDate)
      let that = this
      that.$delete(that.timesheet, 'createTime')
      that.$delete(that.timesheet, 'modifyTime')

      axios
        .post('kernel/timesheet/deitTs', require('qs').stringify(that.timesheet))
        .then(function (res) {
          if (res.data.status === 1) {
            that.editVisiable = false
            that.initTimesheet()
          }
        })
    },
    initTimesheet () {
      this.id = this.$route.query.id
      let timesheet = this.$route.query.timesheet
      let jsonTime = JSON.parse(timesheet)
      let that = this
      axios
        .post('kernel/timesheet/queryOne', require('qs').stringify({
          years: jsonTime.years,
          months: jsonTime.months,
          emId: jsonTime.emId
        }))
        .then(function (res) {
          that.timesheet = res.data.obj
          that.years = res.data.obj.years
          that.months = res.data.obj.months
          that.ecInfo = {
            emId: that.timesheet.emId,
            emName: that.timesheet.emName,
            cstId: that.timesheet.cstId,
            cstName: that.timesheet.cstName
          }
          that.value = moment(res.data.obj.years + '-' + res.data.obj.months).format('yyyy-MM')
        })
    },
    handleClose () {
      this.editVisiable = false
    },
    edit (day) {
      this.tempDate = day
      this.day = this.initTs(day)
      this.editVisiable = true
    },
    initTs (date) {
      let day = date.split('-')[2]
      let months = date.split('-')[1]
      let years = date.split('-')[0]
      let tMonths = ''
      console.log(months)
      if (this.timesheet.months < 10) {
        tMonths = '0' + this.timesheet.months
      } else {
        tMonths = this.timesheet.months + ''
      }
      if (years !== this.timesheet.years + '' || tMonths !== months) {
        return ''
      }
      if (day === '01') {
        return this.timesheet.day01
      } else if (day === '02') {
        return this.timesheet.day02
      } else if (day === '03') {
        return this.timesheet.day03
      } else if (day === '04') {
        return this.timesheet.day04
      } else if (day === '05') {
        return this.timesheet.day05
      } else if (day === '06') {
        return this.timesheet.day06
      } else if (day === '07') {
        return this.timesheet.day07
      } else if (day === '08') {
        return this.timesheet.day08
      } else if (day === '09') {
        return this.timesheet.day09
      } else if (day === '10') {
        return this.timesheet.day10
      } else if (day === '11') {
        return this.timesheet.day11
      } else if (day === '12') {
        return this.timesheet.day12
      } else if (day === '13') {
        return this.timesheet.day13
      } else if (day === '14') {
        return this.timesheet.day14
      } else if (day === '15') {
        return this.timesheet.day15
      } else if (day === '16') {
        return this.timesheet.day16
      } else if (day === '17') {
        return this.timesheet.day17
      } else if (day === '18') {
        return this.timesheet.day18
      } else if (day === '19') {
        return this.timesheet.day19
      } else if (day === '20') {
        return this.timesheet.day20
      } else if (day === '21') {
        return this.timesheet.day21
      } else if (day === '22') {
        return this.timesheet.day22
      } else if (day === '23') {
        return this.timesheet.day23
      } else if (day === '24') {
        return this.timesheet.day24
      } else if (day === '25') {
        return this.timesheet.day25
      } else if (day === '26') {
        return this.timesheet.day26
      } else if (day === '27') {
        return this.timesheet.day27
      } else if (day === '28') {
        return this.timesheet.day28
      } else if (day === '29') {
        return this.timesheet.day29
      } else if (day === '30') {
        return this.timesheet.day30
      } else if (day === '31') {
        return this.timesheet.day31
      }
      return ''
    },
    currentMonth (date) {
      let months = date.split('-')[1]
      let years = date.split('-')[0]
      let tMonths = ''
      console.log(months)
      if (this.timesheet.months < 10) {
        tMonths = '0' + this.timesheet.months
      } else {
        tMonths = this.timesheet.months + ''
      }
      if (years !== this.timesheet.years + '' || tMonths !== months) {
        return false
      }
      return true
    },
    setTs (date) {
      let day = date.split('-')[2]
      let months = date.split('-')[1]
      let year = date.split('-')[0]
      if (this.currentMonth(date)) {
        this.timesheet.years = year
        this.timesheet.months = months
      } else {
        this.timesheet = {}
        this.timesheet = {
          ...this.ecInfo
        }
        this.timesheet.years = year
        this.timesheet.months = months
      }

      if (day === '01') {
        this.timesheet.day01 = this.day
      } else if (day === '02') {
        this.timesheet.day02 = this.day
      } else if (day === '03') {
        this.timesheet.day03 = this.day
      } else if (day === '04') {
        this.timesheet.day04 = this.day
      } else if (day === '05') {
        this.timesheet.day05 = this.day
      } else if (day === '06') {
        this.timesheet.day06 = this.day
      } else if (day === '07') {
        this.timesheet.day07 = this.day
      } else if (day === '08') {
        this.timesheet.day08 = this.day
      } else if (day === '09') {
        this.timesheet.day09 = this.day
      } else if (day === '10') {
        this.timesheet.day10 = this.day
      } else if (day === '11') {
        this.timesheet.day11 = this.day
      } else if (day === '12') {
        this.timesheet.day12 = this.day
      } else if (day === '13') {
        this.timesheet.day13 = this.day
      } else if (day === '14') {
        this.timesheet.day14 = this.day
      } else if (day === '15') {
        this.timesheet.day15 = this.day
      } else if (day === '16') {
        this.timesheet.day16 = this.day
      } else if (day === '17') {
        this.timesheet.day17 = this.day
      } else if (day === '18') {
        this.timesheet.day18 = this.day
      } else if (day === '19') {
        this.timesheet.day19 = this.day
      } else if (day === '20') {
        this.timesheet.day20 = this.day
      } else if (day === '21') {
        this.timesheet.day21 = this.day
      } else if (day === '22') {
        this.timesheet.day22 = this.day
      } else if (day === '23') {
        this.timesheet.day23 = this.day
      } else if (day === '24') {
        this.timesheet.day24 = this.day
      } else if (day === '25') {
        this.timesheet.day25 = this.day
      } else if (day === '26') {
        this.timesheet.day26 = this.day
      } else if (day === '27') {
        this.timesheet.day27 = this.day
      } else if (day === '28') {
        this.timesheet.day28 = this.day
      } else if (day === '29') {
        this.timesheet.day29 = this.day
      } else if (day === '30') {
        this.timesheet.day30 = this.day
      } else if (day === '31') {
        this.timesheet.day31 = this.day
      }
    }
  }
}
</script>

<style scoped>

</style>
