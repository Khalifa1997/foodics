<template>
  <table class="text-start">
    <thead>
      <tr class="border-gray-600 border-2">
        <th class="pr-20 text-start">Branch</th>
        <th class="pr-20 text-start">Reference</th>
        <th class="pr-20 text-start">Number of Tables</th>
        <th class="pr-20 text-start">Reservation Duration</th>
      </tr>
    </thead>
    <tbody class="border-gray-600 border-2">
      <tr
        v-for="branch in branches"
        :key="branch.id"
        @click="addReservation(branch)"
      >
        <td>{{ branch.name }}</td>
        <td>{{ branch.reference }}</td>
        <td>{{ numberofTables(branch) }}</td>
        <td>{{ branch.reservation_duration }} Minutes</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    branches: Array,
  },
  methods: {
    addReservation(branch) {
      this.$emit("add", branch);
    },
    numberofTables(branch) {
      let count = 0;
      for (let index = 0; index < branch.sections.length; index++) {
        for (let j = 0; j < branch.sections[index].tables.length; j++) {
          if (branch.sections[index].tables[j].accepts_reservations) count += 1;
        }
      }
      return count;
    },
  },
});
</script>

<style scoped></style>
