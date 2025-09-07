<script setup>
const date = new Date()
  .toLocaleDateString("ru-RU")
  .replace(/\//g, ".")
  .slice(0, 5);
</script>

<template>
  <div>{{ date }}</div>
</template>

<style scoped></style>
