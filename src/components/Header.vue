@ -0,0 +1,42 @@
<template>
  <header>
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
export default {
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

<style lang="scss">;</style>