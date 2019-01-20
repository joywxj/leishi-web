<!-- 组件 -->
<template>
  <div>
      <wxj></wxj><br/>
    <language></language>
    <child message="hello"></child>
<br/>
    <input v-model="parentMsg"/>
    <br/>
    <child v-bind:message="parentMsg"></child><br/>

    <ol>

      <todo-item v-for="item in sites" v-bind:todo="item"></todo-item>
    </ol>

    <p>{{ total }}</p>
    <button-counter v-on:increment="incrementTotal"></button-counter>
    <button-counter v-on:increment="incrementTotal"></button-counter>
  </div>
</template>

<script>
  var child = {
    template: '<h2>English is international language!</h2>'
  }
export default {
    data() {
      return {
        parentMsg: '这是我的天地!',
        sites: [
          { text: '吴兴军' },
          { text: '张启航' },
          { text: '耿锋' }
        ],
        total: 0
      }
    },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  },
  components: {
    'wxj':  {
      template: '<h1>The person you should try to be better than ,<br>is the person you were yestoday!</h1>'
    },
    'language': child,
    'child': {
      props: ['message'],
      template: '<span>{{ message }}</span>'
    },
    'todo-item': {
      props: ['todo'],
      template: '<h1><li>{{ todo.text }}</li></h1>'
    },
    'button-counter': {
      template: '<button v-on:click="incrementHandler">{{ counter }}</button>',
      data: function () {
        return {
          counter: 0
        }
      },
      methods: {
        incrementHandler: function () {
          this.counter += 1
          this.$emit('increment')
        }
      }
    }
  }
}

</script>
