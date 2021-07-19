// firebase
import firebase from "firebase/app"
import 'firebase/auth' // firebase auth
import 'firebase/firebase-database' // realtime database
import 'firebase/firebase-firestore' // firestore import
import firebaseConfig from '../../firebaseConfig'
import store from '../store'
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user) => {
  store.commit("setFireUser", user)
})

export default firebase