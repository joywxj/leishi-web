<template>
  <!-- 修改员工 -->
  <div>
    <h1 style="margin-left: 200px;">添加员工{{id}}</h1>
    姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:<input type="text"  v-model="name" />&nbsp;&nbsp;&nbsp;&nbsp;
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<input v-model="age">&nbsp;&nbsp;&nbsp;&nbsp;<br>
    联系电话:<input v-model="phone" maxlength="11">&nbsp;&nbsp;&nbsp;&nbsp;
    通讯地址:<input v-model="commAddress"><br/>
    家庭地址:<input v-model="homeAddress">&nbsp;&nbsp;&nbsp;&nbsp;
    薪资等级:<select v-model="salary">
    <option>请选择</option>
    <option v-for="item in salaryGrade" v-bind:value="item.keywords">{{ item.value}}</option>
  </select><br/><br/>
    <input style="margin-left: 250px" type="button" @click="sub()" value="提        交" />
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        id:'',
        name: '',
        phone: '',
        commAddress: '',
        homeAddress: '',
        salaryGrade: [],
        salary: 1,
        age: '',
        idVeMessage: '',
      }
    },
    mounted(){
      this.querySalary(),
      this.queryEmployee()
    },
    methods: {//定义方法
      querySalary: function () {
        var that = this;
        axios.post('/kernel/employee/salaryGrade').then(function (res){
          that.salaryGrade = res.data.obj
        })
      },
      queryEmployee: function () {
        var id = this.$route.query.id;
        this.id = id;
        var qs = require('qs');
        axios.post('/kernel/employee/queryEmpById',qs.stringify(
          {id:id}
        )).then(function (res){
          that.age = res.data.obj.age;
        })
      },
      sub: function (){
        var that=this;
        var qs = require('qs');
        axios.post('/kernel/employee/modify',qs.stringify({
          name: this.name,
          id: this.id,
          phone: this.phone,
          commAddress: this.commAddress,
          homeAddress: this.homeAddress,
          salaryGrade: this.salary,
          age: this.age
        })).then(function (res){
          if(res.data.status == 1){
            alert('修改成功')
          }else{
            alert('修改失败')
          }
        })
      }
    }
  }
</script>
