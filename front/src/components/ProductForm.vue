<template>
  <div class="centerModal">
    <div class="modal">
      <div class="modal-header">
        <h2>
          {{ isEdit ? "Editar Producto" : "Nuevo Producto" }}
        </h2>

        <button class="btn-danger" @click="close">✕</button>
      </div>

      <form @submit.prevent="save">
        <div class="group">
          <label>Nombre</label>

          <input v-model="form.nombre" type="text" required />
        </div>

        <div class="group">
          <label>Descripción</label>

          <textarea v-model="form.descripcion" rows="3" />
        </div>

        <div class="row">
          <div class="group">
            <label>Precio</label>

            <input
              v-model.number="form.precio"
              type="number"
              min="0"
              required
            />
          </div>

          <div class="group">
            <label>Stock</label>

            <input v-model.number="form.stock" type="number" min="0" required />
          </div>
        </div>

        <div class="group checkbox">
          <input id="estado" v-model="form.estado" type="checkbox" />

          <label for="estado"> Producto activo </label>
        </div>

        <div class="actions">
          <button type="button" class="btn cancel" @click="close">
            Cancelar
          </button>

          <button class="btn save" type="submit">
            {{ isEdit ? "Actualizar" : "Guardar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import type { Product } from "../types/product";

interface ProductForm {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

const props = defineProps<{
  product?: Product | null;
}>();

const emit = defineEmits<{
  (e: "save", product: ProductForm): void;
  (e: "close"): void;
}>();

const form = reactive<ProductForm>({
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  estado: true,
});

const isEdit = computed(() => !!props.product);

watch(
  () => props.product,
  (value) => {
    if (value) {
      form.nombre = value.nombre;
      form.descripcion = value.descripcion;
      form.precio = value.precio;
      form.stock = value.stock;
      form.estado = value.estado;
    } else {
      reset();
    }
  },
  {
    immediate: true,
  },
);

function reset() {
  form.nombre = "";
  form.descripcion = "";
  form.precio = 0;
  form.stock = 0;
  form.estado = true;
}

function save() {
  emit("save", { ...form });

  reset();
}

function close() {
  reset();

  emit("close");
}
</script>
