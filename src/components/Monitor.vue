<template>
  <div>
        <p>赞: {{ count }}</p>
        <button @click="count++">点赞</button><br>
        <button @click="count--">踩</button><br>
        千米: <input type="text" v-model="kilometers"><br>
        米: <input type="text" v-model="meters"><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      kilometers: 0,
      meters: 0
    }
  },
  watch: {
    function (curVal,oldVal){},
    kilometers: function (val){
       this.kilometers = val;
       this.meters = val*1000;
    },
    meters: function (val){
       this.kilometers = val/1000;
       this.meters = val;
    }
  }
}
</script>
