<template>
  <div class="relative z-10" role="dialog" aria-modal="true">
    <div
      class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
});
</script>

<style scoped></style>
