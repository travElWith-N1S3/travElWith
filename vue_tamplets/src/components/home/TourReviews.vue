<template>
  <div>
    <router-link to="/reviews">
      <h2>리뷰글</h2>
    </router-link>
    <router-link
      v-for="review in reviews"
      :key="review.id"
      :to="{ name: 'ReviewTour', params: { twReviewNo: review.twReviewNo } }"
    >
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">
            {{ review.twReviewTitle }}
            <template v-if="containsImages(review.twReviewContent)">
              <img
                src="../common/image/사진아이콘.png"
                alt="new"
                class="photo-icon"
              />
            </template>
          </h5>
          <p
            class="card-text"
            v-html="sanitizeReviewContent(review.twReviewContent)"
          ></p>
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
      required: true,
    },
  },
  mounted() {
    this.fetchRecentReviews();
  },
  methods: {
    async fetchRecentReviews() {
      try {
        const response = await axios.get("/api1/recentReviews");
        if (response.data.status) {
          this.reviews = response.data.recentReviews;
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching recent reviews:", error);
      }
    },
    containsImages(content) {
      const imgTagRegex = /<figure class="image"><img.*?>/g;
      return imgTagRegex.test(content);
    },
    sanitizeReviewContent(content) {
      return content.replace(/<figure class="image"><img.*?>/g, "");
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

.photo-icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  margin-top: -5px;
}
</style>
