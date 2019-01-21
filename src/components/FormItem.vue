<template>
  <div>
    <input v-model="message" placeholder="来，弄死我！">
    <p>{{ message }}</p>
    <p>{{ message2 }}</p>
    <textarea v-model="message2" placeholder="来，弄死我！"></textarea>
    <br>
    <p>复选框</p>

    <input type="checkbox" value="吴兴军" v-model="checkName" id="wxj">
    <label for="wxj">吴兴军</label>
    <input type="checkbox" value="刘静" v-model="checkName" id="lj">
    <label for="lj">刘静</label>
    <input type="checkbox" value="吴兴蓉" v-model="checkName" id="wxr">
    <label for="wxr">吴兴蓉</label>
    选中了{{ checkName }}

    <p>单选框</p><br>
    <input type="radio" v-model="picked" id="rt" value="软通">
    <label for="rt">软通</label>
    <input type="radio" v-model="picked" id="gl" value="格力">
    <label for="gl">格力</label>
<br>
    <h1>  刘静选择的公司是:{{ picked }}</h1>


    <select v-model="selected" name="fruit">
        <option value="">请选择一个媳妇</option>
        <option value="刘静">刘静</option>
        <option value="胡婷">胡婷</option>
    </select>
  <br>
    您选择的媳妇是:{{ selected }}

    <br>
    全选:<br>
    <input type="checkbox" @change="change()" v-model="check">{{ check }}<br>
    <input type="checkbox" value="吴兴军" v-model="checkedNames" id="wxj">
       <label for="wxj">吴兴军</label>
       <input type="checkbox" value="刘静" v-model="checkedNames" id="lj">
       <label for="lj">刘静</label>
       <input type="checkbox" value="吴兴蓉" v-model="checkedNames" id="wxr">
       <label for="wxr">吴兴蓉</label>
<br>
  您选择的是:{{ checkedNames }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello',
      message2: '我本来就是帅哥^_^',
      checked: false,
      check: false,
      checkName:[],
      picked: '格力',
      selected: '',
      checkArr: ['吴兴军','吴兴蓉'],
      change: function (){
        if(this.check){
          this.checkedNames = this.checkArr
        }else{
          this.checkedNames = []
        }
      },
      watch: {
        function (){
           if(this.checkedNames.length = this.checkArr.length){
              this.checked = true
           }else{
              this.checked = false
           }
         }
      }
    }
  }
}
</script>
