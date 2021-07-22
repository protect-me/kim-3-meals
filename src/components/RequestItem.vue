<template>
  <div class="request-item">
    <div class="left-area">
      <div class="header">
        <div class="category">
          {{ request.category }}
        </div>
      </div>
      <div class="body">
        <div class="name">
          {{ request.name }}
        </div>
        <div class="address">
          {{ request.address }}
        </div>
      </div>
      <div class="footer">
        <div class="comment">
          by. {{ request.userName }} {{ request.comment }} 
        </div>
      </div>
    </div>

    <div class="right-area">
      <div class="more icon-wrapper">
        <div class="icon">
          <i
            class="fa fa-ellipsis-v"
            aria-hidden="true"></i>
        </div>
      </div>

      <div
        class="like icon-wrapper"
        @click="likeBtnClicked">
        <div class="icon">
          <i
            v-if="liked"
            class="fa fa-thumbs-up"
            aria-hidden="true"></i>
          <i
            v-else
            class="fa fa-thumbs-o-up"
            aria-hidden="true"></i>
        </div>
        <div class="count">
          {{ request.likeCount }}
        </div>
      </div>
    </div>
  </div>

  <!-- <i
      v-if="userDislike"
      class="fa fa-thumbs-down"
      aria-hidden="true"></i>
    <i
      v-else
      class="fa fa-thumbs-o-down"
      aria-hidden="true"></i> -->
</template>

<script>
import { mapState } from "vuex"

export default {
  props: {
    request: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState(["fireUser", "user"]),
    liked() {
      if (!this.fireUser) { return false }
      return this.request.likeUserList.includes(this.fireUser.uid)
    },
  },
  data() {
    return {
    }
  },
  methods: {
    async likeBtnClicked() {
      const refRequest = this.$firebase.firestore().collection("requests").doc(this.request.id)
      const refUser = this.$firebase.firestore().collection("users").doc(this.fireUser.uid)
      try {
        // await ref.update({likeCount : this.$firebase.firestore.FieldValue.increment(1)})
        const batch = await this.$firebase.firestore().batch()
        if (this.liked) {
          // like 해제 로직
          batch.update(refRequest, {likeCount : this.$firebase.firestore.FieldValue.increment(-1)})
          batch.update(refRequest, {likeUserList : this.$firebase.firestore.FieldValue.arrayRemove(this.fireUser.uid)})
          batch.update(refUser, {likeRequestList : this.$firebase.firestore.FieldValue.arrayRemove(this.request.id)})          
        } else {
          // like 로직
          batch.update(refRequest, {likeCount : this.$firebase.firestore.FieldValue.increment(1)})
          batch.update(refRequest, {likeUserList : this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid)})
          batch.update(refUser, {likeRequestList : this.$firebase.firestore.FieldValue.arrayUnion(this.request.id)})          
        }
        await batch.commit()
      } catch(err) {
        alert("'좋아요'를 하는 도중 에러가 발생했습니다.", err)
        console.log(err);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.request-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}
.request-item {
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  width: 300px;
  border-radius: 4px;
  display: flex;  
  color: white;
  background-color: rgba($black, .3);
  backdrop-filter: blur(10px);
  .left-area {
    width: 240px;
    .header {
      display: flex;
      margin: 4px 0;
      height: 20px;
      .category {
        font-size: 10px;
        color: $gray-600;
        background-color: #fff;
        border-radius: 10px;
        padding: 4px 5px;
      }
    }
    .body {
      margin: 8px 0;
      height: 40px;
      .name {
        font-size: 16px;
      }
      .address {
        font-size: 12px;
      }      
    }
    .footer {
      margin: 4px 0;
      height: 50px;
      display: flex;
      align-content: flex-end;
      .comment {
        font-size: 12px;
      }
    }
  }
  .right-area {
    width: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 10px 10px 20px 20px;
    .icon-wrapper {
      cursor: pointer;
      width: 30px;
      height: 30px;
      text-align: center;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .icon {
        padding-top: 4px;
      }
      .count {
        font-size: 10px;
        position: absolute;
        bottom: -10px;
      }
    }
    .icon-wrapper:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }
  }
}
</style>