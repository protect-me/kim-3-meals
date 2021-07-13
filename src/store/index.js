import { createStore } from 'vuex'
import firebase from "../plugins/firebase.js"

export default createStore({
  state: {
    stores: ["basic"],
    loading: true,
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
    async searchStores({commit}) {
      const sn = await firebase.firestore().collection("store").get()
      const stores = sn.docs.map(v => {
        const item = v.data()
        return {
          id: v.id,
          name: item.name,
          category: item.category,
          address: item.address,
          lat: item.lat,
          lng: item.lng
        }
      })
      commit("updateState", {
        stores: stores
      })
    }
  },
  modules: {
  }
})
