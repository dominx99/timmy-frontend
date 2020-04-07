<template>
  <button
    style="border-radius: 100%; height: fit-content;"
    class="p-2 cursor-pointer focus:outline-none border-none hover:shadow"
  >
    <DSvg
      class="text-gray-100 fill-current pointer-events-none"
      style="width: 20px; height: 20px;"
      :icon="icon"
    />
  </button>
</template>

<script>
import DSvg from './../DSvg'

export default {
  props: ['icon'],
  components: {
    DSvg
  }
}
</script>
