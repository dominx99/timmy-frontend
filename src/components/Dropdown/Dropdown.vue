<template>
  <div>
    <div class="relative">
      <IconButton
        v-if="icon"
        :icon="icon"
        class="dropdown-button"
        @click.native="toggle()"
      />
      <div
        v-show="opened"
        style="width: fit-content; top: calc(20px + 1rem); right: 0;"
        class="bg-blue-500 text-gray-100 rounded shadow-md absolute z-50"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from './../Buttons/IconButton'

export default {
  props: ["icon"],
  components: {
    IconButton
  },
  data() {
    return {
      opened: false
    }
  },
  mounted() {
    document.querySelector("body").addEventListener('click', e => {
      if (e.target.classList.contains("dropdown-button")) {
        return
      }

      this.opened = false
    })
  },
  methods: {
    toggle() {
      this.opened = ! this.opened
    }
  }
}
</script>
