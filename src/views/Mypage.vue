<template>
  <div class="container">
    <div
      v-if="!fireUser"
      class="status-block status-logout">
      <div class="avatar-wrapper">
        <div class="avatar">
          <i
            class="fa fa-user-circle-o fa-2x"
            aria-hidden="true"></i>
        </div>
      </div>
      <div class="notice">
        <p>구글 계정으로 </p>
        <p>로그인이 가능합니다:)</p>
      </div>
      <button
        class="btn btn-outline-primary login-btn"
        :disabled="isProcessing"
        @click="signInWithGoogle">
        <Loader
          v-if="isProcessing"
          :size="1.5"
          absolute />
        <span v-else>구글 로그인</span>
      </button>
    </div>

    <div
      class="status-block status-login"
      v-else>
      <div class="avatar-wrapper">
        <div class="avatar">
          <img
            :src="fireUser.photoURL"
            alt="photo" />
        </div>
      </div>
      <div class="notice">
        <div>
          <p>안녕하세요 {{ fireUser.displayName }}세끼님!</p>
          <p>맛있는 끼니 챙겨드세요:)</p>
        </div>
      </div>
      <button
        class="btn btn-outline-danger logout-btn"
        @click="signOut">
        <span>로그아웃</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import Loader from "@/components/Loader"

export default {
  components: {
    Loader
  },
  data() {
    return {
      isProcessing: false
    }
  },
  computed: {
    ...mapState(["fireUser", "user"])
  },
  methods: {
    async signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().languageCode = 'ko'
      this.isProcessing = true
      try {
        const snapshot = await this.$firebase.auth().signInWithPopup(provider)
        console.log(snapshot.user);
      } catch (err) {
        console.log(err);
      } finally {
        this.isProcessing = false
      }
    },
    signOut() {
      this.$firebase.auth().signOut()
      alert("로그아웃 되었습니다:)")
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: 'TmonMonsori', sans-serif;
  .status-block {
    margin-top: 20px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .avatar-wrapper {
      .avatar {
        width: 50px;
        height: 50px;
        line-height: 50px;
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
    .notice {
      margin: 20px 0;
      text-align: center;
    }
    button {
      width: 120px;
      height: 40px;
      position: relative;
    }
  }
}
</style>