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

      <div class="like icon-wrapper">
        <div class="icon">
          <i
            v-if="userLike"
            class="fa fa-thumbs-up"
            aria-hidden="true"></i>
          <i
            v-else
            class="fa fa-thumbs-o-up"
            aria-hidden="true"></i>
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
export default {
  props: {
    request: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      userLike: false,
    }
  },
  methods: {
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
      margin: 5px 0;
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
      margin: 10px 0;
      height: 40px;
      .name {
        font-size: 16px;
      }
      .address {
        font-size: 12px;
      }      
    }
    .footer {
      margin: 5px 0;
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
    padding-left: 20px;
    .icon-wrapper {
      cursor: pointer;
      width: 40px;
      height: 40px;
      text-align: center;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        padding-top: 4px;
      }
    }
    .icon-wrapper:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }
  }
}
</style>