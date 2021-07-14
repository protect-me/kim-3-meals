import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loadImage from "./plugins/loadImage"
import firebase from './plugins/firebase'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// const app = createApp(App).use(store).use(router).use(BootstrapVue).use(IconsPlugin)
const app = createApp(App).use(store).use(router).use(loadImage)
app.config.globalProperties.$firebase = firebase
app.mount('#app')

