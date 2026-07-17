<template>
  <header class="navbar">

    <div class="left">

      <h1>Gestión de Productos</h1>

      <p>{{ currentDate }}</p>

    </div>

    <div class="right">

      <div class="user">

        <div class="avatar">
          A
        </div>

        <div class="info">
          <span class="name">Administrador</span>
          <small>Panel de Control</small>
        </div>

      </div>

    </div>

  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentDate = computed(() => {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
});
</script>
