import { createRouter, createWebHistory } from "vue-router";
import MainHome from "../views/MainHome.vue";
import ReviewTour from "../components/review/ReviewTour.vue";
import ReviewList from "../components/review/ReviewList.vue";
import RecommendInfo from "../views/RecommendInfo.vue";
import DestinationList from "../views/DestinationList.vue";
import ReviewForm from "../components/review/ReviewForm.vue";

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
