<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="zero"
        label="zero">
      </el-table-column>
      <el-table-column
        prop="one"
        label="one">
      </el-table-column>
      <el-table-column
        prop="two"
        label="two">
      </el-table-column>
      <el-table-column
        prop="three"
        label="three">
      </el-table-column>
      <el-table-column
        prop="four"
        label="four">
      </el-table-column>
      <el-table-column
        prop="five"
        label="five">
      </el-table-column>
      <el-table-column
        prop="six"
        label="six">
      </el-table-column>
      <el-table-column
        prop="seven"
        label="seven">
      </el-table-column>
      <el-table-column
        prop="eight"
        label="eight">
      </el-table-column>
      <el-table-column
        prop="nine"
        label="nine">
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-search" @click="math()">查   询</el-button>
    <el-input
      type="textarea"
      :autosize="{ minRows: 6, maxRows: 6 }"
      style="height: 250px; width: 500px;"
      placeholder="请输入内容"
      v-model="text">
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'lettery',
  data () {
    return {
      zero: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
      text: '111117556961',
      tableData: []
    }
  },
  methods: {
    math: function () {
      const split = this.text.split('')
      this.reset()
      split.forEach((item) => {
        if (item === '0') {
          this.zero = this.zero + 1
        }
        if (item === '1') {
          this.one = this.one + 1
        }
        if (item === '2') {
          this.two = this.two + 1
        }
        if (item === '3') {
          this.three = this.three + 1
        }
        if (item === '4') {
          this.four = this.four + 1
        }
        if (item === '5') {
          this.five = this.five + 1
        }
        if (item === '6') {
          this.six = this.six + 1
        }
        if (item === '7') {
          this.seven = this.seven + 1
        }
        if (item === '8') {
          this.eight = this.eight + 1
        }
        if (item === '9') {
          this.nine = this.nine + 1
        }
      })
      this.setTableData()
    },
    setTableData: function () {
      this.tableData = [{
        zero: this.zero,
        one: this.one,
        two: this.two,
        three: this.three,
        four: this.four,
        five: this.five,
        six: this.six,
        seven: this.seven,
        eight: this.eight,
        nine: this.nine
      }]
    },
    reset: function () {
      this.zero = 0
      this.one = 0
      this.two = 0
      this.three = 0
      this.four = 0
      this.five = 0
      this.six = 0
      this.seven = 0
      this.eight = 0
      this.nine = 0
    }
  }
}
</script>

<style scoped>

</style>
