<template>
  <div class="container">
    <div class="search-header">
      <div class="title">검색 및 리스트</div>

      <div class="subtitle">
        <div class="result-count">결과 {{ Object.keys(stores).length }} 개</div>

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
              v-model="resultMode.list"
            />
            <label
              class="btn btn-outline-primary"
              for="btnradio1"
              @click="changeResultMode('list')"
            >
              <i class="fa fa-list" aria-hidden="true"></i>
            </label>

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio2"
              autocomplete="off"
              v-model="resultMode.card"
            />
            <label
              class="btn btn-outline-primary"
              for="btnradio2"
              @click="changeResultMode('card')"
            >
              <i class="fa fa-th-large" aria-hidden="true"></i>
            </label>

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio3"
              autocomplete="off"
              checked
              v-model="resultMode.map"
            />
            <label
              class="btn btn-outline-primary"
              for="btnradio3"
              @click="changeResultMode('map')"
            >
              <i class="fa fa-map" aria-hidden="true"></i>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="search">
      <input
        type="text"
        class="form-control search-input"
        v-model="form.keyword"
        placeholder="상호명 또는 메뉴를 검색해주세요"
        @keyup.enter="search"
      />

      <div class="selects">
        <select v-model="form.category" class="form-select">
          <option selected class="default">카테고리</option>
          <option v-for="(category, index) in categories" :key="index">
            {{ category }}
          </option>
        </select>

        <button class="btn btn-primary" @click="search">검색</button>
      </div>
    </div>

    <div class="result">
      <Loader v-if="loading" />

      <StoreMap v-else-if="resultMode.map == 'on'" :stores="stores" />

      <div v-else-if="stores.length <= 0 && !isSearched" class="no-result">
        <div class="no-result-text">
          검색어를 입력하거나 카테고리를 선택해주세요 :)
        </div>
      </div>

      <div v-else-if="stores.length <= 0 && isSearched" class="no-result">
        <div class="no-result-text">검색 결과가 없습니다 :(</div>
      </div>

      <StoreList
        v-else-if="stores.length > 0 && resultMode.list == 'on'"
        :stores="stores"
      />

      <StoreCard
        v-else-if="stores.length > 0 && resultMode.card == 'on'"
        :stores="stores"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StoreList from "@/components/StoreList";
import StoreCard from "@/components/StoreCard";
import StoreMap from "@/components/StoreMap";
import Loader from "@/components/Loader";
import { getCookie, setCookie } from "@/plugins/cookie.js";

export default {
  components: {
    StoreList,
    StoreCard,
    StoreMap,
    Loader,
  },
  mounted() {
    this.checkVisitCount("searchPage");
  },
  computed: {
    ...mapState(["stores", "loading"]),
  },
  data() {
    return {
      isSearched: false,
      resultMode: {
        list: "off",
        card: "off",
        map: "on",
      },
      categories: [
        "한식",
        "중식",
        "일식",
        "양식",
        "분식",
        "구이",
        "회/초밥",
        "기타",
      ],
      form: {
        keyword: "",
        category: "카테고리",
      },
    };
  },
  methods: {
    search() {
      this.isSearched = true;
      for (const arr of Object.entries(this.resultMode)) {
        if (arr.includes("on")) this.form.resultMode = arr[0];
      }
      this.$store.dispatch("searchStores", this.form);
    },
    changeResultMode(changed) {
      for (const mode in this.resultMode) {
        mode == changed
          ? (this.resultMode[mode] = "on")
          : (this.resultMode[mode] = "off");
      }
    },
    checkVisitCount(pageName) {
      const cookieName =
        "kim3mealsVisitHistory" +
        pageName[0].toUpperCase() +
        pageName.slice(1, pageName.length);
      const userHistory = getCookie(cookieName);
      if (!userHistory) {
        setCookie(cookieName, pageName, 1);
        this.visitCountUp(pageName);
      }
    },
    async visitCountUp(pageName) {
      try {
        await this.$firebase
          .firestore()
          .collection("meta")
          .doc("visitCounts")
          .update(pageName, this.$firebase.firestore.FieldValue.increment(1));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 70px;
  font-family: "TmonMonsori";
  .search-header {
    margin-bottom: 20px;
    display: flex;
    .title {
      display: flex;
      align-items: flex-end;
      font-size: 30px;
      color: $primary;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .subtitle {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;
      .result-count {
        font-size: 15px;
        color: $gray-600;
      }
    }
  }
  .search {
    display: flex;
    margin-bottom: 20px;
    .search-input {
      margin-right: 10px;
    }
    .selects {
      display: flex;
      select {
        width: 120px;
        margin-right: 10px;
      }
      .btn {
        width: 80px;
        flex-shrink: 0;
      }
    }
  }
  .result {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    max-height: calc(100vh - 240px);
    overflow: scroll;
    border-radius: 5px;
    background-color: $gray-200;
    color: $gray-600;
    overflow-x: hidden;
  }
  @include media-breakpoint-down(lg) {
    .search {
      display: block;
      .search-input {
        margin-right: 0;
        margin-bottom: 10px;
      }
      .selects {
        display: flex;
        select {
          width: 50%;
        }
        .btn {
          width: 50%;
        }
      }
    }
  }
  @include media-breakpoint-down(sm) {
    .search-header {
      display: block;
      .title {
        display: none;
      }
    }
  }
}
</style>