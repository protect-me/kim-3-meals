<template>
  <div class="container">
    <div class="request-header">
      <div class="title">출장 요청</div>
      <div class="result-mode">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            v-model="resultMode.new"
          />
          <label
            class="btn btn-outline-primary"
            for="btnradio1"
            @click="changeResultMode('new')"
          >
            New
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
            v-model="resultMode.old"
          />
          <label
            class="btn btn-outline-primary"
            for="btnradio2"
            @click="changeResultMode('old')"
          >
            Old
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off"
            checked
            v-model="resultMode.like"
          />
          <label
            class="btn btn-outline-primary"
            for="btnradio3"
            @click="changeResultMode('like')"
          >
            Like
          </label>
        </div>
      </div>
    </div>

    <div class="request-body">
      <div v-if="requests && requests.length == 0" class="request-list no-data">
        <div class="notice">등록된 맛집 출장 요청이 없습니다 :(</div>
      </div>
      <div v-else class="request-list">
        <RequestItem
          v-for="(request, index) in requests"
          :key="index"
          :request="request"
          @editModeOn="editModeOn"
          @requestDeleted="editCancle"
        />
      </div>
    </div>

    <div class="request-input">
      <div v-if="!user" class="input-content input-non-user">
        <div class="input-wrapper">
          <div class="notice-wrapper">
            <div class="notice">
              로그인을 하면 <br />
              출장 요청이 가능합니다 👉🏻
            </div>
          </div>
        </div>
        <div class="input-btn">
          <button class="btn btn-primary" @click="moveToMypage">
            로그인<br />
            페이지<br />
            이 동<br />
          </button>
        </div>
      </div>

      <div v-else class="input-content input-user">
        <div class="input-wrapper">
          <div class="input-group mb-1">
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              placeholder="상호명"
            />
          </div>

          <div class="selects mb-1">
            <select v-model="form.category" class="form-select">
              <option selected>카테고리</option>
              <option v-for="(category, index) in categories" :key="index">
                {{ category }}
              </option>
            </select>
          </div>

          <div class="input-group mb-1">
            <input
              v-model="form.comment"
              type="text"
              class="form-control input-comment"
              maxlength="50"
              placeholder="코멘트(50자 이하, 추천 메뉴/사유 등)"
            />
            <div class="text-limit">{{ form.comment.length }} / 50</div>
          </div>

          <div class="input-group mb-1 addressInput">
            <input
              v-model="form.address"
              type="text"
              class="form-control"
              placeholder="주소(클릭)"
              @click="openAddressModal"
              readonly
            />
          </div>
        </div>
        <div class="input-btn">
          <div v-if="!editMode" class="btn-wrapper">
            <button class="btn btn-primary regist-btn" @click="apply">
              출장<br />
              요청
            </button>
          </div>
          <div v-else class="btn-wrapper">
            <button
              class="btn btn-primary btn-half edit-btn"
              @click="editApply"
            >
              수정
            </button>
            <button
              class="btn btn-danger btn-half cancle-btn"
              @click="editCancle"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>

    <modal v-if="showModal" body footer @close="closeAddressModal">
      <!-- "v-slot:header" === "#header"-->
      <template #body>
        <VueDaumPostcode @complete="addressSelected($event.roadAddress)" />
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { VueDaumPostcode } from "vue-daum-postcode";
import Modal from "@/Utils/Modal";
import RequestItem from "@/components/RequestItem";

export default {
  components: {
    VueDaumPostcode,
    Modal,
    RequestItem,
  },
  created() {
    this.subscribe();
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe();
  },
  computed: {
    ...mapState(["fireUser", "user"]),
  },
  watch: {
    resultMode: {
      deep: true,
      handler() {
        let currentMode = "";
        for (const mode in this.resultMode) {
          if (this.resultMode[mode] == "on") {
            currentMode = mode;
          }
        }
        switch (currentMode) {
          case "new":
            this.orderBy = "createdAt";
            this.orderByOption = "desc";
            break;
          case "old":
            this.orderBy = "createdAt";
            this.orderByOption = "asc";
            break;
          case "like":
            this.orderBy = "likeCount";
            this.orderByOption = "desc";
            break;
        }

        this.requests.sort((a, b) => {
          if (this.orderBy == "new" || this.orderBy == "old") {
            if (this.orderByOption == "asc") {
              return a[this.orderBy.seconds] - b[this.orderBy.seconds];
            } else {
              return b[this.orderBy.seconds] - a[this.orderBy.seconds];
            }
          } else {
            if (this.orderByOption == "asc") {
              return a[this.orderBy] - b[this.orderBy];
            } else {
              return b[this.orderBy] - a[this.orderBy];
            }
          }
        });
      },
    },
  },
  data() {
    return {
      showModal: false,
      isProcessing: false,
      editMode: false,
      editRequest: {},
      requests: [],
      resultMode: {
        new: "on",
        old: "off",
        like: "off",
      },
      orderBy: "likeCount",
      orderByOption: "desc",
      categories: [
        "한식",
        "중식",
        "일식",
        "양식",
        "분식",
        "구이",
        "회/초밥",
        "포차/가맥",
        "기타",
      ],
      form: {
        id: "",
        userName: "",
        uid: "",
        name: "",
        category: "카테고리",
        address: "",
        comment: "",
        createdAt: "",
        updatedAt: "",
        likeCount: 0,
        likeUserList: [],
      },
    };
  },
  methods: {
    editModeOn(request) {
      this.editMode = true;
      this.form = request;
    },
    editApply() {
      this.apply();
    },
    editCancle() {
      this.editMode = false;
      this.initForm();
    },
    subscribe() {
      this.unsubscribe = this.$firebase
        .firestore()
        .collection("requests")
        .orderBy(this.orderBy, this.orderByOption)
        .onSnapshot((snapshot) => {
          if (snapshot.empty) {
            this.requests = [];
            return;
          }
          this.requests = snapshot.docs.map((value) => {
            const item = value.data();
            return {
              id: value.id,
              userName: item.userName,
              uid: item.uid,
              name: item.name,
              category: item.category,
              address: item.address,
              comment: item.comment,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              likeCount: item.likeCount,
              likeUserList: item.likeUserList,
            };
          });
        });
    },
    changeResultMode(changed) {
      for (const mode in this.resultMode) {
        mode == changed
          ? (this.resultMode[mode] = "on")
          : (this.resultMode[mode] = "off");
      }
    },
    moveToMypage() {
      this.$router.push({ name: "Mypage" });
    },
    addressSelected(selectedAddress) {
      this.form.address = selectedAddress;
      this.closeAddressModal();
    },
    openAddressModal() {
      this.showModal = true;
    },
    closeAddressModal() {
      this.showModal = false;
    },
    async apply() {
      if (this.isProcessing) return;
      this.isProcessing = true;
      if (!this.form.name) {
        alert("상호명을 확인해주세요");
        this.isProcessing = false;
        return;
      }
      if (!this.form.category || this.form.category == "카테고리") {
        alert("카테고리를 확인해주세요");
        this.isProcessing = false;
        return;
      }
      if (!this.form.address) {
        alert("주소를 확인해주세요");
        this.isProcessing = false;
        return;
      }
      if (this.form.comment.length > 50) {
        alert("코멘트 길이는 최대 50자 입니다.");
        this.isProcessing = false;
        return;
      }
      if (this.fireUser && this.fireUser.uid && this.fireUser.displayName) {
        this.form.uid = this.fireUser.uid;
        this.form.userName = this.fireUser.displayName;
      } else {
        alert("로그인 정보를 확인해주세요");
        this.isProcessing = false;
        return;
      }

      try {
        if (!this.editMode) {
          // 등록 모드
          const createdAt = new Date();
          this.form.createdAt = createdAt;
          this.form.updatedAt = createdAt;
          const id = createdAt.getTime().toString();
          this.form.id = id;
          await this.$firebase
            .firestore()
            .collection("requests")
            .doc(id)
            .set(this.form);
        } else {
          // 수정 모드
          const id = this.form.id;
          const updatedAt = new Date();
          this.form.updatedAt = updatedAt;
          await this.$firebase
            .firestore()
            .collection("requests")
            .doc(id)
            .update(this.form);
        }
        this.initForm(); // form 초기화
        this.editMode = false; // editMode 초기화
        alert("성공적으로 등록되었습니다.");
      } catch (err) {
        alert("등록에 실패했습니다.", err);
        console.log(err);
      } finally {
        this.isProcessing = false;
      }
    },
    initForm() {
      this.form = {
        id: "",
        name: "",
        category: "카테고리",
        comment: "",
        address: "",
        uid: "",
        userName: "",
        createdAt: "",
        updatedAt: "",
        likeCount: 0,
        likeUserList: [],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-family: "TmonMonsori";
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
  .request-body {
    min-height: 200px;
    max-height: calc(100vh - 350px);
    overflow: scroll;
    background-color: $gray-200;
    border-radius: 5px;
    margin-bottom: 10px;
    .request-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .request-list.no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $gray-600;
      .notice {
        padding-top: 90px;
      }
    }
  }
  .request-input {
    .input-content {
      display: flex;
      .input-wrapper {
        width: calc(100% - 90px);
        margin-right: 10px;
        .input-group {
          position: relative;
          .input-comment {
            width: 50px;
          }
          .text-limit {
            font-size: 10px;
            position: absolute;
            bottom: 5px;
            right: 10px;
            z-index: 3;
            color: $gray-600;
            -webkit-text-stroke: 0.5px #fff;
          }
        }
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
      .btn-wrapper {
        width: 80px;
        height: 100%;
        .regist-btn {
          width: 100%;
          height: 100%;
        }
        .btn-half {
          width: 100%;
          height: 50%;
        }
      }
    }
  }
}
</style>