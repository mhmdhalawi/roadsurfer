// stores/counter.js
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { type Station } from "@/features/booking/types";

export const useStationStore = defineStore("station", () => {
  const station = ref<Station | null>(null);
  const bookings = computed(() => {
    return station.value?.bookings || [];
  });

  return { station, bookings };
});
