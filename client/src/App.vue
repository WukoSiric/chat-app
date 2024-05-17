<script>
import io from 'socket.io-client'; 
import InputBox from './components/InputBox.vue';
import MessageBox from './components/MessageBox.vue';

export default {
  components: {
    InputBox,
    MessageBox
  },
  data() {
    return {
      inputValue: '', // Initialize input value as an empty string
      databases: [],
      messages: [], 
      username: '', 
      socket: null
    };
  },
  methods: {
    async generateUsername() {
      try { 
        const response = await fetch('http://localhost:3000' + '/generateUsername');
        if (response.ok) {
          const data = await response.json(); 
          this.username = data.username;
        } 
        else {
          // Response was not okay
        }
      } catch (error) {
        console.error('Error reaching server: ', error); 
      }
    },
    sendMessage() {
      if (this.inputValue === '') {
        return;
      }
      this.socket.emit('message', {username: this.username, message: this.inputValue});
      this.inputValue = '';
    },
  },
  mounted() {
    this.generateUsername();

    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to socket.io server!');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server!');
    });

    this.socket.on('message', ({username, message}) => {
      console.log('Received message:', message);
      const isReceived = username !== this.username;
      this.messages.push({username, message, isReceived});
    });

    this.username = 'Anonymous';
  },
  computed: {
    usersMatch (messageObject) {
      return messageObject.username === this.username;
    }
  }
}; 
</script>

<template>
  <div>
    <div class='app'>
      <div class='menu'>
        {{ username }}
      </div>
      <div class='chatwindow'>
        <div class="messages">
          <MessageBox v-for='messageObject in messages' :key='messageObject' :messageObject='messageObject' :isReceived='messageObject.isReceived'></MessageBox>
        </div>
          <form @submit.prevent='sendMessage'>
            <InputBox id='chatInput' v-model='inputValue' placeholder='Type a chat message...'/>
          </form>
      </div>
    </div>
  </div>
  <div>

  </div>
</template>

<style>
  html {
    font-family: 'sarabun', sans-serif;
  }

  .messages {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 20px 20px 0px 20px;
    height: 90%;
    overflow-y : auto;
  }
/* Desktop styling */
  .app {
    display: grid; 
    grid-template-columns: 5fr 12fr;
    color: white; 
  }

  .menu {
    background-color: #191919;
    height: 100vh;;
  }

  .chatwindow {
    background-color: #101010;
    background-image: linear-gradient(#101010, #b261f510, #261164);
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
/* Mobile */
</style>
