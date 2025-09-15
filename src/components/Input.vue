<template>
  <input class="input" type="text" v-model="data" />
</template>

<script setup>
const data = defineModel({ type: String, required: true });
</script>

<style scoped>
.input {
  background-color: var(--color-bg);
  border: none;
  border-radius: 10px;
  height: 53px;
  padding: 0 20px;
  font-size: 18px;
  color: var(--color-primary);
  outline: none;
  width: 100%;
}
</style>
