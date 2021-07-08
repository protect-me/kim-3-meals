import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './plugins/firebase'

const app = createApp(App).use(store).use(router)
app.config.globalProperties.$firebase = firebase
app.mount('#app')

