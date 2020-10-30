<template>
  <div :style="{backgroundImage:'url('+require('../assets/header.png')+')'}">
    <el-container>
      <el-header style="text-align: right">
        <font color="409EFF">欢迎来到军军建筑管理平台</font>
        <el-button type="primary">退出</el-button>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
