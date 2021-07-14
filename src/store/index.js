import { createStore } from 'vuex'
import firebase from "../plugins/firebase.js"

export default createStore({
  state: {
    stores: [],
    loading: false,
  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetStores(state) {
      state.stores = []
      state.loading = false
    }
  },
  actions: {
    async searchStores({state, commit}, payload) {
      if (state.loading) return // loading 중일 경우 return 

      commit('updateState', { loading: true }) // Loading On

      state.loading = true
      let snapshot = null
      let stores = null
      const { keyword, category } = payload;
      
      if(category == "카테고리") {
        // 카테고리가 선택되지 않은 경우, 모든 데이터 get
        try {
          snapshot = await firebase.firestore().collection("store").orderBy('createdAt', 'desc').get()
        } catch (err) {
          console.log(err);
          commit('updateState', { loading: false }) // Loading Off
        }
      } else {
        // 카테고리가 선택된 경우, 1차 필터링
        try{
          snapshot = await firebase.firestore().collection("store").where("category", "==", category).orderBy('createdAt', 'desc').get()
        } catch (err) {
          console.log(err);
          commit('updateState', { loading: false }) // Loading Off
        }
      }

      if (keyword) {
        // 키워드가 있을 경우 front-end 에서 filtering
        // String.includes(keyword)의 값이 true인 것들만 filtering
        stores = snapshot.docs.filter(value => {
          const item = value.data()
          const combine = Object.values(item).join(",")
          return combine.includes(keyword)
        })
      } else { 
        // 키워드가 없을 경우
        stores = snapshot.docs
      }
      
      stores = stores.map(value => {
        const item = value.data()
        // "?v=", "&t=" 두 문자열 사이의 문자열을 추출
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
      commit("updateState", {
        stores: stores,
        loading: false
      })
    }
  },
  modules: {
  }
})
