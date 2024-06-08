import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      firstName: "Luke",
      lastName: "Stainer",
      username: "null",
      count: 0, // Added the count property to the state
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    changeUsername(state, newUsername) {
      state.username = newUsername;
    },
  },
  getters: {
    username(state) {
      // Correctly access the state parameter
      return `${state.username}`;
    },
  },
});

export default store;
