<template>
  <Header></Header>
  <RouterView></RouterView>
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
