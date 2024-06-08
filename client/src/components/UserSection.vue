<script>
import CogOutline from "../assets/svg/CogOutline.vue";

export default {
  name: "UserSection",
  components: {
    CogOutline,
  },
};
</script>
<template>
  <div class="user-section">
    <p id="username" class="user-component">
      {{ this.$store.getters.username }}
    </p>
    <a href="" id="settings">
      <CogOutline class="user-component" id="cog-outline" />
    </a>
  </div>
</template>
<style>
.user-section {
  background-color: #0d0d0d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.user-component {
  margin: 10px 20px;
}

#cog-outline {
  width: 30px;
  height: 30px;
  fill: yellow;
}

#username {
  color: white;
  font-weight: bold;
}
</style>
