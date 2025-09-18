<template>
  <div class="error" v-if="props.error">{{ props.error }}</div>
</template>

<script setup>
const props = defineProps({
  error: String,
});
</script>

<style scoped>
.error {
  font-size: 18px;
  background-color: var(--color-bg);
  padding: 12px;
  text-align: center;
  border-radius: 0 0 12px 12px;
  margin-top: -50px;
  margin-bottom: 100px;
}
</style>
