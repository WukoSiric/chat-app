<script>
export default {
  data() {
    return {
      databases: [] 
    };
  },
  methods: {
    async apiTest() {
      console.log("http://localhost:3000"+ "/api");
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