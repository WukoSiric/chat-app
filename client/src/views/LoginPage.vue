<template>
  <div class="bg-slate-600 flex flex-col h-1/2">
    <input
      type="text"
      v-model="username"
      class="p-2 hover:outline-none"
      placeholder="Username"
    />
    <input
      type="password"
      class="p-2 hover:outline-none"
      placeholder="Password"
      v-model="password"
    />
    <button class="text-white font-bold p-1" @click="tryLogin">Login</button>
  </div>

  {{ username }}
  {{ password }}

  <div v-if="authenticated" class="bg-green-300">You are logged in</div>
  <div v-else class="bg-red-300">Unauthenticated</div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      authenticated: false,
    };
  },
  methods: {
    async tryLogin() {
      console.log("Trying login");
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      if (response.ok) {
        const data = response;
        this.authenticated = true;
        console.log(data);
      } else {
        const errorData = response; // Assuming server returns error details in JSON
        this.authenticated = false;
        console.error(errorData); // Log the error response data
      }
    },
  },
};
</script>
