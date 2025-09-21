<script setup>
import LocationIcon from "./components/icons/LocationIcon.vue";
import SunIcon from "./components/icons/SunIcon.vue";
import { fetchCities } from "./service/fetchCities";
import RightPanel from "./components/RightPanel.vue";
import { ref, provide, watch, onMounted } from "vue";
import { cityProvide } from "./constants";

const { data, error, getCity } = fetchCities();
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

      <RightPanel :data="data" :error="error" />
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
