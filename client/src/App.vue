<script>
import io from "socket.io-client"; 

export default {
  data() {
    return {
      databases: [] 
    };
  },
  methods: {
    async apiTest() {
      try { 
        const response = await fetch("http://localhost:3000" + "/api");
        if (response.ok) {
          console.log(response.text());
        } 
        else {
          // Response was not okay
        }
      } catch (error) {
        console.error("Error fetching databases: ", error); 
      }
    }
  },
  mounted() {
    // Connect to socket.io server 
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected to socket.io server!");
    });

    // Disconnection 
    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server!");
    });
  }
}; 
</script>

<template>
  <h1> Some heading... </h1>
  <p> Hello World! </p>
  <button @click="apiTest"> Talk to NodeJS! </button>
</template>

<style>
</style>