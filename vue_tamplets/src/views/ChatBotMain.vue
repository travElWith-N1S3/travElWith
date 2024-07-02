<template>
  <div id="app">
    <div class="container">
      <h1 class="mt-5 mb-3 text-center">AI 여행지 추천</h1>
      <ChatBot />
    </div>
  </div>
</template>

<script>
import ChatBot from "../components/chatbot/ChatBot.vue";

export default {
  components: {
    ChatBot,
  },
  data() {
    return {
      showChat: false,
    };
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
