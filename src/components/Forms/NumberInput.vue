<template>
  <input
    class="
      block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
      focus:outline-none focus:bg-white focus:border-gray-500
    "
    type="number"
    v-model.number="inputVal"
    :step="step ? step : 1"
    :min="min ? min : 0"
    :max="max"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: [
    "value",
    "step",
    "placeholder",
    "min",
    "max"
  ],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>
