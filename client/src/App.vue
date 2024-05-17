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
      this.messages.push({username, message});
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
          <div v-for='message in messages' :key='message'>
            <MessageBox :message=message.message></MessageBox>
          </div>
          <form @submit.prevent='sendMessage'>
            <InputBox v-model='inputValue' placeholder='Type a chat message...'/>
          </form>
      </div>
    </div>
  </div>
  <div>

  </div>
</template>

<style>
/* Desktop styling */
  .app {
    display: grid; 
    grid-template-columns: 5fr 12fr;
    color: white; 
  }

  .menu {
    background-color: #191919;
    height: 100%;
    width: 100%;
  }

  .chatwindow {
    background-color: #101010;
  }
/* Mobile */
</style>
