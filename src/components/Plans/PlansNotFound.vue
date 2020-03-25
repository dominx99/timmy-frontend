<template>
  <div class="flex justify-center items-center h-full" style="height: calc(100vh - 100px)">
    <DSvg class="gray-700 fill-current" style="width: 250px" icon="loupe-fail" />
  </div>
</template>

<script>
import DSvg from './../DSvg.vue'

export default {
  components: {
    DSvg
  }
}
</script>
