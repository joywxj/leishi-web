<template>
  <div class="hello">
    <input type="button" @click="post()" value="查询">
    <!--  --><div v-for="item in empList">
    <li>{{ item.name }}，{{ item.age }}，{{ item.phone }},{{ item.userName }}，{{ item.salaryGrade }}，{{ item.identity }}</li>
    </div>

    <div>
      分页<input type="button" @click="post()" value='nextPage'> {{ pageIndex }}
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {//这个里面是定义数据的 第一步
        empList: 3,
        pageIndex: 1,
        pageSize: 1
      }
    },
    mounted(){
      this.post() //将方法挂载出来 第三步
    },
    methods: {//定义方法
      post: function (){
        var that=this;
        axios.post('/kernel/employee/query', {
          pageIndex: that.pageIndex,
          pageSize: that.pageSize
        })
          .then(function (res) {//获取的数据赋值给上面定义的数据里面 第二步
            that.empList = res.data.obj.list;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>
