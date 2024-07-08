import { createRouter, createWebHistory } from "vue-router";
import MainHome from "../views/MainHome.vue";
import ReviewTour from "../components/review/ReviewTour.vue";
import ReviewList from "../components/review/ReviewList.vue";
import ReviewUpdate from "../components/review/ReviewUpdate.vue";
import RecommendInfo from "../views/RecommendInfo.vue";
import DestinationList from "../views/DestinationList.vue";
import ReviewForm from "../components/review/ReviewForm.vue";
import ChatBot from "../views/ChatBotMain.vue";

const routes = [
  {
    path: "/",
    name: "MainHome",
    component: MainHome,
  },
  {
    path: '/review/:tw_review_no',
    name: 'ReviewTour',
    component: ReviewTour,
    props: true
  },
  {
    path: "/reviews",
    name: "ReviewList",
    component: ReviewList,
  },
  {
    path: "/review/update/:tw_review_no",
    name: "ReviewUpdate",
    component: ReviewUpdate,
    props: true
  },
  {
    path: "/destinationList",
    name: "DestinationList",
    component: DestinationList,
    query: { page: 0 },
  },
  {
    path: "/reviewForm",
    name: "ReviewForm",
    component: ReviewForm,
  },
  {
    path: "/destination/info",
    name: "RecommendInfo",
    component: RecommendInfo,
    query: { id: null },
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
