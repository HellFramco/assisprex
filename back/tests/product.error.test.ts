import { jest, describe, test, expect } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../src/services/product.service.js", () => ({
  createProduct: jest
    .fn()
    .mockRejectedValue(new Error("Error creando producto")),

  getAllProducts: jest.fn(),

  getProductById: jest.fn().mockResolvedValue(null),

  updateProduct: jest.fn().mockResolvedValue(null),

  deleteProduct: jest.fn().mockResolvedValue(false),

  changeStatus: jest.fn().mockResolvedValue(null),
}));

const { default: app } = await import("../src/app.js");

describe("Errores API Productos", () => {
  test("Debe manejar error al crear producto", async () => {
    const response = await request(app).post("/products").send({
      nombre: "Laptop",
      precio: 2500,
      stock: 10,
      estado: true,
    });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });

  test("Debe retornar 404 si producto no existe", async () => {
    const response = await request(app).get("/products/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Producto no encontrado");
  });

  test("Debe retornar 404 al actualizar producto inexistente", async () => {
    const response = await request(app).put("/products/999").send({
      nombre: "Nuevo",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Producto no encontrado");
  });

  test("Debe retornar 404 al eliminar producto inexistente", async () => {
    const response = await request(app).delete("/products/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Producto no encontrado");
  });

  test("Debe retornar 404 al cambiar estado de producto inexistente", async () => {
    const response = await request(app).patch("/products/999/status").send({
      estado: "Activo",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Producto no encontrado");
  });
});
