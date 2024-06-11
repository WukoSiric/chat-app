<script>
import io from "socket.io-client";
import LoginPage from "./views/LoginPage.vue";
import InputBox from "./components/InputBox.vue";
import MessageBox from "./components/MessageBox.vue";
import ChatHeader from "./components/ChatHeader.vue";
import ChatMenu from "./components/ChatMenu.vue";
import socket from "./services/socket.js";

export default {
  components: {
    LoginPage,
    InputBox,
    MessageBox,
    ChatHeader,
    ChatMenu,
  },
  data() {
    return {
      inputValue: "", // Initialize input value as an empty string
      databases: [],
      messages: [],
      username: "",
      socket: null,
      query: "",
    };
  },
  methods: {
    async generateUsername() {
      try {
        const response = await fetch(
          "http://localhost:3000" + "/generateUsername"
        );
        if (response.ok) {
          const data = await response.json();
          this.username = data.username;
          this.$store.commit("changeUsername", data.username);
        }
      } catch (error) {
        console.error("Error reaching server: ", error);
      }
    },
    sendMessage() {
      if (this.inputValue === "") {
        return;
      }
      this.socket.emit("message", {
        username: this.username,
        message: this.inputValue,
      });
      this.inputValue = "";
    },
  },
  created() {
    this.generateUsername();
    this.socket = socket;

    this.socket.on("message", ({ username, message }) => {
      console.log("Received message:", message);
      const isReceived = username !== this.username;
      this.messages.push({ username, message, isReceived });
    });
  },

  mounted() {},
  computed: {
    usersMatch(messageObject) {
      return messageObject.username === this.username;
    },
  },
};
</script>
<template>
  <LoginPage />
  <div class="app">
    <ChatHeader class="header" />
    <ChatMenu class="menu" />
    <div class="chat-window">
      <div class="messages">
        <MessageBox
          v-for="messageObject in messages"
          :key="messageObject"
          :messageObject="messageObject"
          :isReceived="messageObject.isReceived"
        ></MessageBox>
      </div>
      <form @submit.prevent="sendMessage">
        <InputBox
          id="chat-input"
          v-model="inputValue"
          placeholder="Type a chat message..."
        />
      </form>
    </div>
  </div>
</template>

<style>
html {
  font-family: "sarabun", sans-serif;
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px 20px 0px 20px;
  min-height: 90%;
  max-height: 1vh;
  overflow-y: auto;
}

/* Desktop styling */
/* Chat Window */
.app {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-areas:
    "menu header"
    "menu chat-window";
  grid-template-columns: 3fr 9fr;
  grid-template-rows: 0.5fr 10fr;
  color: white;
  height: 100vh;
}

.app > .chat-area {
  grid-area: chat-window;
}

.app > .menu {
  grid-area: menu;
}

.app > .header {
  grid-area: header;
}

.chat-window {
  background-color: #101010;
  background-image: radial-gradient(circle at top right, #4f22f223, #101010 30%),
    radial-gradient(circle at bottom left, #4f22f213, #101010 50%),
    radial-gradient(circle at 50vw 30vh, #4f22f228, #101010 40%),
    radial-gradient(circle at top left, #000000, #101010 40%);
  background-size: 50% 50%;
  background-position: top right, bottom left, bottom right, top left;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
