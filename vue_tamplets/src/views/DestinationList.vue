<template>
  <div>
    <div class="container">
      <!-- 검색 바 -->
      <div class="search-bar">
        <input
          type="text"
          class="form-control form-control-lg"
          placeholder="검색할 여행지를 입력하세요..."
          v-model="searchQuery"
        />
      </div>
      <div class="row">
        <!-- 여행지 카드 -->
        <destination-card
          v-for="(destination, index) in destinations"
          :key="index"
          :destination="destination"
        />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <router-link
            :to="
              currentPage > 1
                ? {
                    path: `http://${process.env.VUE_APP_BACK_URL}/v1/destinationList`,
                    query: { page: currentPage - 1 },
                  }
                : ''
            "
            class="page-link"
            :class="{ disabled: currentPage <= 1 }"
            @click="prevPage"
          >
            이전
          </router-link>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#">{{ currentPage }}</a>
        </li>
        <li class="page-item">
          <router-link
            :to="{
              path: `http://${process.env.VUE_APP_BACK_URL}/v1/destinationList`,
              query: { page: currentPage + 1 },
            }"
            class="page-link"
            :class="{ disabled: currentPage >= totalPage }"
            @click="nextPage"
          >
            다음
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import DestinationCard from "../components/recommend/DestinationCard.vue";

export default {
  name: "DestinationList",
  components: {
    DestinationCard,
  },
  data() {
    return {
      currentPage: 1, // 초기 페이지를 1로 설정
      searchQuery: "",
      destinations: [],
      pageSize: 10, // 페이지 당 목록 수
    };
  },
  methods: {
    getAllList() {
      this.$axios
        .get(
          `http://${process.env.VUE_APP_BACK_URL}/v1/destinationList?page=${this.currentPage}` // API 호출 시 페이지 번호 조정
        )
        .then((response) => {
          this.destinations = response.data.content;
          this.totalPage = response.data.totalPages;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    nextPage() {
      this.$router.push({ query: { page: this.currentPage + 1 } });
    },
    prevPage() {
      this.$router.push({ query: { page: this.currentPage - 1 } });
    },
  },
  watch: {
    // $route 객체의 변경을 감지하여 데이터를 새로 불러옴
    $route(to) {
      this.currentPage = parseInt(to.query.page) || 1;
      this.getAllList();
    },
  },
  mounted() {
    // 마운트 시 현재 페이지 설정
    this.currentPage = parseInt(this.$route.query.page) || 1;
    this.getAllList();
  },
};
</script>
<style scoped>
.row {
  padding: 10px;
}
ul {
  margin: 10px;
}
</style>
