<template>
  <span
    class="badge"
    :class="active ? 'active' : 'inactive'"
  >
    {{ active ? "Activo" : "Inactivo" }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
}>();
</script>
