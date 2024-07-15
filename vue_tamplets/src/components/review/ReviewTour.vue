<template>
  <div class="container">
    <div class="review-header">
      <router-link to="/reviews" class="btn btn-secondary">
        리스트 돌아가기
      </router-link>
      <h1 class="review-title">{{ review.twReviewTitle }}</h1>
      <div>
        <router-link
          :to="'/review/update/' + review.twReviewNo"
          class="btn btn-edit"
        >
          수정
        </router-link>
        <a href="#" class="btn btn-delete" @click="deleteReview">삭제</a>
      </div>
    </div>
    <div class="review-content">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">리뷰 내용</h5>
          <p class="card-text" v-html="review.twReviewContent"></p>
          <div class="star-rating">
            <star-rating :modelValue="review.twReviewRating" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "../review/StarRating.vue";

export default {
  name: "ReviewTour",
  components: {
    StarRating,
  },
  data() {
    return {
      review: {},
    };
  },
  created() {
    const twReviewNo = this.$route.params.twReviewNo;
    this.fetchReviewDetail(twReviewNo);
  },
  methods: {
    fetchReviewDetail(twReviewNo) {
      axios
        .post(process.env.VUE_APP_BACK_URL + "/api1/reviewView", { twReviewNo })
        .then((response) => {
          if (response.data.status) {
            this.review = response.data.review;
          } else {
            console.error(response.data.error);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    deleteReview() {
      const twReviewNo = this.$route.params.twReviewNo;
      axios
        .post(process.env.VUE_APP_BACK_URL + "/api1/reviewDelete", {
          twReviewNo,
        })
        .then((response) => {
          if (response.data.status) {
            alert("삭제되었습니다.");
            this.$router.push("/reviews");
          } else {
            console.error(response.data.error);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style scoped>
body {
  background-color: #e6f7ff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 20px;
}
.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}
.review-header {
  margin-bottom: 30px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.review-title {
  color: #0056b3;
  margin-top: 10px;
}
.review-content {
  background-color: #ffffff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.btn-edit,
.btn-delete {
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.btn-edit {
  background-color: #28a745;
}
.btn-delete {
  background-color: #dc3545;
  margin-left: 10px;
}
.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.8;
}

.star-rating {
  margin-top: -20px;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
