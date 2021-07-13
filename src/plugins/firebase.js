// firebase
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firebase-database' // realtime database
import 'firebase/firebase-firestore' // firestore import
import firebaseConfig from '../../firebaseConfig'
firebase.initializeApp(firebaseConfig)

export default firebase