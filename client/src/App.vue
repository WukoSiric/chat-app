<script>
import io from "socket.io-client";
import InputBox from "./components/InputBox.vue";
import MessageBox from "./components/MessageBox.vue";
import SearchBox from "./components/SearchBox.vue";
import MeetButton from "./components/MeetButton.vue";
import GlobalChatButton from "./components/GlobalChatButton.vue";
import UserSection from "./components/UserSection.vue";
import ChatHeader from "./components/ChatHeader.vue";

export default {
  components: {
    InputBox,
    MessageBox,
    SearchBox,
    MeetButton,
    GlobalChatButton,
    UserSection,
    ChatHeader,
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
        } else {
          // Response was not okay
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
  mounted() {
    this.generateUsername();

    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected to socket.io server!");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server!");
    });

    this.socket.on("message", ({ username, message }) => {
      console.log("Received message:", message);
      const isReceived = username !== this.username;
      this.messages.push({ username, message, isReceived });
    });

    this.username = "Anonymous";
  },
  computed: {
    usersMatch(messageObject) {
      return messageObject.username === this.username;
    },
  },
};
</script>
<template>
  <div class="app">
    <ChatHeader class="chat-header" />
    <div class="menu">
      <MeetButton id="meet" />
      <GlobalChatButton id="global-chat" />
      <SearchBox id="search-box" :modelValue="query" placeholder="Search" />
      <div class="spacer"></div>
      <UserSection id="user-section" />
    </div>
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
  height: 90%;
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
  grid-template-columns: 4fr 9fr;
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

.app > .chat-header {
  grid-area: header;
}

/* Menu  */
.menu {
  background-color: #191919;
  background-image: radial-gradient(
    circle at -15vw -40vh,
    #f2d54152,
    #191919 45%
  );
  background-repeat: no-repeat;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "meet"
    "global-chat"
    "search-box"
    "spacer"
    "footer";
  grid-template-rows: auto auto auto 2fr auto;
  grid-gap: 1px;
}

.menu > #meet {
  grid-area: meet;
}

.menu > #global-chat {
  grid-area: global-chat;
}

.menu > #search-box {
  grid-area: search-box;
  justify-self: center;
}

.menu > .spacer {
  grid-area: spacer;
}

.menu > #footer {
  grid-area: footer;
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
