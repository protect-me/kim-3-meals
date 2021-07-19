const functions = require('firebase-functions');
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kim-3-meals-default-rtdb.firebaseio.com"
});

const db = admin.database()

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const userInfo = {
    email, 
    displayName, 
    photoURL,
    createdAt : new Date()
  }
  db.ref('users').child(uid).set(userInfo)
});

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  db.ref('users').child(uid).remove()
});