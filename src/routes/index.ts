import { createRouter, createWebHistory } from "vue-router";

const base = import.meta.env.MODE === "production" ? "/roadsurfer/" : "/";

const routes = [
  { path: "/", name: "home", component: () => import("@/pages/Home.vue") },
  { path: "/about", name: "about", component: () => import("@/pages/About.vue") },
];

const router = createRouter({
  history: createWebHistory(base),
  routes,
});

export default router;
