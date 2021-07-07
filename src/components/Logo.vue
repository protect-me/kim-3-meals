@ -0,0 +1,25 @@
<template>
  <RouterLink
    to="/"
    class="logo">
    ㄱㅅㅇㅅㄲ
  </RouterLink>
</template>


<style lang="scss" scoped>
.logo {
  font-family: 'TmonMonsori', sans-serif;
  font-size: 20px;
  text-decoration: none;
  padding: 5px;
  border-radius: 3px;
  color: $primary;  
  background-color: $white;
  &:hover {
    color: $white;
    background-color: $primary;
  }
}
</style>