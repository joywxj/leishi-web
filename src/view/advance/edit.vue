<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :title="title"
      :before-close="beforeClose"
    >
      <el-form :label-position="labelPosition" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="借支金额" prop="money">
              <el-input style="width: 160px;" v-model="form.money"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明" prop="explain">
              <el-input style="width: 160px;" v-model="form.explain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见" prop="auditMessage">
              <el-input style="width: 480px; height: 40px;" type="textarea" v-model="form.auditMessage"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="center">
            <el-button type="primary" size="mini" v-if="option !== 'audit'" @click="submit" icon="el-icon-submit">提交</el-button>
            <el-button type="primary" size="mini" v-if="option === 'audit'" @click="audit('pass')" icon="el-icon-submit">审核通过</el-button>
            <el-button type="primary" size="mini" v-if="option === 'audit'" @click="audit('noPass')" icon="el-icon-submit">审核不通过</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {add, modify, audit} from '@/api/advance'
export default {
  name: 'advanceEdit',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    option: {
      type: String,
      default: 'add'
    },
    id: {
      type: Number,
      default: 0
    },
    form: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      labelPosition: 'right'
    }
  },
  mounted () {

  },
  methods: {
    beforeClose () {
      this.$emit('update:visible', false)
    },
    submit () {
      if (this.option === 'add') {
        add(this.form).then(() => {
          this.$message({
            type: 'success',
            message: '成功'
          })
          this.beforeClose()
        })
      } else {
        modify(this.form).then(() => {
          this.$message({
            type: 'success',
            message: '成功'
          })
          this.beforeClose()
        })
      }
    },
    // 审核
    audit (message) {
      audit(this.form).then(() => {
        this.$message({
          type: 'success',
          message: '成功'
        })
        this.beforeClose()
      })
    }
  }
}
</script>

<style scoped>

</style>
