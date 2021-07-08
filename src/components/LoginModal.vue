<template>
    <div>
      <b-button v-b-modal.modal-center>Vue Bootstrap Modal Example</b-button>

      <b-modal id="modal-center" centered title="Vue Bootstrap Centered Modal Example">
        <p class="my-4">Knowing yourself is the beginning of all wisdom.</p>
      </b-modal>
    </div>    
</template>

<script>
  export default {
    data() {
      return { }
    }
  }
</script>