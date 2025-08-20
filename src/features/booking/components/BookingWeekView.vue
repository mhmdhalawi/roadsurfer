<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useStationStore } from "@/stores/station";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-vue-next";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import BookingCard from "./BookingCard.vue";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const store = useStationStore();

const currentWeek = ref(dayjs());

const weekStart = computed(() => dayjs(currentWeek.value).startOf("week").add(1, "day"));
const weekEnd = computed(() => weekStart.value.add(6, "day"));
const weekDays = computed(() => Array.from({ length: 7 }, (_, i) => weekStart.value.add(i, "day")));

function goToPreviousWeek() {
  currentWeek.value = currentWeek.value.subtract(1, "week");
}

function goToCurrentWeek() {
  currentWeek.value = dayjs();
}

function goToNextWeek() {
  currentWeek.value = currentWeek.value.add(1, "week");
}

function dayHasEvent(day: dayjs.Dayjs) {
  return store.bookings?.some((booking) => {
    const start = dayjs(booking.startDate);
    const end = dayjs(booking.endDate);
    return start.isSame(day, "day") || end.isSame(day, "day");
  });
}
</script>

<template>
  <div>
    <!-- Week Navigation -->
    <div class="mb-6 flex flex-col md:flex-row items-center justify-between gap-y-4">
      <div class="flex items-center gap-2 self-start">
        <MapPin class="size-5 text-muted-foreground" />
        <span class="text-lg font-medium">{{ store.station?.name }}</span>
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto justify-between md:justify-baseline">
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      <Card
        v-for="day in weekDays"
        :key="day.format('YYYY-MM-DD')"
        :class="cn('min-h-[300px]', day.isSame(dayjs(), 'day') && 'ring-2 ring-blue-500')"
      >
        <CardHeader class="pb-3">
          <CardTitle class="flex items-center justify-between text-sm">
            <div>
              <div class="font-medium">{{ day.format("dddd") }}</div>
              <div class="text-xs text-muted-foreground">{{ day.format("ddd, MMM D") }}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div
            v-if="!dayHasEvent(day)"
            class="flex flex-col items-center justify-center py-8 text-muted-foreground"
          >
            <Calendar class="mb-2 size-8" />
            <p class="text-sm">No bookings</p>
          </div>
          <template v-else>
            <BookingCard
              v-for="booking in store.bookings"
              :key="booking.id"
              :booking="booking"
              :day="day"
            />
          </template>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
