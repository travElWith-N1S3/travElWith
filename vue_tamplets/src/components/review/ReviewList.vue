<template>
  <div class="container">
    <SearchBar />

    <!-- 리뷰 목록 -->
    <div class="review-list">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="여행지나 리뷰를 검색하세요..."
          v-model="searchQuery"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-primary"
            type="button"
            @click="fetchReviews"
          >
            검색
          </button>
        </div>
      </div>

      <ReviewItem
        v-for="review in reviews"
        :key="review.twReviewNo"
        :twReviewTitle="review.twReviewTitle"
        :twReviewContent="review.twReviewContent"
        :twReviewNo="review.twReviewNo"
        :twReviewRating="review.twReviewRating"
      />
    </div>

    <!-- 페이징 및 리뷰 등록 버튼 -->
    <div class="d-flex justify-content-between align-items-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mb-0">
          <li class="page-item" :class="{ disabled: currentStartPage === 1 }">
            <button
              class="page-link"
              @click.prevent="prevPageGroup"
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
              @click.prevent="nextPageGroup"
              :disabled="currentEndPage >= totalPage"
            >
              다음
            </button>
          </li>
        </ul>
      </nav>

      <router-link to="/reviewForm">
        <button class="btn btn-primary ml-3">리뷰 등록</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ReviewItem from "./ReviewItem.vue";

export default {
  components: {
    ReviewItem,
  },
  data() {
    return {
      currentPage: 1,
      reviews: [],
      searchQuery: "",
      totalPage: 0,
      pageSize: 10,
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
    fetchReviews() {
      this.$axios
        .get(`/api1/reviewSearch`, {
          params: {
            query: this.searchQuery,
            page: this.currentPage - 1,
            size: this.pageSize,
          },
        })
        .then((response) => {
          if (response.data.status) {
            this.reviews = response.data.reviews;
            this.totalPage = response.data.totalPages;
          } else {
            console.error("리뷰를 가져오는 중 오류 발생:", response.data.error);
          }
        })
        .catch((error) => {
          console.error("리뷰를 가져오는 중 오류가 발생했습니다!", error);
        });
    },
    nextPageGroup() {
      if (this.currentEndPage < this.totalPage) {
        this.currentStartPage += 10;
        this.currentEndPage += 10;
        this.currentPage = this.currentStartPage;
        this.fetchReviews();
        window.scrollTo(0, 0);
      }
    },
    prevPageGroup() {
      if (this.currentStartPage > 1) {
        this.currentStartPage -= 10;
        this.currentEndPage -= 10;
        this.currentPage = this.currentStartPage;
        this.fetchReviews();
        window.scrollTo(0, 0);
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.fetchReviews();
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.currentPage = parseInt(this.$route.query.page) || 1;
    this.searchQuery = this.$route.query.query || "";
    this.fetchReviews();
  },
  watch: {
    $route(to) {
      this.currentPage = parseInt(to.query.page) || 1;
      this.searchQuery = to.query.query || "";
      this.fetchReviews();
    },
  },
};
</script>

<style scoped>
.site-name {
  background-color: #0056b3;
  color: #ffffff;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}
.review-list {
  margin-top: 20px;
}
.pagination {
  justify-content: center;
  margin-top: 20px;
}
.row {
  padding: 10px;
}
ul {
  margin: 10px;
}
</style>
