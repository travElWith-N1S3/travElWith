<template>
  <div id="app">
    <div class="hamburger-menu" @click="toggleSidebar">&#9776;</div>
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <router-link to="/" @click="toggleSidebar">홈</router-link>
      <router-link to="/reviews" @click="toggleSidebar">리뷰</router-link>
      <router-link to="/chatbot" @click="toggleSidebar">챗봇</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.hamburger-menu {
  font-size: 30px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
}

.sidebar {
  height: 100%;
  width: 250px;
  position: fixed;
  top: 0;
  left: -250px;
  background-color: #333;
  overflow-x: hidden;
  transition: 0.3s;
  padding-top: 60px;
  z-index: 1000;
}

.sidebar a {
  padding: 10px 15px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  background-color: #575757;
}

.sidebar-open {
  left: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.content {
  margin-left: 60px;
  padding: 20px;
}
</style>
