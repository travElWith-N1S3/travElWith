<template>
  <div class="container">
    <Header2 />
    <img alt="Vue logo" src="./assets/logo.png" />
    <SearchBar />
    <PopularDestinations />
    <div class="row">
      <RecommendedDestinations class="col-md-6" />
      <TourReviews class="col-md-6" />
    </div>
  </div>
  <router-view />
</template>

<script>
import Header2 from "./components/common/VHeader.vue";
import SearchBar from "./components/common/SearchBar.vue";
import PopularDestinations from "./components/home/PopularDestinations.vue";
import RecommendedDestinations from "./components/home/RecommendedDestinations.vue";
import TourReviews from "./components/home/TourReviews.vue";

export default {
  name: "App",
  components: {
    Header2,
    SearchBar,
    PopularDestinations,
    RecommendedDestinations,
    TourReviews,
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
