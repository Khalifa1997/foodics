<template>
  <div
    class="flex gap-2 border-2 border-purple-400 p-1 w-32 rounded-lg justify-between relative"
  >
    <InputMask
      v-model="from"
      mask="99-99"
      slotChar="hh:mm"
      :class="{
        'outline-none w-12 text-xs text-center': true,
        'bg-red-100 border-2 border-red-600 rounded-lg':
          fromError || !isBetween,
        'bg-green-100 border-2 border-green-600 rounded-lg':
          !fromError && isBetween,
      }"
    />
    <span>-</span>
    <InputMask
      v-model="to"
      mask="99-99"
      slotChar="hh:mm"
      :class="{
        'outline-none w-12 text-xs text-center': true,
        'bg-red-100 border-2 border-red-600 rounded-lg': toError || !isBetween,
        'bg-green-100 border-2 border-green-600 rounded-lg':
          !fromError && isBetween,
      }"
    />
    <div
      class="absolute -top-3 w-4 h-4 bg-red-50 flex justify-center border-2 border-red-500 rounded-full p-1"
      @click="removeTimeSlot"
      style="left: 7.3rem"
    >
      <img src="../assets/close.png" width="10px" height="10px" />
    </div>
  </div>
</template>
<script>
import InputMask from "primevue/inputmask";

export default {
  components: { InputMask },
  data: () => ({
    from: "",
    fromError: false,
    to: "",
    toError: false,
  }),
  props: {
    time: Object,
  },
  emits: ["addTimeSlot", "removeTimeSlot"],
  model: {
    prop: "time",
    event: "addTimeSlot",
  },
  methods: {
    containsLetter(string) {
      const regExp = /[a-zA-Z]/g;
      return regExp.test(string);
    },
    hourInsideLimit(number) {
      return number < 24 && number >= 0;
    },
    minuteInsideLimit(number) {
      return number < 60 && number >= 0;
    },
    isRightFormat(string) {
      return (
        !this.containsLetter(string) &&
        this.hourInsideLimit(string.split("-")[0]) &&
        this.minuteInsideLimit(string.split("-")[1])
      );
    },
    removeTimeSlot() {
      this.$emit("removeTimeSlot", this.time.id);
    },
  },
  computed: {
    isBetween: function () {
      return (
        this.to.split("-")[0] > this.from.split("-")[0] ||
        (this.to.split("-")[0] === this.from.split("-")[0] &&
          this.to.split("-")[1] > this.from.split("-")[1])
      );
    },
  },
  watch: {
    from(newValue) {
      this.fromError = false;
      this.fromError = !this.isRightFormat(newValue);

      if (
        !this.fromError &&
        !this.toError &&
        this.to.length &&
        this.from.length &&
        this.isBetween
      )
        this.$emit("addTimeSlot", {
          ...this.time,
          from: this.from,
          to: this.to,
        });
    },
    to(newValue) {
      this.toError = false;
      this.toError = !this.isRightFormat(newValue);

      if (
        !this.fromError &&
        !this.toError &&
        this.to.length &&
        this.from.length &&
        this.isBetween
      )
        this.$emit("addTimeSlot", {
          ...this.time,
          from: this.from,
          to: this.to,
        });
    },
  },
  created() {
    this.from = this.time.from || "";
    this.to = this.time.to || "";
  },
};
</script>
