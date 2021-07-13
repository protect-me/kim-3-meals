<template>
  <div class="container">
    <div class="title">
      검색 및 리스트
      <span>
        전체 {{ Object.keys(stores).length }} 개
      </span>
    </div>

    <div class="search">
      <input
        type="text"
        class="form-control search-input"
        placeholder="상호명 또는 메뉴를 검색해주세요" />

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

    <div class="list">
      <table class="table table-striped">
        <caption></caption>
        <thead>
          <tr>
            <th scoped="col">
              상호명
            </th>
            <th scoped="col">
              카테고리
            </th>
            <th scoped="col">
              주소
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(store, index) in stores"
            :key="index">
            <td>{{ store.name }}</td>
            <td>{{ store.category }}</td>
            <td>{{ store.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  mounted(){
    this.$store.dispatch("searchStores")
  },
  computed: {
    ...mapState(["stores"])
  },
  data() {
    return {
      categories: ['한식', '중식', '일식', '양식', '분식', '구이', '회/초밥', '기타'],
      form: {
        category: '카테고리'
      }
    }
  },
  methods: {
    search() {
      console.log(this.form);
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
    select {
      width: 120px;
      margin-right: 10px;
    }
    .btn {
      width: 80px;
      flex-shrink: 0;
    }
  }
  .list {
  }
}
</style>