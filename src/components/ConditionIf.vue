<template>
<!--
  <p v-if="seen"> You look at me ! Now</p>
  <p v-else-if="ok">
    Xingjun Wu is a handsome boy!
  </p>
  <p v-else>
      Ting Hu a nice girl
  </p> -->
  <h1 v-show="ok"> Hello!</h1>
</template>

<script>
export default {
    data () {
      return {
        seen: false,
        ok: true
      }
    }
}
</script>
