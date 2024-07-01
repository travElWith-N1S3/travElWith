import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css"; // 전역 스타일 추가
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue";

const app = createApp(App);
app.use(CKEditor);
app.use(router);
app.mount("#app");
