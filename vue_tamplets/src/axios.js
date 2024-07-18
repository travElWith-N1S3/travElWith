// src/axios.js
import axios from "axios";

// 환경 변수 로그 출력
console.log("Axios Base URL:", process.env.VUE_APP_API_BASE_URL);

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
