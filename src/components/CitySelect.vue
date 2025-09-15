<script setup>
import LocationIcon from "./icons/LocationIcon.vue";
import Button from "./Button.vue";
import { onMounted, ref } from "vue";
import Input from "./Input.vue";

const emit = defineEmits({
  "select-city": (payload) => {
    return payload;
  },
});

const isActive = ref(false);

const city = ref("london");

onMounted(() => {
  emit("select-city", city.value);
});

const select = () => {
  isActive.value = false;
  emit("select-city", city.value);
};

const edit = () => {
  isActive.value = true;
};
</script>

<template>
  <div class="city__select">
    <Button v-if="!isActive" class="city__select-btn" @click="edit()">
      <template #icon><LocationIcon /></template>
      Изменить город
    </Button>
    <div v-else class="city__select-input">
      <Input v-model="city" placeholder="Введите город" />
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

.city__select {
  margin-top: 70px;
}
</style>
