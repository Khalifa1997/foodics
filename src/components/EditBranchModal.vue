<template>
  <AppModal v-show="show">
    <template>
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="flex flex-col gap-3">
          <h3
            class="text-lg font-medium leading-6 text-gray-900"
            id="modal-title"
          >
            Edit {{ branch.name }} branch reservation settings
          </h3>
          <h5 class="bg-blue-200 border-y-2 border-blue-700 p-3">
            Branch working hours are {{ branch.opening_from }} -
            {{ branch.opening_to }}
          </h5>
          <div>
            <h6>
              Reservation Duration (minutes)<span class="text-red-600">*</span>
            </h6>
            <AppInput v-model="reservationDuration" />
          </div>
        </div>
      </div>
    </template>
  </AppModal>
</template>

<script>
import AppInput from "./AppInput.vue";
import AppModal from "./AppModal.vue";

export default {
  data: function () {
    return {
      reservationDuration: "",
    };
  },
  components: {
    AppModal,
    AppInput,
  },
  props: {
    branch: Object,
    show: Boolean,
  },

  model: {
    prop: "show",
    event: "toogleShow",
  },
};
</script>
