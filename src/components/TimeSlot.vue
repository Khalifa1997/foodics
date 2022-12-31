<template>
  <div
    class="flex gap-2 mx-auto border-2 border-purple-400 p-1 w-32 rounded-lg justify-center"
  >
    <InputMask
      v-model="from"
      mask="99-99"
      slotChar="hh:mm"
      :class="{
        'outline-none w-12 text-xs': true,
        'bg-red-100 border-2 border-red-600 rounded-lg': fromError,
      }"
    />
    <span>-</span>
    <InputMask
      v-model="to"
      mask="99-99"
      slotChar="hh:mm"
      :class="{
        'outline-none w-12 text-xs': true,
        'bg-red-100 border-2 border-red-600 rounded-lg': toError,
      }"
    />
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
    time: Array,
  },
  emits: ["addTime"],
  model: {
    prop: "time",
    event: "addTime",
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
  },
  watch: {
    from(newValue) {
      this.fromError = false;
      if (this.containsLetter(newValue)) this.fromError = true;
      if (!this.hourInsideLimit(newValue.split("-")[0])) this.fromError = true;
      if (!this.minuteInsideLimit(newValue.split("-")[1]))
        this.fromError = true;
      if (
        !this.fromError &&
        !this.toError &&
        this.to.length &&
        this.from.length
      )
        this.$emit("addTime", [this.from, this.to]);
    },
    to(newValue) {
      this.toError = false;
      if (this.containsLetter(newValue)) this.toError = true;
      if (!this.hourInsideLimit(newValue.split("-")[0])) this.toError = true;
      if (!this.minuteInsideLimit(newValue.split("-")[1])) this.toError = true;
      if (
        !this.fromError &&
        !this.toError &&
        this.to.length &&
        this.from.length
      )
        this.$emit("addTime", [this.from, this.to]);
    },
  },
};
</script>
