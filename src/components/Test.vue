<template>
  <div id="history">
    <ul>
      <li class="historyitem"
          v-for="item in notes"
          class="historyitem"
          :class="{haha: activeNote===item}"

          @click="updateActiveNote(item)"

      >{{item.text}}
        <input type="text"
               v-model="item.text"
               v-if="activeNote===item &&activeNote.show"
               @keyup.enter="done()"
               @blur = "done()"

        >

        <button class="rnbtn"
                @click="ak">rename</button>
      </li>

    </ul>
  </div>
</template>

<script>
  import { updateActiveNote } from '../vuex/actions'
  export default {
    vuex: {
      getters: {
        notes: state => state.notes,
        activeNote: state => state.activeNote
      },
      actions: {
        updateActiveNote
      }
    },
    methods: {
      done: function(e){
        this.activeNote.show = false
      },
      ak: function(e){
        this.activeNote.show = true
      }
    },


  }
