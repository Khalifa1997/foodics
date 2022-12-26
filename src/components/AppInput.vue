<template>
  <input
    class="border-2 border-gray-300 rounded-md px-2 py-1"
    style="min-width: 100%"
    :value="value"
    @input="updateValue"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: String,
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
});
</script>

<style scoped></style>
