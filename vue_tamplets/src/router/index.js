import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Review from "../views/Review.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/review",
    name: "Review",
    component: Review,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
