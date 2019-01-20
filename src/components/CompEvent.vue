<template>
  <div>
    <p>{{ total }}</p>
    <button-counter v-on:increment="incrementTotal"></button-counter>
    <button-counter v-on:increment="incrementTotal"></button-counter>
  </div>
  <!--
   1、创建一人组件
   2、写方法 -->
</template>

<script>
  export default {
    data (){
      return {
        total: 0
      }
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      }
    },
    components: {
      'button-counter': {
        template: '<button v-on:click="buttonTotal">{{ counter }}</button>',
        data: function (){
          return {
            counter: 0
          }
        },
        methods: {
          buttonTotal: function () {
            this.counter += 1
            this.$emit('increment')
          }
        }
      }
    }
  }
</script>
