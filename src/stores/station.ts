// stores/counter.js
import { ref } from "vue";
import { defineStore } from "pinia";
import { type Station } from "@/features/booking/types";

export const useStationStore = defineStore("station", () => {
  const station = ref<Station | null>(null);

  return { station };
});
