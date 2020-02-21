<template>
  <label
    class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
    :for="id"
    v-text="value"
  >
  </label>
</template>

<script>
export default {
  props: [
    'id',
    'value'
  ],
}
</script>
