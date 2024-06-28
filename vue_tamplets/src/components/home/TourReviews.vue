<template>
  <div>
    <router-link to="/reviews">
      <h2>리뷰글</h2>
    </router-link>
    <div class="card mb-3" v-for="review in reviews" :key="review.title">
      <div class="card-body">
        <h5 class="card-title">{{ review.title }}</h5>
        <p class="card-text">{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourReivews",
  data() {
    return {
      reviews: [
        { title: "리뷰 제목 1", text: "이곳에 리뷰글 1의 내용이 들어갑니다." },
        { title: "리뷰 제목 2", text: "이곳에 리뷰글 2의 내용이 들어갑니다." },
        { title: "리뷰 제목 3", text: "이곳에 리뷰글 3의 내용이 들어갑니다." },
      ],
    };
  },
};
</script>

<style scoped>
.card {
  background-color: #ffffff; /* 카드 배경색 하얀색 */
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-title,
.card-text {
  color: #333333; /* 텍스트 색상 다크 그레이 */
}
h2 {
  color: #0056b3; /* 제목 색상 다크 블루 */
  margin-bottom: 20px;
}
</style>
