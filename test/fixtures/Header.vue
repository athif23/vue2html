<template>
  <header>
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