<template>
  <div>
      <div v-bind:class="{ active: isActive,ttt: maybeError }"></div>
      <div v-bind:class="classObject"></div>
      <!-- <div v-bind:class="[activeCalss,ErrorClass]"></div> -->
      <div v-bind:style="styleObject">我是帅哥</div>
  </div>
</template>
<style>
  .active {
  	width: 100px;
  	height: 100px;
  	background: red;
  }
  .ttt {
    	width: 100px;
    	height: 100px;
    	background: yellow;
    }
    .yyy {
        	width: 100px;
        	height: 100px;
        	background: green;
        }
</style>
<script>
export default{
  data () {
    return {
      isActive: true,
      maybeError: false,
      classObject: {
        active: true,
        ttt: true
      },
      activeCalss: 'active',
      ErrorClass: 'yyy',
      styleObject: {
        color: 'red',
        fontSize: '100px'
      }
    }
  }
}
</script>
