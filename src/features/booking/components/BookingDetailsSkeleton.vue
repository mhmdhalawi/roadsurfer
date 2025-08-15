<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-vue-next";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Users class="h-5 w-5" />
        Booking Details
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div>
        <Skeleton class="h-4 w-24 mb-2 rounded" />
        <Skeleton class="h-6 w-32 rounded" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Skeleton class="h-4 w-20 mb-2 rounded" />
          <Skeleton class="h-5 w-28 rounded" />
        </div>

        <div>
          <Skeleton class="h-4 w-20 mb-2 rounded" />
          <Skeleton class="h-5 w-28 rounded" />
        </div>
      </div>

      <div>
        <Skeleton class="h-4 w-24 mb-2 rounded" />
        <Skeleton class="h-5 w-16 rounded" />
      </div>

      <div>
        <Skeleton class="h-4 w-32 mb-2 rounded" />
        <div class="flex items-center gap-2 font-medium">
          <MapPin class="h-4 w-4" />
          <Skeleton class="h-5 w-24 rounded" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
