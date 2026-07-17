import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../src/models/product.model.js", () => ({
  default: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

jest.unstable_mockModule("../src/services/productHistory.service.js", () => ({
  registerHistory: jest.fn(),
}));

const { default: Product } = await import("../src/models/product.model.js");

const historyService = await import(
  "../src/services/productHistory.service.js"
);

const {
  getAllProducts,
  getProductById,
  createProduct,
  changeStatus,
  deleteProduct,
} = await import("../src/services/product.service.js");

describe("Product Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener todos los productos", async () => {
    (Product.findAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        nombre: "Laptop",
      },
    ]);

    const result = await getAllProducts();

    expect(result).toHaveLength(1);
    expect(Product.findAll).toHaveBeenCalledTimes(1);
  });

  test("Debe obtener producto por id", async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      nombre: "Laptop",
    });

    const result = await getProductById(1);

    expect(result?.nombre).toBe("Laptop");
    expect(Product.findByPk).toHaveBeenCalledWith(1);
  });

  test("Debe crear producto", async () => {
    const mockProduct = {
      id: 1,
      nombre: "Laptop",
    };

    (Product.create as jest.Mock).mockResolvedValue(mockProduct);

    const result = await createProduct({
      nombre: "Laptop",
      descripcion: "Lenovo",
      precio: 2500,
      stock: 10,
      estado: true,
    });

    expect(result.nombre).toBe("Laptop");

    expect(historyService.registerHistory).toHaveBeenCalledWith(
      1,
      "CREATE",
      'Se creó el producto "Laptop".'
    );
  });

  test("Debe cambiar estado del producto", async () => {
    const product = {
      id: 1,
      nombre: "Laptop",
      estado: true,
      save: jest.fn().mockResolvedValue(undefined),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(product);

    const result = await changeStatus(1, false);

    expect(result?.estado).toBe(false);
    expect(product.save).toHaveBeenCalledTimes(1);

    expect(historyService.registerHistory).toHaveBeenCalledWith(
      1,
      "STATUS_CHANGE",
      'El producto "Laptop" cambió su estado a Inactivo.'
    );
  });

  test("Debe eliminar producto", async () => {
    const product = {
      id: 1,
      nombre: "Laptop",
      destroy: jest.fn().mockResolvedValue(undefined),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(product);

    const result = await deleteProduct(1);

    expect(result).toBe(true);
    expect(product.destroy).toHaveBeenCalledTimes(1);

    expect(historyService.registerHistory).toHaveBeenCalledWith(
      1,
      "DELETE",
      'Se eliminó el producto "Laptop".'
    );
  });
});