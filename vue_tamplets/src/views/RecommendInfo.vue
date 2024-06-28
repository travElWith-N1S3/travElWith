<template>
  <div id="app">
    <div class="container">
      <!-- 여행지 이름 -->
      <h1 class="destination-name">{{ data[0].title }}</h1>

      <!-- 여행지 사진 캐러셀 -->
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            v-for="(image, index) in data[0].images"
            :key="index"
            :data-target="'#carouselExampleIndicators'"
            :data-slide-to="index"
            :class="{ active: index === 0 }"
          ></li>
        </ol>
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(image, index) in data[0].images"
            :key="index"
            :class="{ active: index === 0 }"
          >
            <img
              :src="image"
              class="d-block w-100"
              :alt="'제주도 사진 ' + (index + 1)"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <!-- 여행지 홍보 문구 -->
      <div class="promo-text">
        <p>
          {{ data[0].contents }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: [
        {
          id: 1,
          title: "아름다운 제주",
          images: [
            "https://via.placeholder.com/800x400?text=Jeju%20Island%201",
            "https://via.placeholder.com/800x400?text=Jeju%20Island%202",
          ],
          contents: "소개 내용이 들어오면 됩니다.",
        },
      ],
    };
  },
};
</script>

<style>
body {
  background-color: #e6f7ff; /* 연한 하늘색 배경 */
  padding-top: 20px;
}
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
.destination-name {
  text-align: center;
  font-size: 28px;
  color: #0056b3; /* 여행지 이름 색상 다크 블루 */
  margin-bottom: 20px;
}
.carousel-item img {
  border-radius: 10px;
}
.promo-text {
  text-align: center;
  margin-top: 20px;
  color: #333333; /* 홍보 문구 색상 다크 그레이 */
}
</style>
