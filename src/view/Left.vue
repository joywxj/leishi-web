<template>
  <div>
    <el-aside width="100%">
          <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            router="true"
            text-color="#409EFF"
            active-text-color="#ffd04b">
            <template  v-for="(item, index) in menuList">
              <el-menu-item :index = "item.path" :key = "index">
                {{item.title}}
              </el-menu-item>
            </template>
          </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data () {
    return {
      path: '',
      menuList: [
        {
        title: '员工管理',
        path: '/employee'
      },
        {
        title: '工时管理',
        path: '/ts'
      },
        {
        title: '借支管理',
        path: '/advance'
      },
        {
        title: '彩票',
        path: '/lettery'
      }]
    }
  }
}
</script>

<style scoped>

</style>
