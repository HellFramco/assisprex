import { jest, describe, test, expect, beforeAll } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../src/services/product.service.js", () => ({
  getProductById: jest.fn<any>().mockResolvedValue({
    id: 1,
    nombre: "Laptop",
    descripcion: "Lenovo",
    precio: 2500,
    stock: 20,
    estado: true,
  }),

  updateProduct: jest.fn<any>().mockResolvedValue({
    id: 1,
    nombre: "Laptop Pro",
    descripcion: "Lenovo",
    precio: 3000,
    stock: 15,
    estado: true,
  }),

  deleteProduct: jest.fn<any>().mockResolvedValue(true),
}));

let app: any;

beforeAll(async () => {
  ({ default: app } = await import("../src/app.js"));
});

describe("Operaciones adicionales productos", () => {
  test("GET producto por id", async () => {
    const response = await request(app).get("/products/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.nombre).toBe("Laptop");
  });

  test("PUT actualizar producto", async () => {
    const response = await request(app).put("/products/1").send({
      nombre: "Laptop Pro",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.nombre).toBe("Laptop Pro");
  });

  test("DELETE eliminar producto", async () => {
    const response = await request(app).delete("/products/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Producto eliminado correctamente"
    );
  });
});