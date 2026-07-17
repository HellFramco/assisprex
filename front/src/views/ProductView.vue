<template>
  <div class="products-view">
    <div class="d-flex">
      <div class="w70">
        <button class="btn btn-primary" @click="openCreate">
          + Nuevo producto
        </button>

        <LoadingSpinner v-if="store.loading" />

        <ProductTable
          v-else
          :products="store.products"
          @edit="openEdit"
          @delete="openDelete"
          @change-status="changeStatus"
          @history="openHistory"
        />
      </div>
      <div class="w30">
        <Transition name="modal" appear>
          <ProductForm
            v-if="showForm"
            :product="selectedProduct"
            @save="saveProduct"
            @close="closeForm"
          />
        </Transition>
        <Transition name="modal" appear>
          <ProductHistoryModal
            :visible="showHistory"
            :history="store.history"
            @close="showHistory = false"
          />
        </Transition>
        <Transition name="modal" appear>
          <ConfirmDialog
            :visible="showDeleteDialog"
            title="Eliminar producto"
            message="¿Está seguro de eliminar este producto?"
            @confirm="deleteProduct"
            @cancel="showDeleteDialog = false"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import ProductHistoryModal from "../components/ProductHistoryModal.vue";
import ProductTable from "../components/ProductTable.vue";
import ProductForm from "../components/ProductForm.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";

import { useProductStore } from "../stores/product.store";

import type { Product, ProductPayload } from "../types/product";

const store = useProductStore();

const showForm = ref(false);

const showDeleteDialog = ref(false);

const selectedProduct = ref<Product | null>(null);

const showHistory = ref(false);

onMounted(async () => {
  await store.fetchProducts();
});

function closeAllModals() {
  showForm.value = false;
  showDeleteDialog.value = false;
  showHistory.value = false;
  selectedProduct.value = null;
}

function openCreate() {
  closeAllModals();
  selectedProduct.value = null;
  showForm.value = true;
}

function openEdit(product: Product) {
  closeAllModals();
  selectedProduct.value = { ...product };
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  selectedProduct.value = null;
}

async function saveProduct(data: ProductPayload) {
  if (selectedProduct.value) {
    await store.updateProduct(selectedProduct.value.id, data);
  } else {
    await store.createProduct(data);
  }

  closeForm();

  await store.fetchProducts();
}

function openDelete(product: Product) {
  closeAllModals();
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

async function openHistory(product: Product) {
  closeAllModals();
  await store.fetchHistory(product.id);

  showHistory.value = true;
}
</script>
