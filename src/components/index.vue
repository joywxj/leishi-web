<template>
  <div></div>
</template>

<style>
  .el-container {
    height: 100%;
  }
  .el-header, .el-footer {
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    display: block;
    left: 0;
    top: 70px;
    bottom: 0;
  }

  .el-main {
    color: #333;
    text-align: -moz-center;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
  }

  .el-container:nth-child(7) .el-aside {
  }
</style>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
