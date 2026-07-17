export interface ICreateProduct {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  estado: boolean;
}

export interface IProduct extends ICreateProduct {
  id: number;
  fecha_creacion: Date;
}
