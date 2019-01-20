<template>
<div>
  <p>自动获取焦点{{ ss }}</p>
  <input v-wer>
  <div v-wxj:hello.a.b="ss"></div>
  <div v-ttt="{ color: 'red', text: '吴兴军的学习天地!' }"></div>
</div>
</template>
<script>

export default {
  directives : {
    wer: {
      inserted: function (el) {
        el.focus();
      }
    },
    wxj: {
      bind: function (el, binding, vnode){
        var s = JSON.stringify
        el.innerHTML = 'name:'+ s(binding.name)+
          '<br>value:'+s(binding.value)+
        '<br>expression:'+s(binding.expression)+
        '<br>argument:'+s(binding.argument)+
        '<br>modifiers:'+s(binding.modifiers)+
        '<br>vnode keys:'+Object.keys(vnode).join(', ')
      }
    },
    ttt: {
      bind: function (el ,binding){
        el.innerHTML = binding.value.text
        el.style.backgroundColor = binding.value.color
      }
    }
  },
   data () {
    return {
      ss: 'wxj'
    }
  }
}
</script>
