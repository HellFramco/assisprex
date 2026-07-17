import { Request, Response, NextFunction } from "express";

interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
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
