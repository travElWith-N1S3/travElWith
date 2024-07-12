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
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <router-link
              :to="{
                name: 'ReviewList',
                query: { page: currentPage - 1, query: searchQuery },
              }"
              class="page-link"
              :class="{ disabled: currentPage <= 1 }"
              @click.prevent="prevPage"
            >
              이전
            </router-link>
          </li>

          <li
            class="page-item"
            v-for="page in displayedPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <router-link
              :to="{
                name: 'ReviewList',
                query: { page: page, query: searchQuery },
              }"
              class="page-link"
              @click.prevent="goToPage(page, $event)"
            >
              {{ page }}
            </router-link>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPage }"
          >
            <router-link
              :to="{
                name: 'ReviewList',
                query: { page: currentPage + 1, query: searchQuery },
              }"
              class="page-link"
              :class="{ disabled: currentPage >= totalPage }"
              @click.prevent="nextPage"
            >
              다음
            </router-link>
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
import axios from "axios"
import ReviewItem from "./ReviewItem.vue"

export default {
  components: {
    ReviewItem,
  },
  data() {
    return {
      currentPage: 1,
      reviews: [],
      searchQuery: "",
      pageSize: 10,
      totalPage: 0,
    }
  },
  computed: {
    displayedPages() {
      // 10페이지씩 페이징
      let startPage = Math.max(1, this.currentPage - 4)
      let endPage = Math.min(this.totalPage, startPage + 9)
      if (endPage - startPage < 9) {
        startPage = Math.max(1, endPage - 9)
      }
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      )
    },
  },
  methods: {
    fetchReviews() {
      const page = this.currentPage - 1
      const query = this.searchQuery

      axios
        .get(`/api1/reviewSearch?query=${query}&page=${page}`)
        .then((response) => {
          if (response.data.status) {
            this.reviews = response.data.reviews
            this.totalPage = response.data.totalPages
          } else {
            console.error("리뷰를 가져오는 중 오류 발생:", response.data.error)
          }
        })
        .catch((error) => {
          console.error("리뷰를 가져오는 중 오류가 발생했습니다!", error)
        })
    },
    nextPage(event) {
      event.preventDefault()
      if (this.currentPage < this.totalPage) {
        this.currentPage++
        this.fetchReviews()
      }
    },
    prevPage(event) {
      event.preventDefault()
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchReviews()
      }
    },
    goToPage(page, event) {
      event.preventDefault()
      this.currentPage = page
      this.fetchReviews()
    },
  },
  created() {
    this.currentPage = parseInt(this.$route.query.page) || 1
    this.searchQuery = this.$route.query.query || ""
    this.fetchReviews()
  },
  watch: {
    $route(to) {
      this.currentPage = parseInt(to.query.page) || 1
      this.searchQuery = to.query.query || ""
      this.fetchReviews()
    },
  },
}
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
