<template>
  <div class="container">
    <div class="store-list">
      <table class="table table-striped">
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
            <th scoped="col">
              수정
            </th>
            <th scoped="col">
              삭제
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
            <td class="td-btn">
              <button
                class="btn btn-primary btn-sm"
                @click="updateStore(store)">
                수정
              </button>
            </td>
            <td class="td-btn">
              <button
                class="btn btn-danger btn-sm"
                @click="deleteStore(store)">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="regist">
      <button
        class="btn btn-danger btn-sm"
        @click="moveToRegist">
        신규 등록
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      unsubscribe: null,
      form: {},
      stores: []
    }
  },
  created() {
    this.subscribe()
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    subscribe() {
    this.unsubscribe = this.$firebase.firestore().collection("store").onSnapshot((snapshot) => {
      if (snapshot.empty) {
        this.stores = []
        return
      }
      this.stores = snapshot.docs.map(value => {
        const item = value.data()
        const subIndex = item.url.indexOf("?v=")
        const videoId = item.url.substring(subIndex+3, subIndex+14)
        const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`
        return {
          id: value.id,
          name: item.name,
          category: item.category,
          address: item.address,
          addressJibun: item.addressJibun,
          addressSigungu: item.addressSigungu,
          addressLocal: item.addressLocal,
          lat: item.lat,
          lng: item.lng,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          url: item.url,
          thumbnail: thumbnail
        }
      })
      })
    },
    updateStore(store) {
      this.$router.push({name: 'Regist', params: { storeId: store.id }})
    },
    async deleteStore(store) {
      if (confirm("삭세 후 다시 복구할 수 없습니다. 그래도 삭제하시겠습니까?")) {
        try {
          await this.$firebase.firestore().collection("store").doc(store.id).delete()
          alert("성공적으로 삭제되었습니다!")
        } catch(err) {
          console.log(err);
        }
      }
    },
    moveToRegist() {
      this.$router.push({name:'Regist'})
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  .store-list {
    width: 100%;
    background-color: #fff;
    table {
      font-size: 14px;
      tbody {
        tr {
          .td-btn {
            padding: 2px;
          }
        }
      }
    }
  }
  .regist {
    float: right;
    margin-right: 10px;
  }
}
</style>
