<script setup>
import LocationIcon from "./icons/LocationIcon.vue";
import Button from "./Button.vue";
import { ref } from "vue";
import Input from "./Input.vue";

const emit = defineEmits({
  "select-city": (payload) => {
    return payload;
  },
});

const isActive = ref(false);

const select = () => {
  isActive.value = true;
  emit("select-city");
};

const save = () => {
  isActive.value = false;
};
</script>

<template>
  <div class="city__select">
    <Button v-if="!isActive" class="city__select-btn" @click="select()">
      <template #icon><LocationIcon /></template>
      Изменить город
    </Button>
    <div v-else class="city__select-input">
      <Input placeholder="Введите город" type="text" />
      <Button @click="save">Сохранить</Button>
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
