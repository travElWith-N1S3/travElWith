<template>
  <div class="col-md-6">
    <router-link :to="'/destination/info?id=' + destination.id">
      <div class="card">
        <img
          :src="destination.images[0]"
          class="card-img-top"
          :alt="destination.title"
        />
        <div class="card-body">
          <h5 class="card-title">{{ destination.title }}</h5>
          <p class="card-text">{{ destination.contents }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "DestinationCard",
  props: {
    destination: Object,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.card {
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 300px;
  object-fit: cover;
}
.card-body {
  padding: 20px;
}
.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #0056b3; /* 제목 색상 다크 블루 */
  margin-bottom: 10px;
}
.card-text {
  color: #333333; /* 텍스트 색상 다크 그레이 */
}
.card-text {
  display: -webkit-box; /* Flexbox 모델을 사용하여 요소를 정렬 */
  -webkit-box-orient: vertical; /* Flexbox 방향을 수직으로 설정 */
  -webkit-line-clamp: 2; /* 라인 클램프를 2줄로 설정 */
  max-height: 48px;
  overflow: hidden; /* 넘치는 콘텐츠를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ...을 표시 */
  height: 3em; /* 2줄에 맞는 높이 설정 (줄 간격에 따라 조정 필요) */
  line-height: 1.5em; /* 줄 간격 설정 (height / line-height로 줄 수 계산) */
}
</style>
