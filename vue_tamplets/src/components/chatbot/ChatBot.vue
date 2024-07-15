<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        챗봇
        <button type="button" class="close" @click="closeChat">
          <!-- <span aria-hidden="true">&times;</span> -->
        </button>
      </div>
      <div class="card-body chat-body" ref="chatBody">
        <div
          v-for="(message, index) in chatHistory"
          :key="index"
          class="message"
        >
          <div v-if="message.type === 'bot'" class="bot-message">
            <p>{{ message.text }}</p>
            <template v-if="message.imageUrl">
              <img :src="message.imageUrl" alt="Bot Image" class="bot-image" />
            </template>
          </div>
          <div v-else class="user-message">
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="sendMessage2">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="userMessage"
              placeholder="메시지 입력..."
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit">전송</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      userMessage: "",
      chatHistory: [
        { type: "bot", text: "안녕하세요! 여행지 추천을 도와드릴게요." },
      ],
      websocket: null,
      reconnectInterval: 5000, // 재연결 시도 간격 (밀리초)
    };
  },
  methods: {
    getMessage() {
      this.websocket.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        this.receiveMsg(event);
      };
    },
    receiveMsg(msg) {
      var messageInfo = JSON.parse(msg.data);
      this.chatHistory.push({ type: "bot", text: messageInfo });
    },
    sendMessage2() {
      console.log("cookie");
      this.id = this.getCookie("ask_token");
      console.log(this.id);
      this.websocket.send(
        JSON.stringify({ id: this.id, text: this.userMessage })
      );
      this.chatHistory.push({ type: "user", text: this.userMessage });
      this.userMessage = "";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    initWebSocket() {
      this.websocket = new WebSocket(
        "ws://" + VUE_APP_BACK_URL + ":8080/ws/chat"
      );
      this.websocket.onopen = () => {
        console.log("WebSocket 연결 성공");
      };
      this.websocket.onclose = () => {
        console.log("WebSocket 연결 끊김, 재연결 시도...");
        setTimeout(() => {
          this.initWebSocket();
        }, this.reconnectInterval);
      };
      this.websocket.onerror = (error) => {
        console.error("WebSocket 오류:", error);
        this.websocket.close();
      };
    },

    getCookie(name) {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        console.log(cookie);
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName.trim() === name) {
          return cookieValue;
        }
      }
      return null; // 해당 이름의 쿠키가 없는 경우
    },

    // sendMessage() {
    //   this.$axios
    //     .get(
    //       "http://localhost:8080/v1/chatbot/chatting?prompt=" + this.userMessage
    //     )
    //     .then((response) => {
    //       if (response.data != "") {
    //         this.chatHistory.push({
    //           type: "bot",
    //           text: response.data,
    //         });
    //       }
    //     });

    //   if (this.userMessage.trim() === "") return;

    //   // 사용자 메시지 추가
    //   this.chatHistory.push({ type: "user", text: this.userMessage });

    //   // 메시지 전송 후 입력창 초기화
    //   this.userMessage = "";

    //   // 스크롤을 가장 하단으로 이동
    //   this.$nextTick(() => {
    //     this.scrollToBottom();
    //   });
    // },

    scrollToBottom() {
      const chatBody = this.$refs.chatBody;
      chatBody.scrollTop = chatBody.scrollHeight;
    },
  },
  mounted() {
    this.initWebSocket();
    this.getMessage();
    this.$axios.defaults.withCredentials = true;
    this.$axios
      .get(process.env.VUE_APP_BACK_URL + "/v1/chatbot")
      .then((response) => {
        if (response.data == 1) {
          // alert("연결 성공");
        } else {
          alert("유효하지 않은 접근입니다. 채팅이 제한됩니다.");
        }
      });
  },
};
</script>

<style scoped>
.chat-body {
  height: 300px;
  overflow-y: auto;
}
.message {
  margin-bottom: 10px;
}
.bot-message {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
}
.bot-image {
  max-width: 100%;
  border-radius: 10px;
}
.user-message {
  text-align: right;
}
.card-footer {
  padding: 10px;
}
</style>
