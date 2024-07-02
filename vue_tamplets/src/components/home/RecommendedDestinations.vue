<template>
  <div>
    <router-link to="/destinationList">
      <h2>추천 여행지</h2>
    </router-link>
    <div class="card-deck">
      <div
        class="card"
        v-for="destination in destinations"
        :key="destination.title"
      >
        <router-link to="/spot">
          <img :src="destination.imgSrc" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ destination.title }}</h5>
            <p class="card-text">{{ destination.text }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendedDestinations",
  data() {
    return {
      destinations: [
        {
          title: "여행지 1",
          imgSrc: "https://via.placeholder.com/150",
          text: "이곳에 여행지 1의 설명이 들어갑니다.",
        },
        {
          title: "여행지 2",
          imgSrc: "https://via.placeholder.com/150",
          text: "이곳에 여행지 2의 설명이 들어갑니다.",
        },
        {
          title: "여행지 3",
          imgSrc: "https://via.placeholder.com/150",
          text: "이곳에 여행지 3의 설명이 들어갑니다.",
        },
        {
          title: "여행지 4",
          imgSrc: "https://via.placeholder.com/150",
          text: "이곳에 여행지 4의 설명이 들어갑니다.",
        },
      ],
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
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
  margin-bottom: 20px;
}
</style>
