@ -0,0 +1,42 @@
<template>
  <header>
    <Logo></Logo>
    <div class="nav nav-pills">
      <div
        class="nav-item" 
        v-for="nav in navigations"
        :key="nav.name">
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="nav.href">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "@/components/Logo"

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: "지도",
          href: "/",
        },
        {
          name: "검색",
          href: "/search",
        },
        {
          name: "정보",
          href: "/info",
        },
        {
          name: "소개",
          href: "/about",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
}
.nav {
  font-family: 'TmonMonsori', sans-serif;
}
</style>
