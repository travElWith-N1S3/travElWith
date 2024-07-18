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
          @input="searchDestinations"
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
        <li class="page-item" :class="{ disabled: currentStartPage === 1 }">
          <button
            class="page-link"
            @click.prevent="prevPage"
            :disabled="currentStartPage === 1"
          >
            이전
          </button>
        </li>
        <li
          v-for="page in displayedPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click.prevent="goToPage(page)">
            {{ page }}
          </button>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentEndPage >= totalPage }"
        >
          <button
            class="page-link"
            @click.prevent="nextPage"
            :disabled="currentEndPage >= totalPage"
          >
            다음
          </button>
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
      totalPage: 0,
      currentStartPage: 1,
      currentEndPage: 10,
    };
  },
  computed: {
    displayedPages() {
      let pages = [];
      for (
        let i = this.currentStartPage;
        i <= this.currentEndPage && i <= this.totalPage;
        i++
      ) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    getAllList() {
      this.$axios
        .get(`/v1/destinationList?page=${this.currentPage}`, {
          params: {
            query: this.searchQuery,
            page: this.currentPage - 1,
            size: this.pageSize,
          },
        })
        .then((response) => {
          this.destinations = response.data.content;
          this.totalPage = response.data.totalPages;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentStartPage += 10;
        this.currentEndPage += 10;
        this.currentPage = this.currentStartPage;
        this.getAllList();
        window.scrollTo(0, 0);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentStartPage -= 10;
        this.currentEndPage -= 10;
        this.currentPage = this.currentStartPage;
        this.getAllList();
        window.scrollTo(0, 0);
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.getAllList();
      window.scrollTo(0, 0);
    },
    searchDestinations() {
      this.currentPage = 1;
      this.getAllList();
    },
  },
  created() {
    this.currentPage = parseInt(this.$route.query.page) || 1;
    this.searchQuery = this.$route.query.query || "";
    this.getAllList();
  },
  watch: {
    $route(to) {
      this.currentPage = parseInt(to.query.page) || 1;
      this.searchQuery = to.query.query || "";
      this.getAllList();
    },
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
