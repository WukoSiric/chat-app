<script>
import ForumOutlines from "../assets/svg/ForumOutlines.vue";

export default {
  components: {
    ForumOutlines,
  },
  methods: {
    selectMenu() {
      this.$store.commit("selectView", "MENU");
      console.log(this.$store.getters.view);
    },
  },
};
</script>
<template>
  <div class="meet" @click="selectMenu">
    <ForumOutlines id="forum-outlines" />
    <h1>Meet</h1>
  </div>
</template>

<style>
.meet {
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 0px 20px;
  transition: transform 5s;
}

.meet {
  font-size: 43px;
  color: #6841f2;
  margin: 0px;
  padding: 0px;
  user-select: none;
}

.meet:hover {
  text-decoration: underline;
  transform: scale(1.05);
  cursor: pointer;
}

#forum-outlines {
  width: 50px;
  height: 50px;
  margin: 0px 10px;
  fill: #6841f2;
}
</style>
