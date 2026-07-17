import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestión de Productos AssisPrex ",
      version: "1.0.0",
      description: "API REST para gestión de productos - prueba tecnica",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.resolve("src/routes/*.ts"), path.resolve("dist/routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
