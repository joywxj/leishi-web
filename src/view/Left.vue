<template>
  <div>
    <el-aside width="100%">
      <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            router="true"
            text-color="#409EFF"
            active-text-color="#ffd04b">
        <menu-children :list="menuList"></menu-children>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import MenuChildren from '../component/MenuChildren'
import axios from 'axios'
export default {
  components: {MenuChildren},
  comments: {
    MenuChildren
  },
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
          title: '工地管理',
          path: '/construction'
        },
        {
          title: '工作量管理',
          path: '/workload'
        },
        {
          title: '薪酬管理',
          path: '/salary'
        }
      ]
    }
  },
  mounted () {
    this.queryMenuList()
  },
  methods: {
    queryMenuList () {
      let that = this
      axios.post('kernel/menu/getMenuTree', require('qs').stringify({
        emId: 8
      })).then(res => {
        that.menuList = res.data.obj
      })
    }
  }
}
</script>

<style scoped>

</style>
