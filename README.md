# kim-3-meals

## 링크
[김사원세끼 맛집 지도](https://sleepy-kalam-47be42.netlify.app "Go kim-3-meals")

## 개요
유튜브 김세원 세끼 맛집 지도 및 출장 요청 페이지
Configuration Tree
```
├── Search(검색)
│   │  (Search By: Input Keyword, Select Category)
│   ├── List View(리스트)
│   ├── Card View(카드)
│   └── Map View(지도)
├── Request(요청)
│   │  (Sort By: creatdAt Desc, createdAt Asc, Like Count)
│   ├── Read
│   ├── Write(Regist)
│   ├── Update
│   ├── Delete
│   ├── Like(좋아요)
│   └── Cancle Like(좋아요 취소)
├── About
│   ├── kim-3-meals(김사원세끼)
│   └── protect-me(프로텍트미)
├── Mypage
│   │  (Firebase Authentication)
│   ├── Login(로그인)
│   ├── Logout(로그아웃)
│   └── Move To Admin(관리자 페이지 이동)
│       (Admin Account Only / 관리자 계정 한정)
└── Admin
    ├── Read
    ├── Write(Regist)
    ├── Update
    └── Delete
```


### .env
root > .env => delete [, ' " comment blank]

> KaKao developers
1. 카카오 개발자사이트 (https://developers.kakao.com) 접속
2. 개발자 등록 및 앱 생성
3. 웹 플랫폼 추가: 앱 선택 – [플랫폼] – [Web 플랫폼 등록] – 사이트 도메인 등록
4. 사이트 도메인 등록: [웹] 플랫폼을 선택하고, [사이트 도메인] 을 등록합니다. (예: http://localhost:8080)

#### Kakao Address : REST API Key
(kakao develeopers > App Key > REST API Key)
VUE_APP_KAKAO_ADDRESS_REST_API_KEY=''

#### Kakao Map : JavaScript Key
(kakao develeopers > App Key > JavaScript Key)
VUE_APP_KAKAO_MAP_JAVASCRIPT_KEY=''

#### Firebase : firebaseConfig.js
1. Firebase 콘솔 > 프로젝트 개요 옆 설정 아이콘 > 프로젝트 설정 > 일반 > 내 앱 > 앱 추가)
2. SDK 설정 및 구성 > 구성앱의 키 및 식별자가 포함된 Firebase 구성 객체
VUE_APP_apiKey=''
VUE_APP_authDomain=''
VUE_APP_projectId=''
VUE_APP_storageBucket=''
VUE_APP_messagingSenderId=''
VUE_APP_appId=''
VUE_APP_measurementId=''


### Firebase : key.json
- Firebase Blaze 요금제 구매

- key.json 생성
1. Firebase 콘솔 > 프로젝트 개요 옆 설정 아이콘 > 프로젝트 설정 > 서비스 계정 > Firebase Admin SDK > Node.js > 새 비공개 키 생성
2. 내려받은 json 파일을 key.json 파일로 이름변경
3. root > functions 폴더 내에 key.json 파일 대체

- functions 수정 후 deploay
`$ firebase deploy --only functions`


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
    function updateLikeCount(before, after) {
      return before.address == after.address &&
        before.category == after.category &&
        before.comment == after.comment &&
        before.createdAt == after.createdAt &&
        before.id == after.id &&
        before.name == after.name &&
        before.uid == after.uid &&
        before.userName == after.userName &&
        before.likeCount != after.likeCount &&
        before.likeUserList != after.likeUserList    
    }

    match /users/{userId} {
      allow read: if approveLevel(0) 
        || (request.auth != null && request.auth.uid == userId);
      allow update: if approveLevel(0)
        || (request.auth != null && request.auth.uid == userId && resource.data.level == request.resource.data.level);
      allow create, delete: if false; // functions
    }
    match /store/{storeId} {
      allow read: if true;
      allow create: if approveLevel(0);
      allow update, delete: if approveLevel(0) 
        || resource.data.uid == request.auth.uid;
    }
    match /requests/{requestId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if approveLevel(0)
        || (request.auth != null && resource.data.uid == request.auth.uid)
        || updateLikeCount(resource.data, request.resource.data)
      allow delete: if approveLevel(0) 
        || (request.auth != null && resource.data.uid == request.auth.uid)
    }
  }
}
```
### deploy
`$ firebase deploy --only firestore`

