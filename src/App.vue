<script setup>
import LocationIcon from "./components/icons/LocationIcon.vue";
import SunIcon from "./components/icons/SunIcon.vue";
import { fetchCities } from "./service/fetchCities";
import RightPanel from "./components/RightPanel.vue";
import { ref, provide, watch, onMounted } from "vue";
import { cityProvide } from "./constants";
import LeftPanel from "./components/LeftPanel.vue";

const { data, error, getCity } = fetchCities();
const activeIndex = ref(0);
const city = ref("london");

provide(cityProvide, city);

watch(city, () => {
  getCity(city.value);
});

onMounted(() => {
  getCity(city.value);
});
</script>

<template>
  <main class="main">
    <div class="weather__wrapper">
      <LeftPanel
        :day-data="data?.forecast.forecastday[activeIndex]"
        :city="city"
      />

      <RightPanel
        :data="data"
        :error="error"
        :active-index="activeIndex"
        @select-index="(i) => (activeIndex = i)"
      />
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
</style>
