<template>
  <div
    :class="[
      'fixed overflow-auto bg-black bg-opacity-90 left-0 top-0 mx-auto w-full h-full z-1 ',
    ]"
    :style="modelValue ? 'display:block;' : 'display:none;'"
  >
    <div class="p-2 bg-white opacity-100 w-5/6 mx-auto my-5">
      <slot name="body"></slot>
      <div class="bg-gray-50 px-4 py-3 flex gap-3 justify-end">
        <slot name="footer" :close="toggleShow"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    modelValue: Boolean,
  },
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  methods: {
    toggleShow() {
      this.$emit("update:modelValue", false);
    },
  },
});
</script>

<style scoped></style>
