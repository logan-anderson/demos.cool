<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <div>Hello World!</div>
    <button @click="increment">Clicked {{ count }} times</button>
  </div>
</template>
