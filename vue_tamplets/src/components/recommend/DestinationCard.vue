<template>
  <div class="col-md-6">
    <div class="card">
      <img
        :src="destination.image"
        class="card-img-top"
        :alt="destination.title"
      />
      <router-link to="spot/info">
        <div class="card-body">
          <h5 class="card-title">{{ destination.title }}</h5>
          <p class="card-text">{{ destination.description }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DestinationCard",
  props: {
    destination: Object,
  },
}
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
</style>
