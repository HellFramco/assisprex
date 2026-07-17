import request from "supertest";

jest.mock("../src/services/product.service", () => ({
  getAllProducts: jest.fn().mockResolvedValue([
    {
      id: 1,
      nombre: "Laptop",
      descripcion: "Lenovo",
      precio: 2500,
      stock: 20,
      estado: true,
    },
  ]),

  createProduct: jest.fn().mockResolvedValue({
    id: 1,
    nombre: "Laptop",
    descripcion: "Lenovo",
    precio: 2500,
    stock: 20,
    estado: true,
  }),

  changeStatus: jest.fn().mockResolvedValue({
    id: 1,
    nombre: "Laptop",
    estado: false,
  }),
}));

import app from "../src/app";

describe("API Productos", () => {
  test("Debe responder la ruta principal", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });
});

describe("POST /products", () => {
  test("Debe crear un producto", async () => {
    const response = await request(app).post("/products").send({
      nombre: "Laptop",
      descripcion: "Lenovo",
      precio: 2500,
      stock: 20,
      estado: true,
    });

    expect(response.status).toBe(201);

    expect(response.body.data.nombre).toBe("Laptop");
  });
});

describe("GET /products", () => {
  test("Debe retornar arreglo", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("PATCH /products/:id/status", () => {
  test("Debe cambiar el estado", async () => {
    const response = await request(app).patch("/products/1/status").send({
      estado: "Inactivo",
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.estado).toBe(false);
  });
});
