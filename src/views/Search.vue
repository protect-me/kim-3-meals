<template>
  <div class="container">
    <div class="title">
      firestore test
    </div>
    <div class="list">
      {{ stores }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  mounted(){
    this.$store.dispatch("searchStores")
  },
  computed: {
    ...mapState(["stores"])
  }
}
</script>

<style lang="scss" scoped>
;
</style>