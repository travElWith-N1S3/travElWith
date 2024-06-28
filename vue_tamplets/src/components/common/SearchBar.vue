<template>
  <div class="row search-bar">
    <div class="col-12">
      <input
        type="text"
        class="form-control form-control-lg mt-3"
        placeholder="검색할 여행지를 입력하세요..."
      />
    </div>
  </div>
</template>

<style>
.search-bar {
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
