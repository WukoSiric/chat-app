import "./assets/global.css";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./stores/index.js";
let app = createApp(App);
app.use(store);
app.mount("#app");
