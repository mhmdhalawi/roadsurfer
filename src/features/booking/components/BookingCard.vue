<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-vue-next";
import type { Booking } from "../types";
import { useStationStore } from "@/stores/station";

const { day, booking } = defineProps<{
  day: dayjs.Dayjs;
  booking: Booking;
}>();

const store = useStationStore();

const bookingType = computed(() =>
  dayjs(booking.startDate).isSame(day, "day")
    ? "PICKUP"
    : dayjs(booking.endDate).isSame(day, "day")
    ? "RETURN"
    : "NONE"
);

const bookingColor = computed(() =>
  bookingType.value === "PICKUP"
    ? {
        border: "border-l-blue-500 bg-blue-50/50 hover:bg-blue-50",
        text: "text-blue-700",
      }
    : {
        border: "border-l-orange-500 bg-orange-50/50 hover:bg-orange-50",
        text: "text-orange-700",
      }
);
</script>
<template>
  <RouterLink
    :to="{
      name: 'booking-details',
      params: { stationId: store?.station?.id, bookingId: booking.id },
    }"
    v-if="bookingType !== 'NONE'"
  >
    <Card
      :class="
        cn(
          'cursor-pointer transition-all duration-200 hover:shadow-md border-l-4',
          bookingColor.border
        )
      "
    >
      <CardContent class="p-1.5">
        <div class="space-y-2">
          <div class="flex justify-center">
            <div :class="cn('text-xs font-bold tracking-wider', bookingColor.text)">
              {{ bookingType }}
            </div>
          </div>
          <div class="font-semibold text-sm text-gray-900 truncate text-center">
            {{ booking.customerName }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs text-gray-600">
            <Calendar class="h-3 w-3" />
            <span>
              {{
                dayjs(bookingType === "PICKUP" ? booking.startDate : booking.endDate).format(
                  "HH:mm"
                )
              }}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </RouterLink>
</template>
