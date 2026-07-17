import Product from "../src/models/product.model";
import * as historyService from "../src/services/productHistory.service";

jest.mock("../src/models/product.model");

jest.mock("../src/services/productHistory.service", () => ({
  registerHistory: jest.fn(),
}));

import {
  getAllProducts,
  getProductById,
  createProduct,
  changeStatus,
  deleteProduct,
} from "../src/services/product.service";

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

    expect(result.length).toBe(1);

    expect(Product.findAll).toHaveBeenCalled();
  });

  test("Debe obtener producto por id", async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      nombre: "Laptop",
    });

    const result = await getProductById(1);

    expect(result?.nombre).toBe("Laptop");
  });

  test("Debe crear producto", async () => {
    const mockProduct: any = {
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

    expect(historyService.registerHistory).toHaveBeenCalled();
  });

  test("Debe cambiar estado del producto", async () => {
    const product: any = {
      id: 1,
      nombre: "Laptop",
      estado: true,

      save: jest.fn(),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(product);

    const result = await changeStatus(1, false);

    expect(result?.estado).toBe(false);

    expect(product.save).toHaveBeenCalled();
  });

  test("Debe eliminar producto", async () => {
    const product: any = {
      id: 1,
      nombre: "Laptop",

      destroy: jest.fn(),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(product);

    const result = await deleteProduct(1);

    expect(result).toBe(true);

    expect(product.destroy).toHaveBeenCalled();
  });
});
