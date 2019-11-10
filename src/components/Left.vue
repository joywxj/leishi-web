<template>
  <div>
    <el-aside width="100%">
      <!-- background-color="#409EFF" -->
          <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            router="true"
            text-color="#409EFF"
            active-text-color="#ffd04b">
            <template  v-for="(item, index) in nav_menu_data">
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
      nav_menu_data: [{
        title: '员工管理',
        path: '/Employee'
      }, {
        title: '工时管理',
        path: '/ts'
      }, {
        title: '借支管理',
        path: '/Menu/Page3'
      }, {
        title: '',
        path: '/Menu/Page4'
      }]
    }
  }
}
</script>

<style scoped>

</style>
