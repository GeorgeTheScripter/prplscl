<script setup>
import Stat from "./components/Stat.vue";
import CitySelect from "./components/CitySelect.vue";
import { ref } from "vue";

const indicators = ref([
  { id: 1, label: "ВЛАЖНОСТЬ", indicator: "90%" },
  { id: 2, label: "ОСАДКИ", indicator: "90%" },
  { id: 3, label: "ВЕТЕР", indicator: "3 км/ч" },
]);

const getCity = (city) => {
  console.log(city);
};
</script>

<template>
  <main class="main">
    <div class="indicators">
      <Stat
        v-for="indicator in indicators"
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
