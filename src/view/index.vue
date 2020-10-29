<template>
  <div>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import header from './Header.vue'
import left from './Left.vue'

export default {
  name: 'App',
  components: {
    headerNav: header,
    left: left
  }
}
</script>
