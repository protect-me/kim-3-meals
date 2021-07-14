<template>
  <div class="store-card-item">
    <div
      class="thumbnail"
      :style="{ backgroundImage: `url(${store.thumbnail})`, 
                backgroundPosition: `center`}">
    </div>

    <div class="info">
      <div class="left-side">
        <div class="first-line">
          <div class="title">
            {{ store.name }}
          </div>
          <div class="subtitle">
            {{ store.addressLocal }} · {{ store.category }}
          </div>          
        </div>
        <div class="address">
          {{ store.address }}
        </div>
      </div>

      <div class="right-side">
        <a
          :href="store.url"
          target="_blank">
          <i
            class="fa fa-arrow-circle-o-right fa-2x"
            aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style lang="scss" scoped>
.store-card-item {
  margin: 10px;
  
  .thumbnail {
    $width: 300px;
    width: $width;
    height: $width * 9 / 16;
    border-radius: 4px 4px 0 0;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }
  .info {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
    
    .left-side {
      margin-left: 10px;
      .first-line {
        display: flex;
        align-items: flex-end;
        .title {
          font-size: 16px;
          color: $gray-700;
          margin-right: 10px;
        }
        .subtitle {
          font-size: 12px;
          color: $gray-500;
        }
      }
      .address {
        font-size: 14px;
        color: $gray-600;
      }
    }
    .right-side {
      margin-right: 15px;
      a {
        cursor: pointer;
      }
    }
  }
}
</style>