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
