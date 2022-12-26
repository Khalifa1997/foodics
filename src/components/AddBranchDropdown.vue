<template>
  <AppDropdown v-model="show">
    <template #selected>
      <span
        v-for="branch in items"
        :key="branch.id"
        class="border-2 border-blue-400 rounded-md px-2 py-1 mr-2 text-xs"
        >{{ formatBranch(branch) }}</span
      >
    </template>
    <template #options>
      <a
        v-for="item in availableBranches"
        :key="item.id"
        @click="selectBranch(item)"
        class="text-gray-700 px-4 py-2 text-xs"
        >{{ item.name + ` (${item.reference})` }}</a
      >
    </template>
  </AppDropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppDropdown from "./AppDropdown.vue";

export default defineComponent({
  components: { AppDropdown },
  props: {
    items: Array,
    options: Array,
  },
  model: {
    prop: "items",
    event: "branches",
  },
  data: function () {
    return {
      show: false,
    };
  },
  methods: {
    formatBranch(branch) {
      return branch.name + ` (${branch.reference})`;
    },
    selectBranch(branch) {
      this.show = false;
      this.$emit("branches", [...this.items, branch]);
    },
  },
  computed: {
    availableBranches: function () {
      const selected = this.items.map((el) => el.id);
      return this.options.filter((el) => !selected.includes(el.id));
    },
  },
});
</script>

<style scoped></style>
