<template>
  <div class="container">
    <h1>리뷰 수정</h1>
    <form @submit.prevent="updateReview">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="tw_review_title"
          v-model="contentData.tw_review_title"
          placeholder="리뷰 제목을 입력하세요..."
        />
      </div>
      <div class="form-group">
        <textarea
          id="tw_review_content"
          cols="30"
          rows="10"
          v-model="contentData.tw_review_content"
        ></textarea>
      </div>
      <div class="form-group">
        <star-rating v-model="contentData.tw_review_rating"></star-rating>
      </div>
      <button type="submit" class="btn btn-submit">수정</button>
    </form>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StarRating from "../review/StarRating.vue";
import axios from "axios";

export default {
  components: {
    StarRating,
  },
  data() {
    return {
      contentData: {
        tw_review_no: "",
        tw_review_title: "",
        tw_review_content: "",
        tw_review_rating: 0,
      },
      editor: null,
    };
  },
  methods: {
    fetchReviewDetails(reviewId) {
      axios
        .post("/api1/reviewView", { tw_review_no: reviewId })
        .then((response) => {
          const review = response.data.review;
          this.contentData.tw_review_no = String(review.tw_review_no);
          this.contentData.tw_review_title = review.tw_review_title || "";
          this.contentData.tw_review_content = review.tw_review_content || "";
          this.contentData.tw_review_rating = review.tw_review_rating || 0;

          // CKEditor 초기화 후 데이터 설정
          if (this.editor) {
            this.editor.setData(this.contentData.tw_review_content);
          }
        })
        .catch((error) => {
          console.error("Error fetching review details:", error);
        });
    },
    updateReview() {
      if (
        !this.contentData.tw_review_title ||
        !this.contentData.tw_review_content ||
        this.contentData.tw_review_rating === null
      ) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      axios
        .post("/api1/reviewUpdate", this.contentData)
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            alert("리뷰가 성공적으로 수정되었습니다.");
            this.$router.push("/reviews");
          } else {
            alert("리뷰 수정에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("Error updating review:", error);
        });
    },
  },
  mounted() {
    const reviewId = this.$route.params.tw_review_no;

    ClassicEditor.create(document.querySelector("#tw_review_content"), {
      language: "ko",
      ckfinder: {
        uploadUrl: "https://example.com/upload",
      },
      simpleUpload: {
        uploadUrl: "https://example.com/upload",
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": "CSRF-Token",
        },
      },
    })
      .then((editor) => {
        this.editor = editor;

        editor.model.document.on("change:data", () => {
          this.contentData.tw_review_content = editor.getData();
        });

        // CKEditor 초기화 후 데이터 가져오기
        this.fetchReviewDetails(reviewId);
      })
      .catch((error) => {
        console.error(error);
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
