<template>
  <div class="review-item" v-if="twReviewNo">
    <h4 class="review-title">{{ twReviewTitle }}</h4>
    <div class="review-content" v-html="twReviewContent"></div>
    <div class="star-rating">
      <star-rating :modelValue="twReviewRating" @update:modelValue="updateRating"></star-rating>
    </div>
    <div class="review-actions">
      <router-link
        :to="{ name: 'ReviewTour', params: { twReviewNo: twReviewNo } }"
        class="btn btn-primary"
      >
        자세히보기
      </router-link>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import StarRating from "../review/StarRating.vue";

export default {
  components: { StarRating },
  props: {
    twReviewTitle: String,
    twReviewContent: String,
    twReviewNo: {
      type: String,
      required: true // 필수 속성
    },
    twReviewRating: Number,
  },
  methods: {
    updateRating(newRating) {
      this.$emit("update:twReviewRating", newRating);
    },
  },
};
</script>

<style scoped>
.review-item {
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 200px;
  overflow: hidden;
  position: relative;
}

.review-title {
  color: #0056b3;
}

.review-content {
  color: #333333;
  flex-grow: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 최대 라인 수 */
  -webkit-box-orient: vertical;
}

.review-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>
