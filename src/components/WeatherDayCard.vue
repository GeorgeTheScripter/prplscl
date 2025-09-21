<script setup>
import { computed } from "vue";
import CloudIcon from "./icons/CloudIcon.vue";
import SunIcon from "./icons/SunIcon.vue";
import RainIcon from "./icons/RainIcon.vue";

const props = defineProps({
  weatherCode: Number,
  temp: Number,
  date: Date,
  isActive: Boolean,
});

const activeColors = computed(() => {
  return props.isActive
    ? "var(--color-primary-inverted)"
    : "var(--color-primary)";
});
</script>

<template>
  <button class="card" :class="{ active: isActive }">
    <CloudIcon
      :size="55"
      :color="activeColors"
      v-if="props.weatherCode >= 1006 && props.weatherCode < 1063"
    />
    <SunIcon
      :size="55"
      :color="activeColors"
      v-if="props.weatherCode <= 1003"
    />
    <RainIcon
      :size="55"
      :color="activeColors"
      v-if="props.weatherCode >= 1063"
    />

    <div class="card_info">
      <div>
        {{ props.date.toLocaleDateString("ru-RU", { weekday: "short" }) }}
      </div>
      <div>{{ Math.ceil(props.temp) }} °C</div>
    </div>
  </button>
</template>

<style scoped>
.card {
  padding: 24px;
  background-color: var(--color-bg-card);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  text-align: center;
  gap: 6px;
  cursor: pointer;
  color: var(--color-primary);
  border: none;
}

.card:hover {
  background-color: var(--color-bg-card-hover);
}

.card.active {
  background-color: var(--color-primary);
  color: var(--color-primary-inverted);
}

.card_info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 18px;
}
</style>
