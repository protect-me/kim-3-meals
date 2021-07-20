@ -0,0 +1,42 @@
<template>
  <header>
    <Logo />
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
      <div class="nav-item">
        <RouterLink
          class="nav-link nav-link-account"
          to="/mypage">
          <div
            v-if="!fireUser"
            class="avatar-wrapper">
            <div class="avatar">
              <i
                class="fa fa-user-circle-o fa-1x"
                aria-hidden="true"></i>
            </div>
          </div>
          <div
            v-else
            class="avatar-wrapper">
            <div class="avatar">
              <img
                :src="fireUser.photoURL"
                alt="photo" />
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex"
import Logo from "@/components/Logo"

export default {
  components: {
    Logo,
  },
  computed: {
    ...mapState(["fireUser", "user"])
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
  font-family: 'TmonMonsori', sans-serif;
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
  .nav {
    .nav-item {
      .nav-link-account {
        margin-left: 40px;
        padding-top: 6px;
        .avatar-wrapper {
          .avatar {
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            i {
              vertical-align: middle;
              color: $gray-600;
            }
            img {
              margin: 0 auto;
              border-radius: 50%;
              width: 100%;
              height: 100%;
            }
          }
        }    
      }
    }
  }
}
@include media-breakpoint-down(md) {
  header {
    padding: 0;
    flex-direction: column;
    height: auto;
    .logo {
      margin: 5px 0;
    }
    .nav {
      .nav-item {
        .nav-link-account {
          margin-left: 0px;
        }
      }
    }
  }
}
</style>
