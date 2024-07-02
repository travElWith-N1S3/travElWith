import { createRouter, createWebHistory } from "vue-router";
import MainHome from "../views/MainHome.vue";
import ReviewTour from "../views/ReviewTour.vue";
import ReviewList from "../views/ReviewList.vue";
import RecommendInfo from "../views/RecommendInfo.vue";
import DestinationList from "../views/DestinationList.vue";
import ReviewForm from "../views/ReviewForm.vue";
import ChatBot from "../views/ChatBotMain.vue";

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
    path: "/destinationList",
    name: "DestinationList",
    component: DestinationList,
  },
  {
    path: "/reviewForm",
    name: "ReviewForm",
    component: ReviewForm,
  },
  {
    path: "/spot",
    name: "RecommendInfo",
    component: RecommendInfo,
  },
  {
    path: "/chatbot",
    name: "ChatBot",
    component: ChatBot,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
