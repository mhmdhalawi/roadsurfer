<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useStationStore } from "@/stores/station";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-vue-next";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const store = useStationStore();

const currentWeek = ref(dayjs());

const weekStart = computed(() => dayjs(currentWeek.value).startOf("week").add(1, "day"));
const weekEnd = computed(() => weekStart.value.add(6, "day"));
const weekDays = computed(() => Array.from({ length: 7 }, (_, i) => weekStart.value.add(i, "day")));

// const isToday = (date: dayjs.Dayjs) => date.isSame(dayjs(), "day");

function goToPreviousWeek() {
  currentWeek.value = currentWeek.value.subtract(1, "week");
}

function goToCurrentWeek() {
  currentWeek.value = dayjs();
}

function goToNextWeek() {
  currentWeek.value = currentWeek.value.add(1, "week");
}
</script>

<template>
  <div>
    <!-- Week Navigation -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <MapPin class="size-5 text-muted-foreground" />
        <span class="text-lg font-medium">{{ store.station?.name }}</span>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="goToPreviousWeek">
          <ChevronLeft class="h-4 w-4" />
        </Button>

        <Button variant="outline" @click="goToCurrentWeek"> Today </Button>

        <span class="text-sm font-medium px-3">{{
          `${weekStart.format("MMM D")} - ${weekEnd.format("MMM D, YYYY")}`
        }}</span>

        <Button variant="outline" size="sm" @click="goToNextWeek">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
    <!-- Week Cards -->
    <div class="grid grid-cols-7 gap-4">
      <div v-for="day in weekDays" :key="day.format('YYYY-MM-DD')" class="border p-4 rounded">
        <div class="font-medium">{{ day.format("dddd") }}</div>
        <div class="text-sm text-muted-foreground">{{ day.format("MMM D") }}</div>
      </div>
    </div>
  </div>
</template>
