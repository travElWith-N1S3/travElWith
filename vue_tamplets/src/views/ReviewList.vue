<template>
  <div>
    <div class="container">
      <SearchBar />

      <!-- 리뷰 목록 -->
      <div class="review-list">
        <ReviewItem
          v-for="review in reviews"
          :key="review.id"
          :title="review.title"
          :content="review.content"
          :link="review.link"
        />
      </div>

      <!-- 페이징 -->
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
              >이전</a
            >
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">다음</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import ReviewItem from "../components/review/ReviewItem.vue";

export default {
  components: {
    ReviewItem,
  },
  data() {
    return {
      reviews: [
        {
          id: 1,
          title: "리뷰 제목 1",
          content:
            "이곳에 리뷰 내용이 요약되어 나타납니다. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque officiis ad dignissimos consectetur, libero necessitatibus sit recusandae! Tempore, alias quas.",
          link: "/review1",
        },
        {
          id: 2,
          title: "리뷰 제목 2",
          content:
            "이곳에 리뷰 내용이 요약되어 나타납니다. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque officiis ad dignissimos consectetur, libero necessitatibus sit recusandae! Tempore, alias quas.",
          link: "/review2",
        },
        // 추가적인 리뷰 아이템들을 여기에 추가
      ],
    };
  },
};
</script>

<style scoped>
.site-name {
  background-color: #0056b3; /* 사이트 이름 배경색 다크 블루 */
  color: #ffffff; /* 사이트 이름 텍스트 색상 흰색 */
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.container {
  background-color: #ffffff; /* 메인 컨테이너 배경색 하얀색 */
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
