<template>
  <div>
    <router-link to="/reviews">
      <h2>리뷰글</h2>
    </router-link>
    <router-link to="/review" v-for="review in reviews" :key="review.id">
      <div class="card mb-3">
        <div class="card-body">
          <router-link
            :to="{
              name: 'ReviewTour',
              params: { twReviewNo: review.twReviewNo },
            }"
          >
            <h5 class="card-title">{{ review.twReviewTitle }}</h5>
            <p class="card-text">{{ stripHtmlTags(review.twReviewContent) }}</p>
          </router-link>
          <div class="more-link"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reviews: [],
    };
  },
  props: {
    twReviewNo: {
      type: String,
      required: true, // 필수 속성
    },
  },
  mounted() {
    this.fetchRecentReviews();
  },
  methods: {
    async fetchRecentReviews() {
      try {
        const response = await axios.get(
          "http://" + process.env.VUE_APP_BACK_URL + "/api1/recentReviews"
        );
        if (response.data.status) {
          this.reviews = response.data.recentReviews;
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching recent reviews:", error);
      }
    },
    stripHtmlTags(content) {
      return content.replace(/<\/?p>/g, "");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.card {
  position: relative;
}

.more-link {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

h2 {
  margin-bottom: 20px;
}

p {
  color: black;
}
</style>
