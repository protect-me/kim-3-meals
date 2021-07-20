// firebase
import firebase from "firebase/app"
import 'firebase/auth' // firebase auth
import 'firebase/firebase-database' // realtime database
import 'firebase/firebase-firestore' // firestore import
import firebaseConfig from '../../firebaseConfig'
import store from '../store'

firebase.initializeApp(firebaseConfig)
let unsubscribe = null

// Set Firestore User
const subscribe = (fireUser) => {
  const ref = firebase.firestore().collection('users').doc(fireUser.uid)
  unsubscribe = ref.onSnapshot(doc => {
    if (doc.exists) store.dispatch('setUser', doc.data())
  }, console.error)
}

// Set Realtime Database User
firebase.auth().onAuthStateChanged((fireUser) => {
  store.dispatch("setFireUser", fireUser)
  if (!fireUser) {
    store.dispatch('setUser', null)
    if (unsubscribe) unsubscribe()
    return
  }
  subscribe(fireUser)
})

// Auth 변경 감지 => Set Realtime Database User => Set Firestore User

export default firebase