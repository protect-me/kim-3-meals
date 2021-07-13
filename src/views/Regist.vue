<template>
  <div class="container">
    <div class="title">
      신규 상호 등록
    </div>
  
    <div class="input-group mb-3">
      <input
        v-model="form.name"
        type="text"
        class="form-control"
        placeholder="상호명" />      
    </div>

    <div class="selects mb-3">
      <select
        v-model="form.category"
        class="form-select">
        <option
          selected
          class="default">
          카테고리
        </option>
        <option
          v-for="(category, index) in categories"
          :key="index">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="input-group mb-3">
      <input
        v-model="form.url"
        type="text"
        class="form-control"
        placeholder="유튜브 링크 (ex. https://www.youtube.com/watch?...)" />
    </div>

    <div class="input-group mb-3">
      <input
        v-model="form.tag"
        type="text"
        class="form-control"
        placeholder="태그 (메뉴명, 지역명 등을 #으로 구분해서 입력해주세요)" />
    </div>

    <div class="input-group mb-3 addressInput">
      <input
        v-model="form.address"
        type="text"
        class="form-control" 
        placeholder="주소 (아래에서 검색/선택 해주세요)"
        readonly />
    </div>

    <div class="input-group mb-3 daum-wrapper">
      <VueDaumPostcode @complete="addressSelected($event)" />
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button
        class="btn btn-primary"
        :disabled="isProcessing"
        @click="apply">
        등록
      </button>
    </div>
  </div>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode"
import axios from "axios"

export default {
  components: {
    VueDaumPostcode,
  },
  data() {
    return {
      isProcessing: false,
      categories: ['한식', '중식', '일식', '양식', '분식', '구이', '회/초밥', '기타'],
      vueDaumPostcodeInput: null,
      form: {
        name: '',
        url: '',
        category: '카테고리',
        tag: '',
        address: '',
        lat: '',
        lng: ''
      }
    }
  },
  methods: {
    addressSelected(selectedAddress) {
      this.form.address = selectedAddress.roadAddress
    },
    async getLatLng() {
      // JavaSciprt Key : e9b8744f142d87e82a9a840a32aa395b
      // REST API Key : 8aec30f44a150144c4bcac2194e4d9f7

      let restAPIKey = "8aec30f44a150144c4bcac2194e4d9f7" // REST API key
      let queryString = this.form.address

      let URL = "https://dapi.kakao.com/v2/local/search/address.json?query=" + queryString
      axios.defaults.withCredentials = false
      axios.defaults.headers.common["Authorization"] = "KakaoAK " + restAPIKey
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
      await axios
        .get(URL)
        .then((res) => {
          this.form.lat = res.data.documents[0].y
          this.form.lng = res.data.documents[0].x
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async apply() {
      this.isProcessing = true
      if (!this.form.name) {
        alert("상호명을 확인해주세요") 
        this.isProcessing = false
        return
      }
      if (!this.form.category || this.form.category == "카테고리") {
        alert("카테고리를 확인해주세요")
        this.isProcessing = false
        return
      }
      if (!this.form.url) {
        alert("유튜브 링크를 확인해주세요")
        this.isProcessing = false
        return
      }
      await this.getLatLng()
      if (!this.form.address || !this.form.lat || !this.form.lng ) {
        alert("주소를 확인해주세요")
        this.isProcessing = false
        return
      }

      try {
        await this.$firebase.firestore().collection("store").add(this.form)
        alert("성공적으로 등록되었습니다.")
        // form 초기화
        this.form.name = "",
        this.form.category = "카테고리",
        this.form.address = "",
        this.form.url = "",
        this.form.tag = "",
        this.form.lat = "",
        this.form.lng = ""
      } catch (err) {
        alert(err.message)
        console.log(err);
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: 'TmonMonsori';
  .title {
    font-size: 30px;
    color: $primary;
    margin-bottom: 20px;
  }
  .daum-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>