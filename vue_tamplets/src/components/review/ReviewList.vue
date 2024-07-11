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
            @click="searchReviews"
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
                query: { page: currentPage - 1 },
              }"
              class="page-link"
              :class="{ disabled: currentPage <= 1 }"
              @click="prevPage"
            >
              이전
            </router-link>
          </li>
          <li
            class="page-item"
            v-for="page in totalPage"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <router-link
              :to="{ name: 'ReviewList', query: { page: page } }"
              class="page-link"
            >
              {{ page }}
            </router-link>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPage }">
            <router-link
              :to="{
                name: 'ReviewList',
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
  methods: {
    fetchReviews() {
      axios
        .get(`/api1/reviewList?page=${this.currentPage}`)
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
    nextPage() {
      this.$router.push({ query: { page: this.currentPage + 1 } })
    },
    prevPage() {
      this.$router.push({ query: { page: this.currentPage - 1 } })
    },
    searchReviews() {
      axios
        .get(`/api1/reviewSearch?query=${this.searchQuery}`)
        .then((response) => {
          if (response.data.status) {
            this.reviews = response.data.reviews
            this.totalPage = Math.ceil(this.reviews.length / this.pageSize)
          } else {
            console.error("검색 중 오류 발생:", response.data.error)
          }
        })
        .catch((error) => {
          console.error("검색 중 오류가 발생했습니다!", error)
        })
    },
  },
  created() {
    this.fetchReviews()
  },
  watch: {
    $route(to) {
      this.currentPage = parseInt(to.query.page) || 1
      this.fetchReviews()
    },
    searchQuery() {
      this.searchReviews()
    }
  },
  mounted() {
    this.currentPage = parseInt(this.$route.query.page) || 1
    this.fetchReviews()
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
