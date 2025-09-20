<script setup>
import Stat from "./components/Stat.vue";
import Error from "./components/Error.vue";
import CitySelect from "./components/CitySelect.vue";
import WeatherDayCard from "./components/WeatherDayCard.vue";
import LocationIcon from "./components/icons/LocationIcon.vue";
import { ref, computed } from "vue";
import SunIcon from "./components/icons/SunIcon.vue";

const API_ENDPOINT = "http://api.weatherapi.com/v1";

const errorMap = new Map([[1006, "Указаный город не найден"]]);

const data = ref();
const error = ref();
const activeIndex = ref(0);

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
    <div class="weather__wrapper">
      <div class="left__panel">
        <div class="location">
          <div class="location__day">Вторник</div>
          <div class="location__date">20 июня 2025</div>
          <div class="location__point">
            <LocationIcon :size="27" />
            <p>Москва</p>
          </div>
        </div>

        <div class="weather">
          <SunIcon :size="95" :color="'var(--color-primary)'" />

          <div class="weather__c">29 °C</div>
          <div class="weather__descr">Солнечно</div>
        </div>
      </div>

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
            @click="() => (activeIndex = i)"
          />
        </div>

        <CitySelect @select-city="getCity" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather__wrapper {
  display: flex;
  align-items: center;
}

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

.left__panel {
  width: 493px;
  height: 666px;
  background: linear-gradient(
      rgba(100, 180, 255, 0.7),
      rgba(100, 180, 255, 0.7)
    ),
    url("./assets/left_panel_bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.location {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location__day {
  font-size: 37px;
  font-weight: 700;
}

.location__date {
  font-size: 22px;
  font-weight: 500;
}

.location__point {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.weather {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.weather__c {
  font-size: 50px;
  font-weight: 700;
}

.weather__descr {
  font-size: 30px;
  font-weight: 700;
}
</style>
