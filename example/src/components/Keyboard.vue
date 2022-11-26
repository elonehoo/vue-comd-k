<script setup lang="ts">
import { ref } from 'vue'
import keyboard from '@elonehoo/keyboard'
import macKeyboard, { KeyCodeData } from '@elonehoo/vue-mac-keyboard'

const keycode = ref<number[]>([])

document.addEventListener('keyup',onKeyUpEvent)

function onKeyUpEvent(){
  keycode.value.splice(0,keycode.value.length)
}

keyboard('*',(event:any)=>{
  event.preventDefault()
  keycode.value.push(event.keyCode)
})

function macMousedown(el: HTMLLIElement, item: KeyCodeData) {
  if (item.keycode > -1)
    keycode.value.push(item.keycode)
}

function macMouseup(el: HTMLLIElement, item: KeyCodeData) {
  keycode.value.splice(0, keycode.value.length)
}
</script>

<template>
  <div>
    <macKeyboard :key-code="keycode" @mac-mousedown="macMousedown" @mac-mouseup="macMouseup" />
  </div>
</template>

<style scoped>
</style>
