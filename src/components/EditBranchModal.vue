<template>
  <AppModal v-show="model" v-if="Object.keys(branch).length">
    <template #body>
      <div class="px-4 pt-5 pb-4">
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
            <AppInput
              :class="{
                'border-2 border-red-600': reservationDurationError,
              }"
              type="number"
              v-model="reservationDuration"
            />
          </div>
          <div>
            <h6>Tables</h6>
            <AddTableDropdown
              :class="{
                'border-2 border-red-600 rounded-lg': tablesError,
              }"
              :options="sections"
              v-model="tables"
            />
          </div>
          <div v-for="(day, index) in days" :key="day.weekDay">
            <div class="flex justify-between my-1">
              <span>
                {{ day.weekDay }}
              </span>
              <span
                @click="applyToAllDays"
                v-if="index == 0"
                class="text-purple-500 cursor-pointer"
                >Apply on All Days</span
              >
            </div>
            <div
              class="bg-white border-2 border-gray-400 p-4 flex gap-2 rounded-md"
            >
              <div v-for="(timeSlot, index) in day.time" :key="timeSlot.id">
                <TimeSlot
                  v-if="timeSlot.visible"
                  v-model="day.time[index]"
                  @removeTimeSlot="removeTimeSlot(day.weekDay, timeSlot.id)"
                />
              </div>
              <AppButton
                text="+"
                class="ml-auto"
                @click.native="AddTimeSlot(day.weekDay)"
              />
            </div>
          </div>
          <small v-show="daysError" class="self-start text-red-600"
            >Please enter any day</small
          >
        </div>
      </div>
    </template>
    <template #footer>
      <AppButton
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        text="Close"
        @click.native="toggleShow"
      />
      <AppButton @click.native="handleSaveClick" text="Save" />
    </template>
  </AppModal>
</template>

<script>
import AddTableDropdown from "./AddTableDropdown.vue";
import AppButton from "./AppButton.vue";
import AppInput from "./AppInput.vue";
import AppModal from "./AppModal.vue";
import TimeSlot from "./TimeSlot.vue";
import axios from "../../axios";

AddTableDropdown;
export default {
  data: function () {
    return {
      reservationDuration: "",
      reservationDurationError: false,
      tables: [],
      tablesError: false,
      days: [
        {
          weekDay: "Saturday",
          time: [],
        },
        {
          weekDay: "Sunday",
          time: [],
        },
        {
          weekDay: "Monday",
          time: [],
        },
        {
          weekDay: "Tuesday",
          time: [],
        },
        {
          weekDay: "Wednesday",
          time: [],
        },
        {
          weekDay: "Thursday",
          time: [],
        },
        {
          weekDay: "Friday",
          time: [],
        },
      ],
      daysError: false,
    };
  },
  components: {
    AppModal,
    AppInput,
    AddTableDropdown,
    TimeSlot,
    AppButton,
  },
  props: {
    branch: Object,
    modelValue: Boolean,
  },

  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  computed: {
    sections: function () {
      return this.branch.sections;
    },
    model: {
      get() {
        return this.modelValue;
      },
      set(newModelValue) {
        this.$emit("update:modelValue", newModelValue);
      },
    },
  },
  methods: {
    AddTimeSlot(day) {
      const foundDay = this.days.find((e) => e.weekDay === day);
      if (foundDay) {
        const daySlots = foundDay.time;
        const invisibleSlot = daySlots.findIndex((slot) => !slot.visible);
        if (invisibleSlot != -1) foundDay.time[invisibleSlot].visible = true;
      }
    },
    toggleShow() {
      this.$emit("update:modelValue", false);
    },
    removeTimeSlot(day, id) {
      const foundDay = this.days.find((e) => e.weekDay === day);
      if (foundDay) {
        const daySlots = foundDay.time;
        const invisibleSlot = daySlots.findIndex((slot) => slot.id === id);
        if (invisibleSlot != -1) {
          foundDay.time[invisibleSlot].to = "";
          foundDay.time[invisibleSlot].from = "";
          foundDay.time[invisibleSlot].visible = false;
        }
      }
    },
    applyToAllDays() {
      for (let index = 1; index < this.days.length; index++) {
        const arrayCopy = JSON.parse(JSON.stringify(this.days[0].time));
        this.days[index].time = [...arrayCopy];
      }
    },
    handleSaveClick() {
      this.reservationDurationError = !this.reservationDuration.length;

      this.tablesError = !this.tables.length;

      let isThereReservations = false;

      const reservation_times = {};
      this.days.forEach((day) => {
        const timeSlots = [];
        day.time.forEach((e) => {
          if (e.from && e.to) {
            timeSlots.push([e.from, e.to]);
            isThereReservations = true;
          }
        });
        reservation_times[day.weekDay.toLowerCase()] = timeSlots;
      });

      if (!isThereReservations) this.daysError = true;

      if (
        !isThereReservations ||
        this.tablesError ||
        this.reservationDurationError
      )
        return;

      axios
        .put(`/branches/${this.branch.id}`, {
          reservation_duration: +this.reservationDuration,
          reservation_times: reservation_times,
          tables: this.tables,
        })
        .finally(() => this.toggleShow());
    },
  },
  created() {
    this.days.forEach(
      (day) =>
        (day.time = [
          { id: 0, visible: false },
          { id: 1, visible: false },
          { id: 2, visible: false },
        ])
    );
  },
};
</script>
