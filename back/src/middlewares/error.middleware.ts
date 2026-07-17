import { Request, Response } from "express";

interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response
): void => {
  const statusCode = err.statusCode || 500;

  console.error(`[${statusCode}] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Error interno del servidor",
    },
  });
};
