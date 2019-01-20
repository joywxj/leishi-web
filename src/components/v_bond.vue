<template>
  <div>
    <label for="r1">修改姿色</label>
    <input type="checkbox" v-model="class1" id="r1"/>
    </br>
    <div v-bind:class="{'class1': class1}">
      v-bind指令
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      class1: false
    }
  }
}
</script>
