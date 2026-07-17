<template>
  <div class="not-found">
    <div class="card">
      <h1>404</h1>

      <h2>Página no encontrada</h2>

      <p>La página que intentas visitar no existe o fue movida.</p>

      <RouterLink to="/" class="btn"> Volver al inicio </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
