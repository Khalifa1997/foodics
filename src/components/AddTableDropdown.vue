<template>
  <AppDropdown v-model="show">
    <template #selected>
      <span
        v-for="table in selectedTables"
        :key="table.id"
        class="border-2 border-blue-400 rounded-md px-2 py-1 text-xs flex min-w-fit mr-1 mb-1"
        >{{ `${table.section_name} - ${table.name}` }}</span
      >
    </template>
    <template #options>
      <a
        v-for="table in availableTables"
        :key="table.id"
        @click="selectTable(table)"
        class="text-gray-700 px-4 py-2 text-xs"
        >{{ `${table.section_name} - ${table.name}` }}</a
      >
    </template></AppDropdown
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppDropdown from "./AppDropdown.vue";

export default defineComponent({
  components: {
    AppDropdown,
  },
  props: {
    selectedTables: Array,
    options: Array,
  },
  data: function () {
    return {
      show: false,
    };
  },
  model: {
    prop: "selectedTables",
    event: "selectTables",
  },
  methods: {
    selectTable(table) {
      this.$emit("selectTables", [...this.selectedTables, table]);
      this.show = false;
    },
  },
  computed: {
    tables: function () {
      return this.options
        .map((section) =>
          section.tables.map((table) => {
            return { ...table, section_name: section.name };
          })
        )
        .flat(1);
    },
    availableTables: function () {
      const selectedTablesIds = this.selectedTables.map((e) => e.id);
      return this.tables.filter((e) => !selectedTablesIds.includes(e.id));
    },
  },
});
</script>

<style scoped></style>
