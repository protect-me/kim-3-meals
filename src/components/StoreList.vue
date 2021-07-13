<template>
  <div class="list">
    <table class="table table-striped">
      <caption></caption>
      <thead>
        <tr>
          <th scoped="col">
            상호명
          </th>
          <th scoped="col">
            카테고리
          </th>
          <th scoped="col">
            주소
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(store, index) in stores"
          :key="index">
          <td>{{ store.name }}</td>
          <td>{{ store.category }}</td>
          <td>{{ store.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    stores: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
;
</style>
