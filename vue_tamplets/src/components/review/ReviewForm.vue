<template>
  <div>
    <div class="container">
      <h1>리뷰 작성</h1>
      <form @submit.prevent="submitReview">
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
            v-model="contentData.tw_review_content"
            name="tw_review_content"
            id="editor"
            cols="30"
            rows="10"
            @input="updateContentData"
          ></textarea>
        </div>
        <div class="form-group">
          <star-rating v-model="contentData.tw_review_rating"></star-rating>
        </div>
        <div class="form-group">
          <input type="file" @change="handleFileUpload" />
        </div>
        <button type="submit" class="btn btn-submit">등록</button>
      </form>
    </div>
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
        tw_review_title: "",
        tw_review_content: "",
        tw_review_rating: 0,
      },
      selectedFile: null,
    }
  },
  methods: {
    submitReview() {
      console.log("리뷰 제목:", this.contentData.tw_review_title)
      console.log("리뷰 내용:", this.contentData.tw_review_content)
      console.log("별점:", this.contentData.tw_review_rating)

      let formData = new FormData()
      formData.append("tw_review_title", this.contentData.tw_review_title)
      formData.append("tw_review_content", this.contentData.tw_review_content)
      formData.append("tw_review_rating", this.contentData.tw_review_rating)
      if (this.selectedFile) {
        formData.append("file", this.selectedFile)
      }

      axios
        .post("/api1/reviewInsert", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.includes("Inserted review")) {
            alert("리뷰가 성공적으로 등록되었습니다.")
            this.$router.push("/reviews")
          } else {
            alert("리뷰 등록에 실패했습니다.")
          }
        })
        .catch((error) => {
          console.error("There was an error!", error)
        })
    },
    updateContentData(event) {
      this.contentData.tw_review_content = event.target.value
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0]
    },
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#editor"), {
      language: "ko",
      ckfinder: {
        uploadUrl: "https://new-upload-url.com/upload",
      },
      simpleUpload: {
        uploadUrl: "https://new-upload-url.com/upload",
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": "CSRF-Token",
        },
      },
    })
      .then((editor) => {
        editor.model.document.on("change:data", () => {
          this.contentData.tw_review_content = editor.getData()
        })
      })
      .catch((error) => {
        console.error(error)
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
