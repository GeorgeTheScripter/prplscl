<script setup></script>

<template>
  <button class="button">
    <div>
      <slot name="icon" />
    </div>
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 53px;
  border-radius: 10px;
  padding: 14px;
  background: var(--gradient);
  border: none;
  color: var(--color-primary);
  font-family: var(--font);
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--gradient-inverted);
  }
}
</style>
