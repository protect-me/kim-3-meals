// firebase
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firebase-database'
import firebaseConfig from '../../firebaseConfig'
firebase.initializeApp(firebaseConfig)

export default firebase