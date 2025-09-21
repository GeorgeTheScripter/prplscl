<script setup>
import CitySelect from "./CitySelect.vue";
import WeatherDayCard from "./WeatherDayCard.vue";
import Stat from "./Stat.vue";
import Error from "./Error.vue";
import { computed, ref } from "vue";
import { errorMap } from "../constants";

const { data, error, activeIndex } = defineProps({
  data: Object,
  error: Object,
  activeIndex: Number,
});

const emit = defineEmits(["select-index"]);

const errorDisplay = computed(() => {
  return error ? errorMap.get(error.error?.code) : null;
});

const dataModified = computed(() => {
  if (!data) return [];

  const dayData = data.forecast.forecastday[activeIndex].day;

  return [
    {
      id: 1,
      label: "ВЛАЖНОСТЬ",
      indicator: dayData.avghumidity + " %",
    },
    {
      id: 2,
      label: "ДОЖДЬ",
      indicator: dayData.daily_chance_of_rain + " %",
    },
    {
      id: 3,
      label: "ВЕТЕР",
      indicator: Math.round(dayData.maxwind_kph) + " км/ч",
    },
  ];
});

const handleSelectActiveIndex = (i) => {
  emit("select-index", i);
};
</script>

<template>
  <div class="right__panel">
    <Error :error="errorDisplay" />
    <div class="indicators">
      <Stat
        v-for="indicator in dataModified"
        :key="indicator.id"
        :label="indicator.label"
        :indicator="indicator.indicator"
      />
    </div>

    <div class="days">
      <WeatherDayCard
        v-for="(item, i) in data?.forecast.forecastday"
        :key="item.id"
        :temp="item.day.avgtemp_c"
        :date="new Date(item.date)"
        :weatherCode="item.day.condition.code"
        :is-active="activeIndex === i"
        @click="handleSelectActiveIndex(i)"
      />
    </div>

    <CitySelect />
  </div>
</template>

<style scoped>
.right__panel {
  padding: 50px;
  background-color: var(--color-bg-main);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 520px;
  height: 623px;
  border-radius: 0 25px 25px 0;
}

.indicators {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.select {
  display: flex;
  gap: 16px;
  width: 100%;
}

.days {
  display: flex;
  gap: 8px;
}
</style>
