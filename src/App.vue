<script setup lang="ts"></script>

<template>
  <nav class="flex gap-x-2 text-blue-500">
    <RouterLink :to="{ name: 'booking' }">Go to Booking</RouterLink>
    <RouterLink :to="{ name: 'booking-details', params: { id: 1 } }"
      >Go to Booking Details</RouterLink
    >
  </nav>
  <main>
    <RouterView />
  </main>
</template>
