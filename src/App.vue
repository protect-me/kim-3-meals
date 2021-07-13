<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from "@/components/Header"

export default {
  components: {
    Header
  },
  mounted() {
    console.log(this.$firebase)
  }
}
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 20px;
}
@include media-breakpoint-down(md) {
  header {
    margin-bottom: 10px;
  }
}
</style>
