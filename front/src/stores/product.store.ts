import { defineStore } from "pinia";
import type { Product, ProductHistory  } from "../types/product";
import * as productService from "../services/product.service";

interface ProductState {
  products: Product[];
  history: ProductHistory[];
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore("products", {
  state: (): ProductState => ({
    products: [],
    history: [] as ProductHistory[],
    loading: false,
    error: null,
  }),

  getters: {
    totalProducts: (state) => state.products.length,

    activeProducts: (state) =>
      state.products.filter((product) => product.estado),

    inactiveProducts: (state) =>
      state.products.filter((product) => !product.estado),
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        this.products = await productService.getAll();
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Error al obtener productos";
      } finally {
        this.loading = false;
      }
    },

    async createProduct(product: Omit<Product, "id">) {
      this.loading = true;
      this.error = null;

      try {
        const newProduct = await productService.create(product);

        this.products.push(newProduct);

        return newProduct;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Error al crear producto";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id: number, product: Partial<Product>) {
      this.loading = true;
      this.error = null;

      try {
        const updated = await productService.update(id, product);

        const index = this.products.findIndex((p) => p.id === id);

        if (index !== -1) {
          this.products[index] = updated;
        }

        return updated;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Error al actualizar producto";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await productService.remove(id);

        this.products = this.products.filter((p) => p.id !== id);
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Error al eliminar producto";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async changeStatus(id: number, estado: boolean) {
      this.loading = true;
      this.error = null;

      try {
        const updated = await productService.changeStatus(id, estado);

        const index = this.products.findIndex((p) => p.id === id);

        if (index !== -1) {
          this.products[index] = updated;
        }

        return updated;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Error al cambiar estado";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchHistory(id: number) {
      this.loading = true;

      try {
        this.history = await productService.getHistory(id);
      } finally {
        this.loading = false;
      }
    },
  },
});