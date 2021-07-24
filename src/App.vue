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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #fff;
}
.container {
  padding-top: 90px;
}

@include media-breakpoint-down(md) {
  header {
    margin-bottom: 10px;
  }
  .container {
    padding-top: 100px;
  }
}
</style>
