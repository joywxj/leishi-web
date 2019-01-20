<template>
  <div>
    {{ 5+5 }}<br>
    {{ ok ? 'Yes':'No'}}<br>
    {{ message.split('').reverse().join('') }}
  </div>
</template>
<script>
export default {
  data (){
    return {
      ok: false,
      message: '!olleh'
    }
  }

}
</script>
