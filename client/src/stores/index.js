import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      username: "null",
      selectedView: "GLOBALCHAT",
      count: 0 // Added the count property to the state
    };
  },
  mutations: {
    changeUsername(state, newUsername) {
      state.username = newUsername;
    },
    selectView(state, newView) {
      state.selectedView = newView; 
    }
  },
  getters: {
    username(state) {
      // Correctly access the state parameter
      return `${state.username}`;
    },
    view(state) {
      return state.selectedView;
    }
  },
});

export default store;
