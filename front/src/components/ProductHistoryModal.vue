<template>
  <div v-if="visible" class="overlay centerModal">
    <div class="modal">
      <div class="modal-header">
        <h2>Historial del producto</h2>

        <button @click="$emit('close')">✕</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Acción</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in history" :key="item.id">
            <td>{{ item.action }}</td>
            <td>{{ item.description }}</td>
            <td>
              {{ new Date(item.created_at).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductHistory } from "../types/product";

defineProps<{
  visible: boolean;
  history: ProductHistory[];
}>();

defineEmits(["close"]);
</script>
