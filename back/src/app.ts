import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middlewares/error.middleware";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ruta por defecto
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API Productos assisprex",
    version: "1.0.0",
  });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/products", productRoutes);

// Ruta no encontrada
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Error Handler
app.use(errorHandler);

export default app;
