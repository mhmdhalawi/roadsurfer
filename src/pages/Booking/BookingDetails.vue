<script setup lang="ts">
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/ui/button/Button.vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchStationById, fetchBookingById } from "@/features/booking/services";
import type { Booking, Station } from "@/features/booking/types";
import { ChevronLeft, MapPin, Users } from "lucide-vue-next";
import BookingDetailsSkeleton from "@/features/booking/components/BookingDetailsSkeleton.vue";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const station = ref<Station | null>(null);
const booking = ref<Booking | null>(null);

const stationId = route.params.stationId as string;
const bookingId = route.params.bookingId as string;

onMounted(async () => {
  isLoading.value = true;
  try {
    station.value = await fetchStationById(stationId);
    booking.value = await fetchBookingById({ stationId, bookingId });
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-background p-4">
    <div class="mx-auto max-w-2xl">
      <Button variant="outline" @click="router.push({ name: 'booking' })" class="mb-6">
        <ChevronLeft class="mr-2 h-4 w-4" />
        Back to Calendar
      </Button>
      <div v-if="isLoading">
        <BookingDetailsSkeleton />
      </div>
      <Card v-else>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Users class="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <label class="text-sm font-medium text-muted-foreground">Customer Name</label>
            <p class="text-lg font-semibold">{{ booking?.customerName }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-muted-foreground">Booking Start Date</label>
              <p class="font-medium">{{ dayjs(booking?.startDate).format("MMMM D, YYYY") }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-muted-foreground">Booking End Date</label>
              <p class="font-medium">{{ dayjs(booking?.endDate).format("MMMM D, YYYY") }}</p>
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-muted-foreground">Booking Duration</label>
            <p class="font-medium">
              <span>{{
                Math.ceil(dayjs(booking?.endDate).diff(dayjs(booking?.startDate), "day"))
              }}</span>
              days
            </p>
          </div>

          <div>
            <label class="text-sm font-medium text-muted-foreground">Pickup-Return Station</label>
            <p class="flex items-center gap-2 font-medium">
              <MapPin class="h-4 w-4" />
              <span class="first-letter:capitalize">{{ station?.name }}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
