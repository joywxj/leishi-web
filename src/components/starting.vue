<template>
  <div>
      <h1>site : {{ site }}</h1>
      <h1>url : {{ url }}</h1>
      <h1>details : {{ details }}</h1>
       <h1>method : {{ ours() }}</h1>
  </div>
</template>

<script>
export default {
    data () {
      return {
         site: '思想大于技术',
         url: 'http://www.xj.com',
         details: '我就是世界上最帅的人^_^',
         ours: function() {
             return  '我们学的不仅是技术，更是一种思想！';
          }
      }
    }
  }
</script>
