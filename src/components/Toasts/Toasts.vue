<template>
  <div
    class="fixed flex flex-col mr-5 mt-5 z-30"
    :class="positionClass"
  >
    <Toast
      v-for="toast of toasts"
      v-bind:key="toast.id"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<script>
import Toast from './Toast.vue'

export default {
  components: {
    Toast,
  },
  data() {
    return {
      position: 'top-right'
    }
  },
  computed: {
    toasts() {
      return this.$store.state.toasts.toasts
    },
    positionClass() {
      let classes = {}

      switch (this.position) {
        case 'top-right':
          classes = {
            "top-0": true,
            "right-0": true
          }
          break;
        case 'bottom-left':
          classes = {
            "bottom-0": true,
            "left-0": true
          }
          break;
        default:
          classes = {
            "top-0": true,
            "right-0": true
          }
          break;
      }

      return classes
    }
  },
}
</script>
