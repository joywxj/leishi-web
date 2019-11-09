<template>
  <div>
    <h1 align="center">{{name}}银行卡信息</h1>
    银行名称: <select v-model="bankName"><option>请选择</option>
    <option v-for="item in banks" v-bind:value="item.value" v-bind:key="item.value">{{ item.value}}</option>
  </select>&nbsp;
    银行卡号:<input v-model="bankCard" maxlength="18">
    <input type="button" @click="queryBank()" value="查   询" />
    <input type="button" @click="add()" value="添   加" />
    <input type="button" @click="back()" value="返回员工信息页面" />
    <div>
      <table>
        <tr align="center">
          <td>银行名称</td>
          <td>银行卡号</td>
          <td>开户行</td>
          <td>银行地址</td>
          <td>类型</td>
          <td>修改</td>
          <td>删除</td>
        </tr>
        <tr align="center" v-bind:key="site.bankName" v-for="site in sites">
          <td>{{ site.bankName }}</td>
          <td>{{ site.bankCard }}</td>
          <td>{{ site.bankDeposit }}</td>
          <td>{{ site.bankAddress }}</td>
          <td>{{ site.sign }}</td>
          <td><button v-on:click="update(site.id)">修改</button></td>
          <td><button v-on:click="remove(site.id)">删除</button></td>
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
      name: '',
      banks: [],
      sites: []
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
      var that = this;
      axios.post('/kernel/bank/queryBanks').then(function (res){
        that.banks = res.data.obj
      })
    },
    queryBank: function (){
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
