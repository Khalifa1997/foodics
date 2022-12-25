<template>
  <div class="relative inline-block text-left" v-if="items.length">
    <div>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="menu-button"
        @click="toggleShow"
      >
        <span
          v-for="branch in selected"
          :key="branch.id"
          class="border-2 border-blue-400 rounded-md px-2 py-1 mr-2 text-xs"
          >{{ formatBranch(branch) }}</span
        >
        <svg
          class="-mr-1 h-5 w-5 ml-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      class="absolute right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1 flex flex-col"
      role="menu"
      v-show="show"
    >
      <a
        v-for="item in availableBranches"
        :key="item.id"
        @click="selectBranch(item)"
        class="text-gray-700 px-4 py-2 text-xs"
        >{{ item.name + ` (${item.reference})` }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data: function () {
    return {
      show: false,
      selected: [],
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    formatBranch(branch) {
      return branch.name + ` (${branch.reference})`;
    },
    selectBranch(branch) {
      this.selected.push(branch);
      this.toggleShow();
      this.$emit("branches", this.selected);
    },
  },
  computed: {
    availableBranches: function () {
      const selected = this.selected.map((el) => el.id);
      return this.items.filter((el) => !selected.includes(el.id));
    },
  },
};
</script>

<style lang="scss" scoped></style>
