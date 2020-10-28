<template>
    <div>
<!--   工时详情页面   -->
      <el-calendar v-model="value">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{type, date, data}"
          prev-text="上个月"
        >
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>
        </template>
      </el-calendar>
    </div>
</template>

<script>
import moment from 'moment' // 导入文件

export default {
  name: 'detail',
  data () {
    return {
      name: '',
      value: new Date()
    }
  },
  mounted () {
    let timesheet = this.$route.query.timesheet
    let jsonTime = JSON.parse(timesheet)
    this.value = moment(jsonTime.years + '-' + jsonTime.months).format('yyyy-MM')
  }
}
</script>

<style scoped>

</style>
