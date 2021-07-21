# kim-3-meals

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Firebase Environment configuration
https://firebase.google.com/docs/functions/config-env
### set
`$ firebase functions:config:set admin.email="" admin.db_url=""`
### get
`firebase functions:config:get`
### use example
`functions.config().admin.db_url`


## firestore.rules
### init
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 8, 7);
    }
  }
}
```
### changed
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function approveLevel(level) {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.level <= level;
    }
    match /users/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
      allow create, delete: if false; // functions
    }
    match /store/{storeId} {
      allow read: if true;
      allow create: if approveLevel(0);
      allow update, delete: if approveLevel(0) || resource.data.uid == request.auth.uid;
    }
  }
}
```
### deploy
`$ firebase deploy --only firestore`