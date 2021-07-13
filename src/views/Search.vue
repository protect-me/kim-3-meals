<template>
  <div class="container">
    <div class="title">
      검색 및 리스트
      <span>
        결과 {{ Object.keys(stores).length }} 개
      </span>
    </div>

    <div class="search">
      <input
        type="text"
        class="form-control search-input"
        v-model="form.keyword"
        placeholder="상호명 또는 메뉴를 검색해주세요"
        @keyup.enter="search" />

      <div class="selects">
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

        <button
          class="btn btn-primary"
          @click="search">
          검색
        </button>
      </div>
    </div>

    <div
      v-if="stores.length <= 0"
      class="no-result">
      <div class="no-result-text">
        검색어를 입력하거나 카테고리를 선택해주세요 :)
      </div>
    </div>

    <StoreList
      v-else-if="stores.length > 0 && mode == 'list'" 
      :stores="stores" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import StoreList from "@/components/StoreList"

export default {
  components: {
    StoreList
  },
  computed: {
    ...mapState(["stores"])
  },
  data() {
    return {
      mode: 'list',
      categories: ['한식', '중식', '일식', '양식', '분식', '구이', '회/초밥', '기타'],
      form: {
        keyword: '',
        category: '카테고리'
      }
    }
  },
  methods: {
    search() {
      this.$store.dispatch("searchStores", this.form)
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
    span {
      font-size: 15px;
      color: $gray-600;
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
  .no-result {
    border-radius: 5px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $gray-200;
    color: $gray-600;
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
          width: 50%
        }
        .btn {
          width: 50%
        }
      }
    }
  }
}
</style>