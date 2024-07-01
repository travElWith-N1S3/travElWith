<template>
  <div class="review-item">
    <h4 class="review-title">{{ title }}</h4>
    <p class="review-content">{{ content }}</p>
    <div class="review-actions">
      <router-link :to="link" class="btn btn-primary">자세히보기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewItem",
  props: {
    title: String,
    content: String,
    link: String
  }
}
</script>

<style scoped>
.review-item {
  background-color: #f9f9f9; /* 리뷰 아이템 배경색 */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 185px;
  overflow: hidden;
  position: relative;
}

.review-title {
  color: #0056b3; /* 제목 색상 다크 블루 */
  margin-bottom: 5px;
}

.review-content {
  color: #333333; /* 내용 색상 다크 그레이 */
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 최대 라인 수 */
  -webkit-box-orient: vertical;
}

.review-actions {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 10px;
  bottom: 20px;
}
</style>
