<template>
  <!-- Vue2 Modal ref: https://kr.vuejs.org/v2/examples/modal.html -->
  <!-- Vue3 Slot:named ref: https://kr.vuejs.org/v2/guide/components-slots.html --> 
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div
            v-if="header"
            class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div
            v-if="body"
            class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div
            v-if="footer"
            class="modal-footer">
            <slot name="footer">
              <button
                class="btn btn-outline-danger modal-close-button"
                @click="$emit('close')">
                닫기
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    header: {
      type: Boolean,
      defualt: false,
    },
    body: {
      type: Boolean,
      defualt: false,
    },
    footer: {
      type: Boolean,
      defualt: false,
    },
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .modal-container {
      width: 80vw;
      min-width: 350px;
      margin: 0px auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      justify-content: center;
      .modal-header {
      }
      .modal-body {
        height: 520px;
        min-height: 520px;
        overflow: scroll;
      }
      .modal-footer {
        .modal-close-button {
          float: right;
        }
      }
    }
  }
}

/* transition="modal" */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>