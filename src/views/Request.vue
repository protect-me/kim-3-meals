<template>
  <div class="container">
    <div class="request-header">
      <div class="title">
        맛집 출장 요청
      </div>
      <div class="result-mode">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            v-model="resultMode.new" />
          <label
            class="btn btn-outline-primary"
            for="btnradio1"
            @click="changeResultMode('new')">
            New
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off" 
            v-model="resultMode.old" />
          <label
            class="btn btn-outline-primary"
            for="btnradio2"
            @click="changeResultMode('old')">
            Old
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off" 
            checked
            v-model="resultMode.like" />
          <label
            class="btn btn-outline-primary"
            for="btnradio3"
            @click="changeResultMode('like')">
            Like
          </label>
        </div>
      </div>
    </div>

    <div class="request-body">
      <div>
        리스트
      </div>
    </div>
    
    <div class="request-input">
      <div
        v-if="!user"
        class="input-content input-non-user">
        <div class="input-wrapper">
          <div class="notice-wrapper">
            <div class="notice">
              출장 요청은 로그인을 해야 가능합니다. 👉🏻
            </div>
          </div>
        </div>
        <div class="input-btn">
          <button
            class="btn btn-primary"
            @click="moveToMypage">
            로그인<br />
            페이지<br />
            이 동<br />
          </button>
        </div>
      </div>

      <div
        v-else
        class="input-content input-user">
        <div class="input-wrapper">
          <div class="input-group mb-1">
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              placeholder="상호명" />
          </div>

          <div class="selects mb-1">
            <select
              v-model="form.category"
              class="form-select">
              <option selected>
                카테고리
              </option>
              <option
                v-for="(category, index) in categories"
                :key="index">
                {{ category }}
              </option>
            </select>
          </div>

          <div class="input-group mb-1">
            <input
              v-model="form.comment"
              type="text"
              class="form-control"
              placeholder="코멘트(100자 이하, 추천 메뉴/사유 등)" />
          </div>

          <div class="input-group mb-1 addressInput">
            <input
              v-model="form.address"
              type="text"
              class="form-control"
              placeholder="주소(클릭)"
              @click="openAddressModal"
              readonly />
          </div>
        </div>
        <div class="input-btn">
          <button
            class="btn btn-primary"
            @click="apply">
            출장<br />
            요청
          </button>
        </div>
      </div>
    </div>

    <modal
      v-if="showModal"
      body
      footer
      @close="closeAddressModal">
      <!-- "v-slot:header" === "#header"-->
      <template #body>
        <VueDaumPostcode @complete="addressSelected($event.roadAddress)" />
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { VueDaumPostcode } from "vue-daum-postcode"
import Modal from "@/Utils/Modal"

export default {
  components: {
    Modal,
    VueDaumPostcode
  },
  created() {
    this.subscribe()
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe()
  },
  computed: {
    ...mapState(["fireUser", "user"])
  },
  data() {
    return {
      showModal: false,
      isProcessing: false,
      requests: [],
      resultMode: {
        new: "on",
        old: "off",
        like : "off",
      },
      categories: ['한식', '중식', '일식', '양식', '분식', '구이', '회/초밥', '포차/가맥', '기타'],
      form: {
        name: '',
        category: '카테고리',
        comment: '',
        address: '',
      }
    }
  },
  methods: {
    subscribe() {
    this.unsubscribe = this.$firebase.firestore().collection("requests").onSnapshot((snapshot) => {
      if (snapshot.empty) {
        this.requests = []
        return
      }
      this.requests = snapshot.docs.map(value => {
        const item = value.data()
        return {
          id: value.id,
          userName: item.userName,
          name: item.name,
          category: item.category,
          address: item.address,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }
      })
      })
    },
    changeResultMode(changed) {
      for (const mode in this.resultMode) {
        (mode == changed) 
          ? this.resultMode[mode] = 'on'
          : this.resultMode[mode] = 'off'
      }
    },
    moveToMypage() {
      this.$router.push({name:"Mypage"})
    },
    addressSelected(selectedAddress) {
      this.form.address = selectedAddress
      this.closeAddressModal()
    },
    openAddressModal() {
      this.showModal = true
    },
    closeAddressModal() {
      this.showModal = false
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
      if (!this.form.address) {
        alert("주소를 확인해주세요")
        this.isProcessing = false
        return
      }
      if (this.fireUser && this.fireUser.uid && this.fireUser.displayName) {
        this.form.uid = this.fireUser.uid
        this.form.displayName = this.fireUser.displayName
      } else {
        alert("로그인 정보를 확인해주세요")
        this.isProcessing = false
        return
      }

      try {
        await this.$firebase.firestore().collection("requests").add(this.form)
        this.initForm() // form 초기화
        alert("성공적으로 등록되었습니다.")
      } catch(err) {
        alert("등록에 실패했습니다.", err.message)
      } finally {
        this.isProcessing = false
      }
    },
    initForm(){
      this.form = {
        name: '',
        category: '카테고리',
        comment: '',
        address: '',
        uid: '',
        displayName: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: 'TmonMonsori';
  position: relative;
  .request-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: flex-end;
      font-size: 30px;
      color: $primary;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .result-mode {
      .btn-group {
        margin-top: 4px;
        label {
          font-size: 12px;
        }
      }
    }
  }
  .request-input {
    .input-content {
      display: flex;
      .input-wrapper {
        width: calc(100% - 90px);
        margin-right: 10px;
        .notice-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $gray-200;
          color: $gray-600;
          border-radius: 5px;
        }
      }
      button { 
        width: 80px;
        height: 100%;
      }
    }
  }
}

</style>