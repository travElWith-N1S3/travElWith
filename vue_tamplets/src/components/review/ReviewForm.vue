<template>
  <div>
    <div class="container">
      <h1>리뷰 작성</h1>
      <form @submit.prevent="submitReview">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="twReviewTitle"
            v-model="contentData.twReviewTitle"
            placeholder="리뷰 제목을 입력하세요..."
          />
        </div>
        <div class="form-group">
          <textarea
            v-model="contentData.twReviewContent"
            name="twReviewContent"
            id="editor"
            cols="30"
            rows="10"
            placeholder="놀러가신 위치, 내용 등을 입력해주세요."
          ></textarea>
        </div>
        <div class="form-group">
          <star-rating v-model="contentData.twReviewRating"></star-rating>
        </div>
        <button type="submit" class="btn btn-submit">등록</button>
      </form>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StarRating from "../review/StarRating.vue";

export default {
  components: {
    StarRating,
  },
  data() {
    return {
      contentData: {
        twReviewTitle: "",
        twReviewContent: "",
        twReviewRating: 0,
      },
    };
  },
  methods: {
    submitReview() {
      let formData = new FormData();
      formData.append("twReviewTitle", this.contentData.twReviewTitle);
      formData.append("twReviewContent", this.contentData.twReviewContent);
      formData.append("twReviewRating", this.contentData.twReviewRating);

      this.$axios
        .post("/api1/reviewInsert", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status) {
            alert("리뷰가 성공적으로 등록되었습니다.");
            this.$router.push("/reviews");
          } else {
            alert("리뷰 등록에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("리뷰 등록 중 오류 발생", error);
          alert("리뷰 등록 중 오류가 발생했습니다.");
        });
    },
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#editor"), {
      language: "ko",
      ckfinder: {
        uploadUrl: "http://" + process.env.VUE_APP_BACK_URL + "/api1/imgUpload",
      },
    })
      .then((editor) => {
        editor.model.document.on("change:data", () => {
          this.contentData.twReviewContent = editor.getData();
        });
      })
      .catch((error) => {
        console.error("에디터 초기화 중 오류 발생", error);
      });
  },
};
</script>

<style scoped>
body {
  background-color: #e6f7ff;
  padding-top: 20px;
}
.site-name {
  background-color: #0056b3;
  color: #ffffff;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.btn-submit {
  background-color: #0056b3;
  color: #ffffff;
  border: none;
}
</style>

<style>
.ck-editor__editable {
  min-height: 300px;
}
</style>
