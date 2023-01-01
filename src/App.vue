<template>
  <div class="text-center m-auto mt-20">
    <AppButton text="Disable Reservation" @click.native="disableReservations" />
    <AddBranchModal
      v-model="showModal"
      :branches="notReservationAcceptingBranches"
      @add="addBranch"
    />
    <EditBranchModal v-model="editModalShow" :branch="selectedBranch" />
    <div
      class="flex flex-col gap-4 m-20 rounded-sm bg-red-100 justify-center items-center"
    >
      <button
        class="border-gray-400 ml-auto border-2 px-4 py-2 bg-white rounded-lg m-4"
        @click="showModal = true"
      >
        Add Reservations
      </button>
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
import AppButton from "./components/AppButton.vue";
import AppTable from "./components/AppTable.vue";
import EditBranchModal from "./components/EditBranchModal.vue";

export default {
  name: "App",
  components: {
    AddBranchModal,
    AppTable,
    AppButton,
    EditBranchModal,
  },
  data: function () {
    return {
      showModal: false,
      branches: [],
      selectedBranch: {},
      editModalShow: false,
    };
  },
  computed: {
    reservationAcceptingBranches: function () {
      return this.branches.filter((branch) => branch.accepts_reservations);
    },
    notReservationAcceptingBranches: function () {
      return this.branches.filter((branch) => !branch.accepts_reservations);
    },
  },
  methods: {
    addReservation(branch) {
      this.editModalShow = true;
      this.selectedBranch = branch;
    },
    addBranch(branch) {
      const found = this.branches.find((e) => e.id === branch.id);
      if (found) found.accepts_reservations = true;
    },
    disableReservations() {
      this.branches.forEach((branch) => {
        axios
          .put(`/branches/${branch.id}`, { accepts_reservations: false })
          .then(() => {
            const foundBranch = this.branches.find((el) => el.id == branch.id);
            if (foundBranch) foundBranch.accepts_reservations = false;
          });
      });
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
