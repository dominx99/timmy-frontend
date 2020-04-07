<template>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-container modal-fullscreen">
        <div class="modal-top">
          <div class="modal-header">Create Time Meter</div>
          <d-svg @click.native="closeModal()" class="close-icon" icon="cancel"/>
        </div>
        <div class="modal-body w-full mt-12">
          <div class="mb-5">
            <Label id="name" value="Name" />
            <TextInput
              id="name"
              v-model="form.name"
              placeholder="School"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="save"
            class="btn bg-blue-500 rounded ml-auto"
            type="button"
          >Save</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DSvg from './../DSvg'
import TextInput from './../Forms/TextInput'
import Label from './../Forms/Label'

export default {
  components: {
    DSvg,
    TextInput,
    Label
  },
  data () {
    return {
      showModal: false,
      form: {
        name: "",
      },
      periods: [],
    }
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    clearModal() {
      this.form = {
        name: "",
      }
    },
    save() {
      this.$store.dispatch("timeMeters/add", this.form)

      this.closeModal()
      this.clearModal()
    },
  },
  created () {
    this.$bus.$on('openCreateTimeMeterModal', this.openModal)
  },
  beforeDestroy () {
    this.$bus.$off('openCreateTimeMeterModal', this.openModal)
  }
}
</script>
