import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const base = import.meta.env.MODE === "production" ? "/roadsurfer/" : "/";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    children: [
      { path: "", name: "booking", component: () => import("@/pages/Booking/Booking.vue") },
      {
        path: ":stationId/bookings/:bookingId",
        name: "booking-details",
        component: () => import("@/pages/Booking/BookingDetails.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(base),
  routes,
});

export default router;
