<template>
  <div>
    <div class="container">
      <!-- 검색 바 -->
      <div class="search-bar">
        <input
          type="text"
          class="form-control form-control-lg"
          placeholder="검색할 여행지를 입력하세요..."
          v-model="searchQuery"
        />
      </div>
      <div class="row">
        <!-- 여행지 카드 -->
        <destination-card
          v-for="(destination, index) in filteredDestinations"
          :key="index"
          :destination="destination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DestinationCard from "../components/recommend/DestinationCard.vue"

export default {
  name: "DestinationList",
  components: {
    DestinationCard,
  },
  data() {
    return {
      searchQuery: "",
      destinations: [
        {
          title: "여행지 1",
          image: "https://via.placeholder.com/600x400",
          description:
            "이곳은 자연 경관이 아름다운 곳입니다. 특히 푸른 바다와 여유로운 분위기가 매력적입니다.",
        },
        {
          title: "여행지 2",
          image: "https://via.placeholder.com/600x400",
          description:
            "이곳은 역사와 문화가 풍부한 곳입니다. 다채로운 유적지와 전통 건축물이 매력적입니다.",
        },
        {
          title: "여행지 3",
          image: "https://via.placeholder.com/600x400",
          description:
            "이곳은 현대적이고 활기찬 도시 생활을 경험할 수 있는 곳입니다. 다채로운 엔터테인먼트와 먹거리가 매력입니다.",
        },
        {
          title: "여행지 4",
          image: "https://via.placeholder.com/600x400",
          description:
            "이곳은 신비로운 자연 경관과 독특한 문화가 조화를 이루는 곳입니다. 독특한 체험과 충만한 휴식을 제공합니다.",
        },
      ],
    }
  },
  computed: {
    filteredDestinations() {
      return this.destinations.filter((destination) =>
        destination.title.includes(this.searchQuery)
      )
    },
  },
}
</script>

<style>
body {
  background-color: #e6f7ff; /* 연한 하늘색 배경 */
  padding-top: 20px;
}
.site-name {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.container {
  background-color: #ffffff; /* 메인 컨테이너 배경색 하얀색 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}
.search-bar {
  margin-bottom: 20px;
}
</style>
