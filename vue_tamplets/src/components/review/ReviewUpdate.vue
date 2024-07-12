<template>
  <div class="container">
    <h1>리뷰 수정</h1>
    <form @submit.prevent="updateReview">
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
        <textarea id="editor" cols="30" rows="10"></textarea>
      </div>
      <div class="form-group">
        <star-rating v-model="contentData.twReviewRating"></star-rating>
      </div>
      <button type="submit" class="btn btn-submit">수정</button>
    </form>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import StarRating from "../review/StarRating.vue"
import axios from "axios"

export default {
  components: {
    StarRating,
  },
  data() {
    return {
      contentData: {
        twReviewNo: "",
        twReviewTitle: "",
        twReviewContent: "",
        twReviewRating: 0,
      },
      editorInstance: null,
    }
  },
  methods: {
    updateReview() {
      if (
        !this.contentData.twReviewTitle ||
        !this.contentData.twReviewContent ||
        this.contentData.twReviewRating === null
      ) {
        alert("모든 필드를 입력해주세요.")
        return
      }

      const data = {
        ...this.contentData,
        twReviewRating: Number(this.contentData.twReviewRating),
      }

      axios
        .post("/api1/reviewUpdate", data)
        .then((response) => {
          console.log(response.data)
          if (response.data.status) {
            alert("리뷰가 성공적으로 수정되었습니다.")
            this.$router.push("/reviews")
          } else {
            alert("리뷰 수정에 실패했습니다.")
          }
        })
        .catch((error) => {
          console.error("리뷰 수정 중 오류 발생:", error)
        })
    },
  },
  mounted() {
    const reviewId = this.$route.params.twReviewNo

    axios
      .post("/api1/reviewView", { twReviewNo: reviewId })
      .then((response) => {
        const review = response.data.review
        this.contentData.twReviewNo = String(review.twReviewNo)
        this.contentData.twReviewTitle = review.twReviewTitle || ""
        this.contentData.twReviewContent = review.twReviewContent || ""
        this.contentData.twReviewRating = review.twReviewRating || 0

        ClassicEditor.create(document.querySelector("#editor"), {
          language: "ko",
          ckfinder: {
            uploadUrl: "/api1/imgUpload",
          },
        })
          .then((editor) => {
            this.editorInstance = editor

            // CKEditor의 데이터 변경 이벤트를 핸들링합니다.
            editor.model.document.on("change:data", () => {
              this.contentData.twReviewContent = editor.getData()
            })

            // CKEditor가 초기화된 후 데이터를 설정합니다.
            editor.setData(this.contentData.twReviewContent)
          })
          .catch((error) => {
            console.error("에디터 초기화 중 오류 발생", error)
          })
      })
      .catch((error) => {
        console.error("리뷰 정보를 가져오는 중 오류 발생:", error)
      })
  },
}
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
