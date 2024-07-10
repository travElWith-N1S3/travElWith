<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= modelValue }"
      @click="setRating(star)"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setRating(star) {
      this.$emit("update:modelValue", star);
    },
  },
};
</script>

<style scoped>
.star-rating {
  display: flex;
  gap: 5px;
}

.star {
  font-size: 2rem;
  cursor: pointer;
  color: #ccc;
}

.star.filled {
  color: gold;
}
</style>
