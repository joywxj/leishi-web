<template>
  <!-- 添加员工 -->
  <div>
    姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:<input type="text"  v-model="name" /><br/>
    身份证号:<input v-model="identity" v-ident maxlength="18" @mouseleave="verifyIdentity()">{{ idVeMessage }}<br/>
    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:<input v-model="age"><br/>
    联系电话:<input v-model="phone" maxlength="11"><br/>
    登录名称:<input v-model="userName"><br/>
    登录密码:<input TYPE="password" v-model="password"><br/>
    通讯地址:<input v-model="commAddress"><br/>
    家庭地址:<input v-model="homeAddress"><br/>
    薪资等级:<select v-model="salary">
    <option>请选择</option>
    <option v-for="item in salaryGrade" v-bind:value="item.keywords">{{ item.value}}</option>
  </select><br/>
    <input type="button" @click="sub()" value="提交" />
  </div>

</template>

<script>
import axios from 'axios';
export default {
    directives: {
      ident: {
        update: function (el) {
          el.focus();
        }
      }
  },
    data () {
      return {
        name: '',
        identity: '',
        phone: '',
        commAddress: '',
        homeAddress: '',
        salaryGrade: [],
        salary: 1,
        userName:'',
        age: 0,
        password: '',
        idVeMessage: ''
      }
    },
    mounted(){
      this.querySalary()
    },
    methods: {//定义方法
      querySalary: function () {
        var that = this;
        axios.post('/kernel/employee/salaryGrade').then(function (res){
         that.salaryGrade = res.data.obj
        })
      },
      verifyIdentity: function () {
        var qs = require('qs');
        axios.post('/kernel/employee/verifyID',qs.stringify({
          identity: this.identity
        })).then(function (res){
         if(res.data.obj){
           alert(res.data.obj)
         }
        })
      },
      sub: function (){
        var that=this;
        var qs = require('qs');
        axios.post('/kernel/employee/add',qs.stringify({
          name: this.name,
          identity: this.identity,
          phone: this.phone,
          commAddress: this.commAddress,
          homeAddress: this.homeAddress,
          salaryGrade: this.salary,
          userName: this.userName,
          age: this.age,
          password: this.password
        })).then(function (res){

        })
      }
    }
  }
</script>
