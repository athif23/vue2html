<template>
  <div class="flex blue">
    <Header class="flex rounded-sm" :name="name" />
    Hello {{ name }}
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {Header},
  props: {
    name: String
  }
}
</script>

<style scoped>
  .blue {
    @apply bg-blue-500;
  }
</style>