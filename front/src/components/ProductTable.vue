<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th @click="sort('id')">ID {{ icon("id") }}</th>

          <th @click="sort('nombre')">Nombre {{ icon("nombre") }}</th>

          <th @click="sort('descripcion')">
            Descripción {{ icon("descripcion") }}
          </th>

          <th @click="sort('precio')">Precio {{ icon("precio") }}</th>

          <th @click="sort('stock')">Stock {{ icon("stock") }}</th>

          <th @click="sort('estado')">Estado {{ icon("estado") }}</th>

          <th class="actions-column">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="pagedProducts.length === 0">
          <td colspan="7" class="empty">No existen productos registrados.</td>
        </tr>

        <tr v-for="product in pagedProducts" :key="product.id">
          <td>{{ product.id }}</td>

          <td>{{ product.nombre }}</td>

          <td>{{ product.descripcion }}</td>

          <td>${{ product.precio.toLocaleString() }}</td>

          <td>{{ product.stock }}</td>

          <td>
            <span class="badge" :class="product.estado ? 'active' : 'inactive'">
              {{ product.estado ? "Activo" : "Inactivo" }}
            </span>
          </td>

          <td class="actions">
            <button class="btn edit" @click="$emit('edit', product)">
              Editar
            </button>

            <button class="btn status" @click="$emit('changeStatus', product)">
              {{ product.estado ? "Desactivar" : "Activar" }}
            </button>

            <button class="btn delete" @click="$emit('delete', product)">
              Eliminar
            </button>

            <button class="btn history" @click="$emit('history', product)">
              Historial
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <div>
        Mostrar

        <select v-model="rows">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>

        registros
      </div>

      <div class="pages">
        <button :disabled="page === 1" @click="page--">◀</button>

        <span> Página {{ page }} de {{ totalPages }} </span>

        <button :disabled="page === totalPages" @click="page++">▶</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Product } from "../types/product";

const props = defineProps<{
  products: Product[];
}>();

defineEmits(["edit", "delete", "changeStatus", "history"]);

const page = ref(1);

const rows = ref(10);

const orderBy = ref<keyof Product>("id");

const asc = ref(true);

function sort(field: keyof Product) {
  if (orderBy.value === field) {
    asc.value = !asc.value;
  } else {
    orderBy.value = field;

    asc.value = true;
  }
}

function icon(field: keyof Product) {
  if (orderBy.value !== field) return "";

  return asc.value ? "▲" : "▼";
}

const orderedProducts = computed(() => {
  return [...props.products].sort((a, b) => {
    const x = a[orderBy.value];

    const y = b[orderBy.value];

    if (x < y) return asc.value ? -1 : 1;

    if (x > y) return asc.value ? 1 : -1;

    return 0;
  });
});

const totalPages = computed(() => {
  return Math.ceil(orderedProducts.value.length / rows.value) || 1;
});

const pagedProducts = computed(() => {
  const start = (page.value - 1) * rows.value;

  return orderedProducts.value.slice(start, start + rows.value);
});

watch(rows, () => (page.value = 1));

watch(totalPages, () => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
  }
});
</script>
