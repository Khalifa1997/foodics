<template>
  <div class="text-center m-auto mt-20">
    <AddBranchModal v-show="showModal" :branches="branches" @add="addBranch" />
    <div
      class="flex flex-col gap-4 m-20 rounded-sm bg-red-100 justify-center items-center"
    >
      <button class="border-gray-400 ml-auto border-2 px-4 py-2">Hi</button>
      <AppTable
        :branches="reservationAcceptingBranches"
        @add="addReservation"
      />
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import AddBranchModal from "./components/AddBranchModal.vue";
import AppTable from "./components/AppTable.vue";
export default {
  name: "App",
  components: {
    AddBranchModal,
    AppTable,
  },
  data: function () {
    return {
      showModal: true,
      branches: [],
    };
  },
  computed: {
    reservationAcceptingBranches: function () {
      return this.branches.filter((branch) => branch.accepts_reservations);
    },
  },
  methods: {
    addReservation(branch) {
      console.log(branch);
    },
    addBranch(branchID) {
      const found = this.branches.find((e) => e.id === branchID);
      if (found) found.accepts_reservations = true;
    },
  },
  created() {
    axios
      .get("/branches?include[0]=sections&include[1]=sections.tables")
      .then((res) => (this.branches = res.data.data));
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
