<script>
import io from 'socket.io-client'; 

export default {
  data() {
    return {
      inputValue: '', // Initialize input value as an empty string
      databases: [],
      messages: [], 
      socket: null
    };
  },
  methods: {
    async apiTest() {
      try { 
        const response = await fetch('http://localhost:3000' + '/api');
        if (response.ok) {
          console.log(await response.text());
        } 
        else {
          // Response was not okay
        }
      } catch (error) {
        console.error('Error fetching databases: ', error); 
      }
    },
    sendMessage() {
      console.log('Sending message:', this.inputValue);
      this.socket.emit('message', this.inputValue);
      this.inputValue = '';
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to socket.io server!');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server!');
    });

    this.socket.on('message', (id, message) => {
      console.log('Received message:', message);
      this.messages.push(id + ': ' + message);
    });
  }
}; 
</script>

<template>
  <div>
    <h1>Some heading...</h1>
    <p>Hello World!</p>
    <button @click='apiTest'>Talk to NodeJS!</button>
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
