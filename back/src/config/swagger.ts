import swaggerJsdoc from "swagger-jsdoc";


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestión de Productos AssisPrex",
      version: "1.0.0",
      description: "API REST para gestión de productos - prueba técnica",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [
    // "./src/routes/*.ts",
    // "./dist/routes/*.js",
    "src/routes/*.ts",
    "dist/src/routes/*.js",
  ],
};

export default swaggerJsdoc(options);