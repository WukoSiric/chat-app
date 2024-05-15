<script>
import io from 'socket.io-client'; 

export default {
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

      console.log('Sending message:', this.inputValue);
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
      this.messages.push(username + ': ' + message);
    });

    this.username = 'Anonymous';
  }
}; 
</script>

<template>
  <div>
    <h1>Some heading...</h1>
    <p>Hello World!</p>
    <h2> Adjust Username </h2>
    <form> 
      <input id="username" v-model="username" autocomplete='off'/>
      {{ username }}
    </form>
    <h2> Chat </h2>
    <form @submit.prevent='sendMessage'>
      <input v-model='inputValue' autocomplete='off'/>
      <button type='submit'>Send</button>
    </form>
  </div>

  <div>
    <ul id='messages'>
      <li v-for='message in messages' :key='message'>
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<style>
</style>
