<template>
  <div>
    <div class="review-item">
      <h4 class="review-title">{{ title }}</h4>
      <p class="review-content">
        {{ content }}
      </p>
      <router-link :to="link" class="btn btn-primary">자세히 보기</router-link>
    </div>
  </div>
</template>

<script>
// import SearchBar from '../common/SearchBar.vue';

export default {
  props: {
    title: String,
    content: String,
    link: String,
  },
};
</script>

<style scoped>
.review-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9; /* 리뷰 아이템 배경색 */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.review-title {
  color: #0056b3; /* 제목 색상 다크 블루 */
  margin-bottom: 5px;
}
.review-content {
  color: #333333; /* 내용 색상 다크 그레이 */
}
</style>
