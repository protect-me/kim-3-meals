<template>
  <div class="store-card">
    <StoreCardItem
      v-for="(store, index) in stores"
      :key="index"
      :store="store" />
  </div>
</template>


<script>
import StoreCardItem from '@/components/StoreCardItem'

export default {
  components: {
    StoreCardItem
  },
  props: {
    stores: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.store-card {
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* color: $gray-600; */
  /* background-color: $gray-200; */
}
</style>
