<template>
  <button class="bg-purple-800 rounded-lg px-4 py-2 text-white">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: String,
  },
});
</script>

<style scoped></style>
