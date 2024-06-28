<template>
  <div>
    <router-link to="/reviews">
      <h2>리뷰글</h2>
    </router-link>
    <router-link to="/review">
      <div class="card mb-3" v-for="review in reviews" :key="review.title">
        <div class="card-body">
          <h5 class="card-title">{{ review.title }}</h5>
          <p class="card-text">{{ review.text }}</p>
          <div class="more-link"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: [
        {
          id: 1,
          title: "리뷰 제목 1",
          text: "이곳에 리뷰 내용이 요약되어 나타납니다. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque officiis ad dignissimos consectetur, libero necessitatibus sit recusandae! Tempore, alias quas.",
        },
        {
          id: 2,
          title: "리뷰 제목 2",
          text: "이곳에 리뷰 내용이 요약되어 나타납니다. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque officiis ad dignissimos consectetur, libero necessitatibus sit recusandae! Tempore, alias quas.",
        },
        // 더 많은 리뷰 데이터 추가 가능
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
  position: relative;
}

.more-link {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
