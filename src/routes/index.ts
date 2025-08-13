import { createRouter, createWebHistory } from "vue-router";

const base = import.meta.env.MODE === "production" ? "/roadsurfer/" : "/";

const routes = [
  { path: "/", component: () => import("@/pages/Home.vue") },
  { path: "/about", component: () => import("@/pages/About.vue") },
];

const router = createRouter({
  history: createWebHistory(base),
  routes,
});

export default router;
