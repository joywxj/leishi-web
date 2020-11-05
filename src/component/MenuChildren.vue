<template>
  <div>
    <template v-for="(item, index) in list">
      <el-menu-item v-if="item.children <= 0" :index = "item.path" :key = "index">
        {{item.title}}
      </el-menu-item>
      <el-submenu v-else onclick="item.path" :index="item.path">
        <template slot="title" :index="item.path">{{item.title}}</template>
        <menu-children :list="item.children"></menu-children>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuChildren",
  props: {
    list: Array
  }
}
</script>

<style scoped>

</style>
