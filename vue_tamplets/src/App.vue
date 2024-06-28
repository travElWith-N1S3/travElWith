<template>
  <div>
    <Header2 />
    <router-view />
    <SideBar />
  </div>
</template>

<script>
import Header2 from "./components/common/VHeader.vue";
import SideBar from "./components/common/SideBar.vue";

export default {
  name: "App",
  components: {
    Header2,
    SideBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
