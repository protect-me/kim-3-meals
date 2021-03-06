# kim-3-meals

## 소개
- 유튜브 김사원세끼 채널의 맛집을 데이터화하고 키워드 검색, 소팅, 지도 기능을 추가
- 구독자가 Google 계정(Youtube 계정 동일)으로 로그인하여 유튜버에게 맛집 방문 요청을 하는 '출장 요청' 페이지 구축
- 관리자 페이지에서 데이터 관리 가능(CRUD - Admin Only)

## 프로젝트 링크
[김사원세끼 맛집 지도](https://kim3meals.netlify.app/ "Go kim-3-meals")

## 개요

### SPECS
- Front End : Vue.js(Vue3)
- Back End : Firebase
- Style : SCSS
- Deployment : Netlify
- Build(Bundler) : Vue CLI 4

###  Configuration Tree
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

## 사용 예시 화면
- 검색 화면(지도)
<img src="https://media.vlpt.us/images/protect-me/post/b0e09d14-c3a3-4225-bfca-766b5d936315/image.png" width="700" alt="검색 화면(지도)">

- 검색 화면(카드)
<img src="https://media.vlpt.us/images/protect-me/post/3b9eb6ab-f516-48d6-9ace-cf641476cf6d/image.png" width="700" alt="검색 화면(카드)">

- 출장 요청 화면
<img src="https://media.vlpt.us/images/protect-me/post/3c40c739-15c9-4cdc-a20f-64c6a91423d6/image.png" width="700" alt="출장 요청 화면">

- 출장 요청 화면(주소 검색)
<img src="https://media.vlpt.us/images/protect-me/post/d0ca28e0-5607-4360-b141-47427220382e/image.png" width="700" alt="출장 요청 화면(주소 검색)">

- 관리자페이지 리스트
<img src="https://media.vlpt.us/images/protect-me/post/b414cc35-bd8a-4f32-b0ec-a85af9f7d51f/image.png" width="700" alt="관리자페이지 리스트">

- 관리자 페이지(신규 상호 등록)
<img src="https://media.vlpt.us/images/protect-me/post/443b6ac7-addb-44fc-b9c2-e2b877a8119b/image.png" width="700" alt="관리자 페이지(신규 상호 등록)">

- 관리자 페이지(기존 상호 수정)
<img src="https://media.vlpt.us/images/protect-me/post/b1cf45c0-9a5f-47e8-94f9-86a6132ee71b/image.png" width="700" alt="관리자 페이지(기존 상호 수정)">




## 개발 환경 설정 방법(Set Project Environment)
참고: https://velog.io/@protect-me/kim-3-meals

### .env
- .env.sample file 참고하여 `root > .env` 파일 생성 
- 혹은 netlify > console > project > Site settings > Build & Deploy > Environment > Edit variables 추가

> KaKao developers
1. 카카오 개발자사이트 (https://developers.kakao.com) 접속
2. 개발자 등록 및 앱 생성
3. 웹 플랫폼 추가: 앱 선택 – [플랫폼] – [Web 플랫폼 등록] – 사이트 도메인 등록
4. 사이트 도메인 등록: [웹] 플랫폼을 선택하고, [사이트 도메인] 을 등록합니다. (예: http://localhost:8080)

#### Kakao Address : REST API Key
(kakao develeopers > App Key > REST API Key)
`VUE_APP_KAKAO_ADDRESS_REST_API_KEY=''`

#### Kakao Map : JavaScript Key
(kakao develeopers > App Key > JavaScript Key)
`VUE_APP_KAKAO_MAP_JAVASCRIPT_KEY=''`

#### Firebase : firebaseConfig.js
1. Firebase 콘솔 > 프로젝트 개요 옆 설정 아이콘 > 프로젝트 설정 > 일반 > 내 앱 > 앱 추가)
2. SDK 설정 및 구성 > 구성앱의 키 및 식별자가 포함된 Firebase 구성 객체
```
VUE_APP_apiKey=''
VUE_APP_authDomain=''
VUE_APP_projectId=''
VUE_APP_storageBucket=''
VUE_APP_messagingSenderId=''
VUE_APP_appId=''
VUE_APP_measurementId=''
```

### Firebase : key.json
- (선행) Firebase Blaze 요금제 구매

> key.json 생성
1. Firebase 콘솔 > 프로젝트 개요 옆 설정 아이콘 > 프로젝트 설정 > 서비스 계정 > Firebase Admin SDK > Node.js > 새 비공개 키 생성
2. 내려받은 json 파일을 key.json 파일로 이름변경
3. root > functions 폴더 내에 key.json 파일 대체

- functions 수정 후 deploay
`$ firebase deploy --only functions`

### Vue Customize configuration
- See [Configuration Reference](https://cli.vuejs.org/config/).

### Firebase Environment configuration
https://firebase.google.com/docs/functions/config-env
#### set
`$ firebase functions:config:set admin.email="" admin.db_url=""`
#### get
`firebase functions:config:get`
#### use example
`functions.config().admin.db_url`


## 프로젝트 설치 방법(Project setup)
```
npm install --save
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


## CONTACT
email : pmfwiww@gmail.com
blog(velog) : https://velog.io/@protect-me

## MIT LICENSE
LICENSE.txt

## Special Thanks to 🙏🏻
- 김사원세끼
- HEROPY
- memi dev

