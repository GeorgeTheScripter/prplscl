<script setup>
import LocationIcon from "./icons/LocationIcon.vue";
import SunIcon from "./icons/SunIcon.vue";
import CloudIcon from "./icons/CloudIcon.vue";
import RainIcon from "./icons/RainIcon.vue";
import { computed } from "vue";

const props = defineProps({
  dayData: Object,
  city: String,
});

const day = computed(() => {
  return new Date(props.dayData?.date).toLocaleDateString("ru-RU", {
    weekday: "long",
  });
});

const date = computed(() => {
  return new Date(props.dayData?.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
</script>

<template>
  <div class="left__panel">
    <div class="location">
      <div class="location__day">{{ day }}</div>
      <div class="location__date">{{ date }}</div>
      <div class="location__point">
        <LocationIcon :size="27" />
        <p>{{ city }}</p>
      </div>
    </div>

    <div class="weather">
      <CloudIcon
        :size="90"
        :color="'var(--color-primary)'"
        v-if="
          props.dayData?.day.condition.code >= 1006 &&
          props.dayData?.day.condition.code < 1063
        "
      />
      <SunIcon
        :size="90"
        :color="'var(--color-primary)'"
        v-if="props.dayData?.day.condition.code <= 1003"
      />
      <RainIcon
        :size="90"
        :color="'var(--color-primary)'"
        v-if="props.dayData?.day.condition.code >= 1063"
      />

      <div class="weather__c">
        {{ Math.ceil(props.dayData?.day.avgtemp_c) }} °C
      </div>
      <div class="weather__descr">{{ props.dayData?.day.condition.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.left__panel {
  width: 493px;
  height: 666px;
  background: linear-gradient(
      rgba(100, 180, 255, 0.7),
      rgba(100, 180, 255, 0.7)
    ),
    url("../assets/left_panel_bg.png");
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
  text-transform: capitalize;
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
