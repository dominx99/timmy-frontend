<template>
  <div
    class="flex flex-row p-4 mb-2 rounded shadow-md items-center justify-start"
    :class="typeClass"
  >
    <div>
      <d-svg
        v-if="type == 'success'"
        style="width: 20px; height: 20px"
        class="mr-4 text-green-100 fill-current"
        icon="tick"
      ></d-svg>
      <d-svg
        v-else-if="type == 'danger'"
        style="width: 20px; height: 20px"
        class="mr-4 text-green-100 fill-current"
        icon="cancel"
      ></d-svg>
    </div>
    <div v-text="message"></div>
  </div>
</template>

<script>
export default {
  props: ["message", "type"],
  computed: {
    typeClass() {
      let classes = {}

      if (this.type == "success") {
        classes["bg-green-500"] = true
      }

      if (this.type == "danger") {
        classes["bg-red-500"] = true
      }

      return classes
    }
  }
}
</script>
