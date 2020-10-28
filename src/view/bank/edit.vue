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
            <el-select @change="checkSign()" v-model="bank.sign">
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
    var verifybankCark = () => {
      var regex = new RegExp('([0-9]{17}([0-9]|X|x))|([0-9]{15})')
      if (!regex.test(this.bank.bankCard)) {
        this.$message({
          type: 'error',
          message: '亲爱的，你的银行卡号格式不对哦^_^'
        })
        return false
      }
    }
    return {
      bankAddress: '',
      bankCard: '',
      bankName: '',
      bankDeposit: '',
      sign: 1,
      emId: this.$route.query.emId,
      id: '',
      name: '',
      bankRules: {
        bankCard: [
          {required: true, message: '银行卡号不能为空', trigger: 'blur'},
          {validator: verifybankCark, trigger: 'blur'}
        ]
      },
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
    checkSign () {
      var qs = require('qs')
      if (this.bank.sign === '1') {
        let that = this
        axios.post('/kernel/bank/query', qs.stringify({
          page: 1,
          size: 10,
          emId: that.emId,
          sign: 1
        })).then(function (res) {
          console.log(res)
          if (res.data.obj.list.length > 0 && that.bank.bankCard !== res.data.obj.list[0].bankCard) {
            that.$message({
              tppe: 'warning',
              message: that.name + '已经存在常用银行卡,请先将:' + res.data.obj.list[0].bankCard + '改为备用'
            })
            that.bank.sign = '0'
          }
        })
      }
    },
    querybank: function () {
      var id = this.$route.query.id
      this.id = id
      var that = this
      var qs = require('qs')
      axios.post('/kernel/bank/query', qs.stringify(
        {id: id, page: 1, size: 10}
      )).then(function (res) {
        that.bank = res.data.obj.list[0]
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
          that.$router.push({path: '/bank', query: {'id': emId}})
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
