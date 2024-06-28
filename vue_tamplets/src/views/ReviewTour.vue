<template>
  <div class="container">
    <div class="review-header">
      <router-link to="/" class="btn btn-secondary mb-3">
        메인으로 돌아가기
      </router-link>
      <h1 class="review-title">리뷰1 - 여행지 1에 대한 리뷰</h1>
      <div>
        <a href="#" class="btn btn-edit">수정</a>
        <a href="#" class="btn btn-delete">삭제</a>
      </div>
    </div>
    <div class="review-content">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">리뷰1 추가 내용</h5>
          <p class="card-text">
            이곳에 리뷰1의 추가적인 내용이 들어갈 수 있습니다. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Inventore, nisi qui, minima
            corrupti accusantium libero cum quidem expedita earum cumque
            molestiae quasi deserunt reiciendis molestias. Tempore in at sed
            natus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
            aperiam illum officia porro autem natus quos repudiandae aliquam
            suscipit dolores. Repellendus corporis asperiores veritatis nam
            natus delectus labore optio possimus?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Similique quae odio consectetur,
            recusandae omnis voluptatum officiis eum dolorum delectus ad neque
            at aliquid repudiandae, earum quam porro autem vitae voluptas. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            voluptatibus sint, dignissimos dolorem voluptate doloribus
            blanditiis ut vitae praesentium id est ipsam veritatis debitis ipsum
            amet magnam aperiam officiis quas! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eveniet, laborum mollitia sapiente
            numquam quia animi sed error veritatis iste accusantium, nisi eos
            accusamus blanditiis fuga sunt, quibusdam omnis quaerat vero?
          </p>
        </div>
      </div>
      <!-- 추가적인 리뷰 카드들을 필요에 따라 여기에 추가할 수 있습니다 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewTour",
};
</script>

<style>
body {
  background-color: #e6f7ff; /* 연한 하늘색 배경 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 20px;
}
.container {
  background-color: #ffffff; /* 메인 컨테이너 배경색 하얀색 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px; /* 수정: 상단 마진 추가 */
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
  color: #0056b3; /* 제목 색상 다크 블루 */
  margin-bottom: 20px;
}
.review-content {
  background-color: #ffffff; /* 리뷰 내용 배경색 하얀색 */
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
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
  background-color: #28a745; /* 수정 버튼 배경색 */
}
.btn-delete {
  background-color: #dc3545; /* 삭제 버튼 배경색 */
  margin-left: 10px;
}
.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.8;
}
</style>
