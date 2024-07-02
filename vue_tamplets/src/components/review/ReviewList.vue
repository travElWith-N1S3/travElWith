<template>
  <div>
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
            <button class="btn btn-outline-primary" type="button" @click="searchReviews">검색</button>
          </div>
        </div>
        <ReviewItem
          v-for="review in filteredReviews"
          :key="review.tw_review_no"
          :title="review.tw_review_title"
          :content="review.tw_review_content"
          :tw_review_no="review.tw_review_no"
          :link="`/review/${review.tw_review_no}`"
        />
      </div>

      <!-- 페이징 및 리뷰 등록 버튼 -->
      <div class="d-flex justify-content-between align-items-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">이전</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">다음</a>
            </li>
          </ul>
        </nav>
        <router-link to="/reviewForm">
          <button class="btn btn-primary ml-3">리뷰 등록</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewItem from "./ReviewItem.vue"

export default {
  components: {
    ReviewItem,
  },
  data() {
    return {
      reviews: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter(review => {
        return review.tw_review_title.includes(this.searchQuery) || review.tw_review_content.includes(this.searchQuery);
      });
    }
  },
  methods: {
    fetchReviews() {
      axios.post('/api1/reviewList')
        .then(response => {
          if (response.data.status) {
            this.reviews = response.data.list;
          } else {
            console.error("Error fetching reviews:", response.data.error);
          }
        })
        .catch(error => {
          console.error("There was an error fetching the reviews!", error);
        });
    },
  },
  created() {
    this.fetchReviews();
  }
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
</style>
