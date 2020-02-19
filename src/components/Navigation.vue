<template>
  <nav class="mb-6">
    <div class="container ml-auto mr-auto p-5">
      <div class="text-2xl" v-text="title"></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["title"]
}
</script>
