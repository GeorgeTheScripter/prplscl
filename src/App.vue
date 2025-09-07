<script setup>
import Button from "./components/Button.vue";

const date = new Date()
  .toLocaleDateString("ru-RU")
  .replace(/\//g, ".")
  .slice(0, 5);
</script>

<template>
  <main class="main">
    <div class="indicators">
      <div class="indicator">
        <p class="indicator-title">ВЛАЖНОСТЬ</p>
        <p class="indicator-value">90%</p>
      </div>
      <div class="indicator">
        <p class="indicator-title">ОСАДКИ</p>
        <p class="indicator-value">0%</p>
      </div>
      <div class="indicator">
        <p class="indicator-title">ВЕТЕР</p>
        <p class="indicator-value">3 м/ч</p>
      </div>
    </div>

    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div>
      <Button>Изменить город</Button>
    </div>
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

.indicator {
  display: flex;
  justify-content: space-between;
}

.indicator-title {
  font-weight: 700;
}

.indicator-value {
  font-weight: 500;
}
</style>
