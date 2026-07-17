<template>
  <div v-if="visible" class="centerModal">
    <div class="dialog modal">
      <div class="icon">⚠️</div>

      <h2>{{ title }}</h2>

      <p>{{ message }}</p>

      <div class="actions">
        <button class="btn" @click="$emit('cancel')">Cancelar</button>

        <button class="btn" @click="$emit('confirm')">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    visible: boolean;
    title?: string;
    message?: string;
  }>(),
  {
    title: "Confirmar acción",
    message: "¿Está seguro de continuar?",
  },
);

defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>
