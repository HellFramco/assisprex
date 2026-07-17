import request from "supertest";

jest.mock("../src/services/product.service", () => ({
  getProductById: jest.fn().mockResolvedValue({
    id: 1,
    nombre: "Laptop",
  }),

  updateProduct: jest.fn().mockResolvedValue({
    id: 1,
    nombre: "Laptop Pro",
  }),

  deleteProduct: jest.fn().mockResolvedValue(true),
}));

import app from "../src/app";

describe("Operaciones adicionales productos", () => {
  test("GET producto por id", async () => {
    const res = await request(app).get("/products/1");

    expect(res.status).toBe(200);
  });

  test("PUT actualizar producto", async () => {
    const res = await request(app).put("/products/1").send({
      nombre: "Laptop Pro",
    });

    expect(res.status).toBe(200);
  });

  test("DELETE eliminar producto", async () => {
    const res = await request(app).delete("/products/1");

    expect(res.status).toBe(200);
  });
});
