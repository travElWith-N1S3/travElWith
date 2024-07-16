<template>
  <div>
    <router-link to="/destinationList?page=0">
      <h2>추천 여행지</h2>
    </router-link>
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="destination in destinations"
        :key="destination.title"
      >
        <div class="card">
          <router-link
            :to="{ path: '/destination/info', query: { id: destination.id } }"
          >
            <img :src="destination.images[0]" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ destination.title }}</h5>
              <p class="card-text">{{ destination.contents }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendedDestinations",
  data() {
    return {
      destinations: [],
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_BACK_URL);
    this.getSpot3List();
  },
  methods: {
    getSpot3List() {
      this.$axios
        .get(
          "/v1/top-tour-spot" // API 호출 시 페이지 번호 조정
        )
        .then((response) => {
          this.destinations = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.card {
  background-color: #ffffff; /* 카드 배경색 하얀색 */
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-title,
.card-text {
  color: #333333; /* 텍스트 색상 다크 그레이 */
}
h2 {
  margin-bottom: 20px;
}
</style>
