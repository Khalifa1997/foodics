<template>
  <AppModal>
    <template>
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
                :options="branches"
                v-model="selectedBranches"
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
          @click="handleCancelClick"
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </template>
  </AppModal>
</template>

<script>
import { defineComponent } from "vue";
import AppModal from "./AppModal.vue";
import AppButton from "./AppButton.vue";
import AddBranchDropdown from "./AddBranchDropdown.vue";
import axios from "../../axios";

export default defineComponent({
  components: {
    AppModal,
    AddBranchDropdown,
    AppButton,
  },
  props: {
    branches: Array,
  },
  data: function () {
    return {
      selectedBranches: [],
    };
  },
  methods: {
    branchesChange(branches) {
      this.selectedBranches = branches.map((el) => el.id);
    },
    handleCancelClick() {
      this.selectedBranches = [];
    },
    handleSaveClick() {
      this.selectedBranches.forEach((branch) => {
        axios
          .put(`/branches/${branch.id}`, { accepts_reservations: true })
          .then(() => this.$emit("add", branch));
      });
      this.selectedBranches = [];
    },
  },
});
</script>

<style scoped></style>
