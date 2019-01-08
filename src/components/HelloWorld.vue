<template>
  <div class="hello">
        <input type="button" @click="post()" value="test">
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'HelloWorld',
  methods: {
    post: function (){
      axios.post('/kernel/employee/query', {
        pageIndex: 1,
        pageSize: 10
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
