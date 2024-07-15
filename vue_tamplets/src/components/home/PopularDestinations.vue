<template>
  <div class="row popular-destinations">
    <div class="col-12">
      <h2>실시간 인기 여행지 순위</h2>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, index) in spot"
          :key="item.id"
        >
          {{ index + 1 }}. {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      spot: [], // spot 데이터를 배열로 초기화
    };
  },
  methods: {
    getPopular() {
      this.$axios
        .get("http://localhost:8080/v1/popular-destination")
        .then((response) => {
          this.spot = response.data;
        });
    },
  },
  mounted() {
    this.getPopular();
  },
};
</script>

<style>
.popular-destinations {
  margin-bottom: 30px;
}
.list-group-item {
  background-color: #ffffff; /* 리스트 아이템 배경색 하얀색 */
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
