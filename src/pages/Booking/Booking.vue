<script setup lang="ts">
import BookingAutoComplete from "@/features/booking/components/BookingAutoComplete.vue";
import { useStationStore } from "@/stores/station";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-vue-next";
import BookingWeekView from "@/features/booking/components/BookingWeekView.vue";

const store = useStationStore();
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex lg:justify-between flex-col lg:flex-row lg:items-center border-b border-gray-200 lg:pb-4 pb-6 gap-y-4"
    >
      <div>
        <h1 class="text-2xl font-bold">Roadsurfer</h1>
        <p class="text-gray-500">Manage pickups and returns at your stations</p>
      </div>
      <BookingAutoComplete />
    </div>
    <!-- Main -->
    <template v-if="!store.station">
      <Card class="mx-auto max-w-md text-center">
        <CardContent class="pt-6">
          <MapPin class="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 class="mb-2 text-lg font-semibold">Select a Station</h3>
          <p class="text-muted-foreground">
            Choose a station from the search above to view bookings and manage pickups and returns.
          </p>
        </CardContent>
      </Card>
    </template>
    <template v-else>
      <BookingWeekView />
    </template>
  </div>
</template>
