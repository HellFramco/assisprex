export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

export interface ProductPayload {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

export interface ProductHistory {
  id: number;
  product_id: number;
  action: string;
  description: string;
  created_at: string;
}
