<script setup>
import LocationIcon from "./icons/LocationIcon.vue";
import Button from "./Button.vue";
import { inject, ref } from "vue";
import Input from "./Input.vue";
import { cityProvide } from "../constants";

const city = inject(cityProvide);
const inputValue = ref(city.value);
const isActive = ref(false);

const select = () => {
  isActive.value = false;
  city.value = inputValue.value;
};

const edit = () => {
  isActive.value = true;
};
</script>

<template>
  <div class="city__select">
    <Button v-if="!isActive" class="city__select-btn" @click="edit()">
      <template #icon><LocationIcon :size="33" /></template>
      Изменить город
    </Button>

    <div v-else class="city__select-input">
      <Input
        v-model="inputValue"
        placeholder="Введите город"
        v-focus
        @keyup.enter="select()"
      />
      <Button @click="select()">Сохранить</Button>
    </div>
  </div>
</template>

<style scoped>
.city__select-input {
  display: flex;
  gap: 12px;
}

.city__select-btn {
  width: 100%;
}
</style>
