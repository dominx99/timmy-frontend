<template>
  <div class="card">
    <div class="ml-8 mr-3 flex items-center justify-center">
      <button
        class="flex justify-center items-center shadow-md"
        style="width: 50px; height: 50px; border-radius: 100%;">
        <d-svg style="width: 30%" icon="play" class="fill-current text-white"/>
      </button>
    </div>
    <div class="w-full p-5">
      <div v-text="plan.timeMeter.name"></div>
      <div class="text-sm text-gray-200">00:00:00</div>
    </div>
  </div>
</template>

<script>
import DSvg from './../DSvg'

export default {
  props: ["plan"],
  components: {
    "d-svg": DSvg,
  }
}
</script>

<style lang="scss">
.card {
  @apply flex flex-row bg-blue-600 mb-5 rounded shadow-xl mx-5;

  @screen md {
    @apply mb-10;
    width: calc(theme("width.1/2") - theme("margin.10"));
  }

  @screen xl {
    width: calc(theme("width.1/3") - theme("margin.10"));
  }
}
</style>
