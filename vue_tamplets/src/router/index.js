import { createRouter, createWebHistory } from "vue-router";
import MainHome from "../views/MainHome.vue";
import ReviewTour from "../views/ReviewTour.vue";
import ReviewList from "../views/ReviewList.vue";
import RecommendInfo from "../views/RecommendInfo.vue";

const routes = [
  {
    path: "/",
    name: "MainHome",
    component: MainHome,
  },
  {
    path: "/review",
    name: "Review",
    component: ReviewTour,
  },
  {
    path: "/reviews",
    name: "ReviewList",
    component: ReviewList,
  },
  {
    path: "/spot/info",
    name: "RecommendInfo",
    component: RecommendInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
