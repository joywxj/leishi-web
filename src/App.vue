<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container >
      <el-header>
        <!-- 导航栏 -->
        <header-nav></header-nav>
      </el-header>
      <el-container>
        <el-aside  width="250px">
          <!-- 侧边栏 -->
          <left></left>
        </el-aside>
        <el-main>
          <!-- Body -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import header from './view/Header.vue'
import left from './view/Left.vue'

export default {
  name: 'App',
  components: {
    headerNav: header,
    left: left
  }
}
</script>
