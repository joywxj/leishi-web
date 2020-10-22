<template>
  <!-- 修改员工 -->
  <div>
    <h1 align="center">{{name}} ,你好，您正在维护您的银行卡信息</h1>
    <div class="form-col">
      <el-form :inline="true" :label-position="labelPosition" :model="bank" class="from" label-width="80px">
        <div class="form content">
          <el-form-item label="银行卡号">
            <el-input type="text" v-model="bank.bankCard"/>
          </el-form-item>
          <el-form-item label="银行名称">
            <el-select v-model="bank.bankName">
              <el-option>请选择</el-option>
              <el-option
                :key="item.paramCode"
                :label="item.showValue"
                :value="item.paramCode"
                v-for="item in bankTypeDict"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="银行地址">
            <el-input v-model="bank.bankAddress"/>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="bank.bankDeposit"/>
          </el-form-item>
        </div>
        <div class="form content">
          <el-form-item label="状态">
            <el-select v-model="bank.sign">
              <el-option
                :key="item.keywords"
                :label="item.value"
                :value="item.key"
                v-for="item in statuss">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="sub()" style="margin-left: 250px" type="primary">提 交</el-button>
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
      bankAddress: '',
      bankCard: '',
      bankName: '',
      bankDeposit: '',
      sign: 1,
      id: '',
      name: '',
      bankTypeDict: [],
      bank: {},
      labelPosition: 'right',
      statuss: [{'key': '1', value: '常用'}, {'key': '0', value: '备用'}]
    }
  },
  mounted () {

    this.querySalary()
    this.queryEmployee()
    let id = this.$route.query.id
    if (id) {
      this.querybank()
    }
  },
  methods: {// 定义方法
    querybank: function () {
      var id = this.$route.query.id
      this.id = id
      var that = this
      var qs = require('qs')
      axios.post('/kernel/bank/query', qs.stringify(
        {id: id,page: 1, size: 10}
      )).then(function (res) {
        if (res.data.obj.list[0].sign === '常用') {
          that.sign = 1
        } else {
          that.sign = 0
        }
        that.bank= res.data.obj.list[0]
        // that.name = res.data.obj.list[0].emId
      })
    },
    queryEmployee: function () {
      var emId = this.$route.query.emId
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/queryEmpById', qs.stringify(
        {id: emId}
      )).then(function (res) {
        that.name = res.data.obj.name
      })
    },
    querySalary: function () {
      var that = this
      var qs = require('qs')
      axios.post('/kernel/dictionary/list', qs.stringify({typeCode: 'bank'})).then(function (res) {
        that.bankTypeDict = res.data.obj
      })
    },
    sub: function () {
      var emId = this.$route.query.emId
      var that = this
      that.bank.emId = emId
      var qs = require('qs')
      let url = this.$route.query.id ? '/kernel/bank/modify' : '/kernel/bank/add'
      axios.post(url, qs.stringify(that.bank)).then(function (res) {
        if (res.data.status === 1) {
          that.$router.push({path: 'bank', query: {'id': emId}})
        } else {
          this.$message({
            message: '更新失败',
            type: 'error'
          })
        }
      }).catch(error => {
        this.$message({
          message: error.data.message,
          type: 'error'
        })
      })
    }
  }
}
</script>
<style>
  @import '../../assets/utils.css';
</style>
