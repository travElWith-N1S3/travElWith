<template>
  <div class="container">
    <div>
      <img
        src="https://via.placeholder.com/1500x300"
        class="img-fluid"
        alt="Header Image"
        style="width: 100%; height: 300px; object-fit: cover"
      />
      <SearchBar />
      <PopularDestinations />
      <div class="row">
        <RecommendedDestinations class="col-md-6" />
        <Reviews class="col-md-6" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/common/SearchBar.vue"
import PopularDestinations from "../components/home/PopularDestinations.vue"
import RecommendedDestinations from "../components/home/RecommendedDestinations.vue"
import Reviews from "../components/home/TourReviews.vue"

export default {
  name: "MainHome",
  components: {
    SearchBar,
    PopularDestinations,
    RecommendedDestinations,
    Reviews,
  },
}
</script>

<style scoped>
/* 홈 페이지에 대한 개별 스타일 */
</style>
