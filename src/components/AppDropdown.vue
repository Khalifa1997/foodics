<template>
  <div class="relative inline-block text-left w-full">
    <div
      class="flex flex-wrap w-full justify-start rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      id="menu-button"
      style="min-width: 100px"
      @click="toggleShow"
    >
      <slot name="selected"></slot>

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
    </div>

    <div
      class="absolute right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1 flex flex-col"
      role="menu"
      v-show="show"
    >
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },

  model: {
    prop: "show",
    event: "toggleShow",
  },
  methods: {
    toggleShow() {
      this.$emit("toggleShow", !this.show);
    },
  },
};
</script>

<style lang="scss" scoped></style>
