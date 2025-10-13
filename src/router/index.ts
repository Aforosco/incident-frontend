import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import IncidentDashboard from "../components/IncidentDashboard.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { 
    path: "/dashboard", 
    component: IncidentDashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");

  if (to.path === "/login" && token) {
    next("/dashboard"); // already logged in
  } else if (to.meta.requiresAuth && !token) {
    next("/login"); // not logged in
  } else {
    next();
  }
});

export default router;
