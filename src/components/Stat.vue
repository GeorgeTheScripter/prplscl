<script setup>
const { label = "Не задан", indicator = "0" } = defineProps({
  label: String,
  indicator: String,
});
</script>

<template>
  <div class="indicator">
    <p class="indicator-title">{{ label }}</p>
    <p class="indicator-value">{{ indicator }}</p>
  </div>
</template>

<style scoped>
.indicator {
  display: flex;
  font-size: 28px;
  justify-content: space-between;
}

.indicator-title {
  font-weight: 700;
}

.indicator-value {
  font-weight: 500;
}
</style>
