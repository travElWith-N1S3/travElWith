import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css"; // 전역 스타일 추가
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
