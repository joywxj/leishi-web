<template>
   <div>
      <el-form v-model="employee">
        <el-form-item label="用户名">
          <el-input v-model="employee.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="employee.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      employee: {}
    }
  },
  methods: {
    login () {
      let qs = require('qs')
      let that = this
      axios.post('kernel/employee/login', qs.stringify(that.employee)).then(function (res) {
        if (res.data.obj) {
          that.$router.push({path: '/'})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
