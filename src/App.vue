<script setup>
import Stat from "./components/Stat.vue";
import Error from "./components/Error.vue";
import CitySelect from "./components/CitySelect.vue";
import { ref, computed } from "vue";

const API_ENDPOINT = "http://api.weatherapi.com/v1";

const errorMap = new Map([[1006, "Указаный город не найден"]]);

const data = ref();
const error = ref();

const errorDisplay = computed(() => {
  return errorMap.get(error.value?.error?.code);
});

const dataModified = computed(() => {
  if (!data.value) return [];

  return [
    {
      id: 1,
      label: "ВЛАЖНОСТЬ",
      indicator: data.value.current.humidity + " %",
    },
    { id: 2, label: "ОБЛАЧНОСТЬ", indicator: data.value.current.cloud + " %" },
    {
      id: 3,
      label: "ВЕТЕР",
      indicator: Math.round(data.value.current.wind_kph) + " км/ч",
    },
  ];
});

const getCity = async (city) => {
  try {
    const params = new URLSearchParams({
      q: city,
      lang: "ru",
      key: import.meta.env.VITE_API_KEY,
      days: 3,
    });

    const res = await fetch(
      `${API_ENDPOINT}/forecast.json?${params.toString()}`
    );

    if (!res.ok) {
      error.value = await res.json();
      data.value = null;
    }

    data.value = await res.json();
    error.value = null;
  } catch (error) {
    error.value = error.message;
  }
};
</script>

<template>
  <main class="main">
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
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <CitySelect @select-city="getCity" />
  </main>
</template>

<style scoped>
.main {
  padding: 50px;
  background-color: var(--color-bg-main);
  width: 520px;
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
}
</style>
