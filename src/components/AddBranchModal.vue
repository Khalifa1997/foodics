<template>
  <div class="relative z-10" role="dialog" aria-modal="true">
    <div
      class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Add Branches
            </h3>
            <div class="mt-2">
              <AddBranchDropdown
                style="min-width: 400px"
                :items="branches"
                @branches="branchesChange"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse gap-3 mt-auto"
      >
        <AppButton text="Save" @click.native="handleSaveClick" />
        <button
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AppButton from "./AppButton.vue";
import AddBranchDropdown from "./AddBranchDropdown.vue";
import axios from "../../axios";
export default defineComponent({
  props: {
    branches: Array,
  },
  data: function () {
    return {
      selectedBranches: [],
    };
  },
  components: {
    AddBranchDropdown,
    AppButton,
  },
  methods: {
    branchesChange(branches) {
      this.selectedBranches = branches.map((el) => el.id);
    },
    handleSaveClick() {
      this.selectedBranches.forEach((branch) => {
        axios
          .put(`/branches/${branch}`, { accepts_reservations: true })
          .then(() => this.$emit("add", branch));
      });
    },
  },
});
</script>

<style scoped></style>
