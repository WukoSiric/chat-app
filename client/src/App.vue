<script>
import io from 'socket.io-client'; 

export default {
  data() {
    return {
      inputValue: '', // Initialize input value as an empty string
      databases: [],
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
      // Send message using this.inputValue
      console.log('Sending message:', this.inputValue);
      this.socket.emit('message', this.inputValue);
      // Clear input field after sending message
      this.inputValue = '';
    }
  },
  mounted() {
    // Connect to socket.io server 
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to socket.io server!');
    });

    // Disconnection 
    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server!');
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
      <!-- Use v-model to bind input value to data property -->
      <input v-model='inputValue' autocomplete='off'/>
      <button type='submit'>Send</button>
    </form>
  </div>
</template>

<style>
</style>
