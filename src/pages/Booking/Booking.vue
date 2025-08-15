<script setup lang="ts">
import { onMounted } from "vue";
import { fetchStations } from "@/features/booking/services";
import { ref } from "vue";
import type { Station } from "@/features/booking/types";
import BookingAutoComplete from "@/features/booking/components/BookingAutoComplete.vue";

const stations = ref<Station[]>([]);

onMounted(async () => {
  stations.value = await fetchStations();
});
</script>

<template>
  <div class="flex lg:justify-between flex-col lg:flex-row items-center lg:items-baseline">
    <h1 class="text-2xl font-bold mb-4">Road Surfer</h1>
    <BookingAutoComplete />
  </div>
</template>
