<template>
  <header class="test">
    This is header, {{ name }}
  </header>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>

<style scoped>
.test {
  color: red;
}
</style>
