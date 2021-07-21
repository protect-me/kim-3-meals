const functions = require('firebase-functions');
// firebase 콘솔 > 프로젝트 개요 옆 설정 아이콘 > 프로젝트 설정 > 서비스 계정 > Firebase Admin SDK > Node.js
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url
});

const db = admin.database()
const fdb = admin.firestore()


exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const time = new Date()
  const userInfo = {
    email, 
    displayName, 
    photoURL,
    createdAt : time,
    level: email == functions.config().admin.email ? 0 : 5
  }
  await fdb.collection('users').doc(uid).set(userInfo) // set user at Firestore
  userInfo.createdAt = time.getTime()
  db.ref('users').child(uid).set(userInfo) // set user at RealTime Database
});

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  await db.ref('users').child(uid).remove()
  await fdb.collection('users').doc(uid).delete()
});