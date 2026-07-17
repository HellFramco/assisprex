<template>
  <DashboardLayout>
    <div class="dashboard">
      <div class="header">
        <h1>Productos</h1>

        <button class="btn-primary" @click="openCreate">
          + Nuevo producto
        </button>
      </div>

      <Loader v-if="store.loading" message="Cargando productos..." />

      <ProductTable
        v-else
        :products="store.products"
        @edit="openEdit"
        @delete="openDelete"
        @change-status="changeStatus"
      />

      <ProductForm
        v-if="showForm"
        :product="selectedProduct"
        @save="saveProduct"
        @close="closeForm"
      />

      <ConfirmDialog
        :visible="showDeleteDialog"
        title="Eliminar producto"
        message="¿Está seguro de eliminar este producto?"
        @confirm="deleteProduct"
        @cancel="showDeleteDialog = false"
      />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import DashboardLayout from "../layouts/DashboardLayout.vue";
import ProductTable from "../components/ProductTable.vue";
import ProductForm from "../components/ProductForm.vue";
import Loader from "../components/Loader.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";

import { useProductStore } from "../stores/product.store";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

interface ProductFormData {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

const store = useProductStore();

const showForm = ref(false);
const showDeleteDialog = ref(false);

const selectedProduct = ref<Product | null>(null);

onMounted(async () => {
  await store.fetchProducts();
});

function openCreate() {
  selectedProduct.value = null;
  showForm.value = true;
}

function openEdit(product: Product) {
  selectedProduct.value = { ...product };
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  selectedProduct.value = null;
}

async function saveProduct(product: ProductFormData) {
  if (product.id) {
    await store.updateProduct(product.id, product);
  } else {
    await store.createProduct(product);
  }

  closeForm();

  await store.fetchProducts();
}

function openDelete(product: Product) {
  selectedProduct.value = product;

  showDeleteDialog.value = true;
}

async function deleteProduct() {
  if (!selectedProduct.value) return;

  await store.deleteProduct(selectedProduct.value.id);

  showDeleteDialog.value = false;

  selectedProduct.value = null;

  await store.fetchProducts();
}

async function changeStatus(product: Product) {
  await store.changeStatus(product.id, !product.estado);

  await store.fetchProducts();
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  color: #1e293b;
}

.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn-primary:hover {
  background: #1d4ed8;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>
