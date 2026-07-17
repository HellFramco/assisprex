import api from "./api";
import type { Product } from "../types/product";

const BASE_URL = "/products";

export const getAll = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(BASE_URL);
  return data;
};

export const getById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`${BASE_URL}/${id}`);
  return data;
};

export const create = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const { data } = await api.post(`${BASE_URL}`, product);

  // El backend responde:
  // { message: "...", data: product }

  return data.data;
};

export const update = async (
  id: number,
  product: Partial<Product>,
): Promise<Product> => {
  const { data } = await api.put(`${BASE_URL}/${id}`, product);

  // { message: "...", data: product }

  return data.data;
};

export const remove = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};

export const changeStatus = async (
  id: number,
  estado: boolean,
): Promise<Product> => {
  const body = {
    estado: estado ? "Activo" : "Inactivo",
  };

  const { data } = await api.patch(`${BASE_URL}/${id}/status`, body);

  // { success:true, message:"...", data: product }

  return data.data;
};

export const getHistory = async (id: number) => {
  const { data } = await api.get(`/products/${id}/history`);
  return data;
};
