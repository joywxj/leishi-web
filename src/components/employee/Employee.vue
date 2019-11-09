<template>
  <div>
    <h1 align="center">员工查询</h1>
    姓名:<input type="text"  v-model="name" />
    身份证号:<input v-model="identity" maxlength="18">
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<input v-model="age">
    联系电话:<input v-model="phone" maxlength="11" >
    薪资等级:<select v-model="salary">
    <option>请选择</option>
    <option v-for="item in salaryGrade" v-bind:value="item.keywords">{{ item.value}}</option>
  </select>&nbsp;
    <input type="button" @click="queryEmployee()" value="查   询" />
    <div>
      <table>
        <tr align="center">
          <td>姓名</td>
          <td>年龄</td>
          <td>电话号码</td>
          <td>身份证号</td>
          <td>登录用户名</td>
          <td>状态</td>
          <td>通讯地址</td>
          <td>修改时间</td>
          <td>银行信息</td>
          <td>修改</td>
          <td>删除</td>
        </tr>
        <tr align="center"  v-for="site in sites">
            <td>{{ site.name }}</td>
            <td>{{ site.age }}</td>
            <td>{{ site.phone }}</td>
            <td>{{ site.identity }}</td>
            <td>{{ site.userName }}</td>
            <td>{{ site.status }}</td>
            <td>{{ site.commAddress }}</td>
            <td>{{ site.updateTime }}</td>
          <td><button v-on:click="bankInfo(site.id)">查询银行信息</button></td>
          <td><button v-on:click="update(site.id)">修改</button></td>
          <td><button v-on:click="remove(site.id)">删除</button></td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {

    data () {
      return {
        name: '',
        identity: '',
        phone: '',
        salaryGrade: [],
        salary: '',
        userName:'',
        age: '',
        sites: []
      }
    },
    mounted(){
      this.querySalary()
      this.queryEmployee()
    },
    methods: {//定义方法,
      remove: function (id) {
        var that = this;
        var qs = require('qs');

        axios.post('/kernel/employee/remove',qs.stringify({
          id:id
        })).then(function(res){
          if(res.data.status == 1){
            alert('删除成功');
            that.$router.go(0);
          }
        })
      },
      bankInfo: function (id) {
        var that = this;
        setTimeout(
          function () {
            that.$router.push({path:'bank',query:{'id':id}});
          }
        )
      },
      update: function (id){
        var that = this;
        setTimeout(
          function () {
            that.$router.push({path:'updateEmployee',query:{'id':id}});
          }
        )
      },
     querySalary: function () {
        var that = this;
        axios.post('/kernel/employee/salaryGrade').then(function (res){
          that.salaryGrade = res.data.obj
        })
      },
      queryEmployee: function (){
        var that=this;
        var qs = require('qs');
        if(this.salary =='请选择'){
          this.salary = '';
        }
        axios.post('/kernel/employee/query',qs.stringify({
          name: this.name,
          identity: this.identity,
          phone: this.phone,
          salaryGrade: this.salary,
          userName: this.userName,
          age: this.age
        })).then(function (res){
          that.sites =res.data.obj.list
        })
      }
    }
  }
</script>
