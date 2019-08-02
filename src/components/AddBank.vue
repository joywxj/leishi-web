<template>
  <!-- 修改员工 -->
  <div>
    <h1 align="center">银行卡信息</h1>
    {{name}} ,你好，您正在添加银行卡信息<br>
    银行卡号:<input type="text"  v-model="bankCard" />
    银行名称:<select v-model="bankName">
    <option>请选择</option>
    <option v-for="item in banks" :value="item.value" :key="item.value">{{ item.value}}</option>
  </select>
    <br>
    银行地址:<input v-model="bankAddress">
    开  户  行:<input v-model="bankDeposit">&nbsp;&nbsp;&nbsp;
    <br/>
    状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:<select v-model="sign">
    <option>请选择</option>
    <option v-for="item in statuss" :value="item.key" :key="item.keywords">{{ item.value}}</option>
  </select>
    <br/>
    <input style="margin-left: 250px" type="button" @click="sub()" value="提        交" />
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        bankAddress:'',
        bankCard:'',
        bankName:'',
        bankDeposit:'',
        sign:1,
        id: '',
        name: '',
        banks: [],
        statuss:[{'key':1,value:'常用'},{'key':0,value:'备用'}]
      }
    },
    mounted () {
      this.querySalary()
      this.queryEmployee()
    },
    methods: {// 定义方法
      queryEmployee: function (){
        var emId = this.$route.query.id
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
        axios.post('/kernel/bank/queryBanks').then(function (res) {
          that.banks = res.data.obj
        })
      },
      sub: function () {
        var emId = this.$route.query.id
        var that = this
        var qs = require('qs')
        axios.post('/kernel/bank/add', qs.stringify({
          bankCard: this.bankCard,
          bankName: this.bankName,
          bankDeposit: this.bankDeposit,
          bankAddress: this.bankAddress,
          sign : this.sign,
          emId : emId
        })).then(function (res) {
          if (res.data.status === 1) {
            that.$router.push({path:'bank',query:{'id':emId}});
          } else {
            alert('修改失败')
          }
        })
      }
    }
  }
</script>
