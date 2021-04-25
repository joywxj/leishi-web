<template>
    <div>
      <el-row>
        <el-col>
          <el-form :form="queryParam">
            <el-form-item label="姓名"  prop="name">
              <el-input style="width: 160px;height: 5px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" size="mini" type="primary" @click="getList">查询</el-button>
              <el-button icon="el-icon-add" size="mini" type="primary" @click="add">添加</el-button>

            </el-form-item>
          </el-form>

        </el-col>
        </el-row>
      <!-- 列表-->
      <div>
        <el-table :data="list" >
          <el-table-column prop="emName" label="员工姓名">
          </el-table-column>
          <el-table-column prop="money" label="借支金额">
          </el-table-column>
          <el-table-column prop="auditTag" :formatter="formatAutid" label="审核状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" size="mini">删除</el-button>
              <el-button type="text" icon="el-icon-edit" @click="update(scope.row.id)" size="mini">修改</el-button>
              <el-button type="text" icon="el-icon-caret-right" @click="audit(scope.row.id)" v-if="scope.row.auditTag === 'wait'" size="mini">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            :total="total"
            :page-sizes="[10, 20, 40, 50, 100]"
            layout=" prev,pager,next,sizes,jumper"
          >
          </el-pagination>
        </div>
      </div>
<!--    编辑  -->
      <advanceEdit v-if="editVisiable" :option="option" :id="id" :form="form" :visible.sync="editVisiable" :title="title"></advanceEdit>
    </div>
</template>

<script>
import {list, getOne} from '@/api/advance'
import {queryDictList} from '@/api/dictionary'
import advanceEdit from './edit'
export default {
  name: 'advanceIndex',
  components: {
    advanceEdit
  },
  data () {
    return {
      // 列表
      list: [],
      id: 0,
      editVisiable: false,
      auditDictList: [],
      total: 0,
      title: '',
      // 查询参数
      queryParam: {
        name: ''
      },
      form: {
        money: 0,
        explain: ''
      }
    }
  },
  mounted () {
    let dictParam = {
      typeCode: 'advance_audit'
    }
    queryDictList(dictParam).then(result => {
      this.auditDictList = result.obj
    })
  },
  methods: {
    // 添加
    add () {
      this.title = '添加'
      this.option = 'add'
      this.editVisiable = true
    },
    audit (id) {
      this.title = '审核'
      this.option = 'audit'
      this.editVisiable = true
      this.id = id
      getOne(this.id).then(result => {
        this.form = result.obj
      })
    },
    // TODO 修改
    update (id) {
      this.title = '修改'
      this.option = 'update'
      this.editVisiable = true
      this.id = id
      getOne(this.id).then(result => {
        this.form = result.obj
      })
    },
    /**
     *格式化审核
     * @param row
     * @returns {string}
     */
    formatAutid (row) {
      let result = ''
      this.auditDictList.forEach(item => {
        if (row.auditTag === item.paramCode) {
          result = item.showValue
        }
      })
      return result
    },
    // 查询
    getList () {
      list(this.queryParam).then(result => {
        this.list = result.obj.list
        this.total = result.obj.totalCount
      })
    }
  }
}
</script>

<style scoped>

</style>
