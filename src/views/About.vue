@@ -0,0 +1,40 @@
<template>
  <div class="container">
    <h1>
      세 끼먹는 김사원
      <br />
      <div>김사원세끼</div>
    </h1>
    <p>서울 맛집, 맛없는 건 안 올립니다.</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.container {
  font-family: 'TmonMonsori';
  h1 {
    font-size: 40px;
    line-height: 1;
    div {
      margin-top: 10px;
      font-size: 70px;
      color: $primary;
    }
  }
  p {
    font-size: 30px;
    color: $gray-600;
  }
}
</style>