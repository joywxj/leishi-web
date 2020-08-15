<template>
  <div>
    <h1 align="center">{{name}}银行卡信息</h1>&nbsp;
    <el-form inline="true" model="bank">
      <el-row>
        <el-form-item label="银行名称">
          <el-select v-model="bank.bankName">
            <el-option
              :key="item.paramCode"
              :label="item.showValue"
              :value="item.paramCode"
              v-for="item in banks">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input maxlength="18" v-model="bank.bankCard"/>
        </el-form-item>
        <el-button @click="queryBank()" type="primary">查 询</el-button>
        <el-button @click="add()" type="primary">添 加</el-button>
        <el-button @click="back()" type="primary">返回员工信息页面</el-button>
      </el-row>
    </el-form>
    <div>
      <el-table
        :data="list"
        empty-text="暂无数据"
        style="width: 100% ;align-content: center;align-items: center">
        <el-table-column
          label="银行名称"
          prop="bankName"
          style="header-align: center"
          width="80px">
        </el-table-column>
        <el-table-column
          label="开户行"
          prop="bankCard"
          style="header-align: center"
          width="80px">
        </el-table-column>
        <el-table-column
          label="开户行"
          prop="bankCard"
          style="header-align: center"
          width="80px">
        </el-table-column>
        <el-table-column
          label="银行地址"
          prop="bankName"
          style="header-align: center"
          width="80px">
        </el-table-column>
        <el-table-column
          label="类型"
          prop="bankName"
          style="header-align: center"
          width="80px">
        </el-table-column>
        <el-table-column
          label="银行名称"
          prop="bankName"
          style="header-align: center"
          width="80px">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      banks: [],
      sites: [],
      bank: {
        bankName: ''
      }
    }
  },
  mounted () {
    this.queryBanks()
    this.queryBank()
    this.queryEmployee()
  },
  methods: {// 定义方法,
    back: function () {
      this.$router.push({path: 'Employee'})
    },
    queryEmployee: function () {
      var emId = this.$route.query.id
      var that = this
      var qs = require('qs')
      axios.post('/kernel/employee/queryEmpById', qs.stringify(
        {id: emId}
      )).then(function (res) {
        that.name = res.data.obj.name
      })
    },
    add: function () {
      var emId = this.$route.query.id
      var that = this
      setTimeout(
        function () {
          that.$router.push({path: 'addBank', query: {'id': emId}})
        }
      )
    },
    remove: function (id) {
      var that = this
      var {stringify} = require('qs')
      axios.post('/kernel/bank/remove', stringify({
        id: id
      })).then(function (res) {
        if (res.data.status === 1) {
          alert('删除成功')
          that.$router.go(0)
        }
      })
    },
    update: function (id) {
      var emId = this.$route.query.id
      var that = this
      setTimeout(
        function () {
          that.$router.push(
            {
              path: 'updateBank',
              query: {
                'id': id,
                'emId': emId
              }
            }
          )
        }
      )
    },
    queryBanks: function () {
      var that = this
      let params = {
        typeCode: 'bank'
      }
      var qs = require('qs')
      axios.post('/kernel/dictionary/query', qs.stringify(params)).then(function (res) {
        that.banks = res.data.obj
      })
    },
    queryBank: function () {
      var emdId = this.$route.query.id
      var that = this
      var qs = require('qs')
      if (this.salary === '请选择') {
        this.salary = ''
      }
      axios.post('/kernel/bank/query', qs.stringify({
        emId: emdId,
        bankCard: this.bankCard,
        bankName: this.bankName
      })).then(function (res) {
        that.sites = res.data.obj.list
      })
    }
  }
}
</script>
