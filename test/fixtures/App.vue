<template>
  <div>
    <Header :name="name" />
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
div {
  color: red;
}
</style>
