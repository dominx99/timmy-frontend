<template>
  <div>
    <div class="open"></div>
    <div
      class="floating-button flex justify-center items-center fixed bg-blue-500 right-0 bottom-0 mr-5 mb-5 rounded shadow-md"
      style="width: 60px; height: 60px; border-radius: 100%;"
      @click="toggle"
    >
      <d-svg
        v-bind:class="{ rotated: opened }"
        class="text-gray-100 fill-current transition-transform duration-200 easy-in-out"
        style="width: 25px; height: 25px; pointer-events: none;"
        icon="plus"
      />
    </div>
    <div
      class="fixed flex flex-col justify-end items-end mb-5"
      style="bottom: calc(60px + 1.25rem); right: 1.25rem; height: 300px;"
      v-if="opened"
    >
      <div
        class="bg-blue-500 rounded px-5 py-2 mb-3 shadow-md open-modal-button"
        style="width: fit-content;"
        @click="$bus.$emit('openCreatePlanModal')"
      >
        Plan
      </div>
      <div
        class="bg-blue-500 rounded px-5 py-2 mb-3 shadow-md open-modal-button"
        style="width: fit-content;"
      >
        Task
      </div>
      <div
        class="bg-blue-500 rounded px-5 py-2 shadow-md open-modal-button"
        style="width: fit-content;"
      >
        Time meter
      </div>
    </div>
  </div>
</template>

<script>
import DSvg from './../DSvg'
import Vue from 'vue'

export default {
  components: {
    "d-svg": DSvg
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    bindCloseAtClickAnywhere() {
      document.querySelector("body").addEventListener("click", e => {
        if (! this.opened) {
          return
        }

        if (e.target.classList.contains("floating-button")) {
          return
        }

        if (! e.target.classList.contains("open-modal-button")) {
          this.opened = false
        }
      });
    },
    toggle() {
      Vue.set(this, "opened", ! this.opened)
    }
  },
  mounted () {
    this.bindCloseAtClickAnywhere()
  }
}
</script>

<style scoped>
.rotated {
  transform: rotate(135deg);
}
</style>
