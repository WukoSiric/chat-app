<script>
import SearchBox from "./SearchBox.vue";
import MeetButton from "./MeetButton.vue";
import GlobalChatButton from "./GlobalChatButton.vue";
import UserSection from "./UserSection.vue";
import socket from "../services/socket.js";

export default {
  components: {
    SearchBox,
    MeetButton,
    GlobalChatButton,
    UserSection,
  },
  data() {
    return {
      onlineUsers: [],
      socket: null,
    };
  },
  methods: {
    async getUsers() {
      const response = await fetch("http://localhost:3000/getOnline");
      if (response.ok) {
        console.log("Success");
        const users = await response.json();
        users.forEach((user) => {
          this.onlineUsers.push(user);
        });
      } else {
        console.log("Failure");
        console.log(response.text.json());
      }
    },
  },
  created() {
    this.socket = socket;

    this.socket.on("newConnection", ({ id }) => {
      this.onlineUsers.push(id);
    });
  },
};
</script>
<template>
  <div class="menu">
    <div class="spacer-top"></div>
    <MeetButton id="meet" />
    <GlobalChatButton id="global-chat" />
    <SearchBox id="search-box" modelValue="query" placeholder="Search" />
    <div class="spacer">
      <button @click="getUsers">Get Users</button>
      {{ onlineUsers }}
    </div>
    <UserSection id="user-section" />
  </div>
</template>
<style>
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
    "spacer-top"
    "meet"
    "global-chat"
    "search-box"
    "spacer"
    "footer";
  grid-template-rows: 0.1fr auto auto auto 1fr auto;
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

.menu > .spacer-top {
  grid-area: spacer-top;
}

.menu > #footer {
  grid-area: footer;
}
</style>
