<template>
  <div>
    <div class="container">
      <h1>리뷰 작성</h1>
      <form @submit.prevent="submitReview">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="reviewTitle"
            v-model="reviewTitle"
            placeholder="리뷰 제목을 입력하세요..."
          />
        </div>
        <div class="form-group">
          <ckeditor class="review-ckeditor" :editor="editor" v-model="reviewContent" :config="editorConfig"></ckeditor>
        </div>
        <button type="submit" class="btn btn-submit">리뷰 작성 완료</button>
      </form>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      reviewTitle: "",
      reviewContent: "",
      editor: ClassicEditor,
      editorConfig: {
        placeholder: '게시물 내용을 입력해주세요',
        height: '400px',
      },
    };
  },
  methods: {
    submitReview() {
      console.log("리뷰 제목:", this.reviewTitle);
      console.log("리뷰 내용:", this.reviewContent);
    },
  },
};
</script>

<style scoped>
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
  width: 100%;
}
.container {
  background-color: #ffffff; /* 메인 컨테이너 배경색 하얀색 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px; /* 사이트 이름과 겹치지 않게 여백 추가 */
}
.form-group {
  margin-bottom: 20px;
}
.btn-submit {
  background-color: #0056b3; /* 버튼 배경색 다크 블루 */
  color: #ffffff; /* 버튼 텍스트 색상 흰색 */
  border: none;
}
</style>
<style>
.ck-editor__editable {
  min-height: 300px;
}
</style>