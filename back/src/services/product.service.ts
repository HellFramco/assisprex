import Product from "../models/product.model.js";
import { ICreateProduct } from "../interfaces/product.interface.js";
import { registerHistory } from "./productHistory.service.js";

export const getAllProducts = async (): Promise<Product[]> => {
  return await Product.findAll({
    order: [["id", "ASC"]],
  });
};

// listar 1 articulo
export const getProductById = async (id: number): Promise<Product | null> => {
  return await Product.findByPk(id);
};

// crear articulo
export const createProduct = async (data: ICreateProduct): Promise<Product> => {
  const product = await Product.create({
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock,
    estado: data.estado,
  });

  await registerHistory(
    product.id,
    "CREATE",
    `Se creó el producto "${product.nombre}".`
  );

  return product;
};

// editar PUT articulo
export const updateProduct = async (
  id: number,
  data: Partial<ICreateProduct>
): Promise<Product | null> => {
  const product = await Product.findByPk(id);

  if (!product) {
    return null;
  }

  await product.update({
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock,
    estado: data.estado,
  });

  await registerHistory(
    product.id,
    "UPDATE",
    `Se actualizó el producto "${product.nombre}".`
  );

  return product;
};

// eliminar articulo
export const deleteProduct = async (id: number): Promise<boolean> => {
  const product = await Product.findByPk(id);

  if (!product) {
    return false;
  }

  const nombre = product.nombre;

  await product.destroy();

  await registerHistory(id, "DELETE", `Se eliminó el producto "${nombre}".`);

  return true;
};

// editar estado PATCH
export const changeStatus = async (id: number, estado: boolean) => {
  const product = await Product.findByPk(id);

  if (!product) {
    return null;
  }

  product.estado = estado;

  await product.save();

  await registerHistory(
    product.id,
    "STATUS_CHANGE",
    `El producto "${product.nombre}" cambió su estado a ${
      estado ? "Activo" : "Inactivo"
    }.`
  );

  return product;
};
