<template>
    <div>
      <el-form>
        <el-form-item label="姓名" prop="name">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <el-button @click="getList">查询</el-button>
    </div>
</template>

<script>
import {list} from '@/api/advance'
export default {
  name: 'advanceIndex',
  methods: {
    // 查询
    getList () {
      let param = {
        id: 1
      }
      list(param).then(result => {

      })
    }
  }
}
</script>

<style scoped>

</style>
