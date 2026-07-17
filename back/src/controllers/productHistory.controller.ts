import { Request, Response, NextFunction } from "express";
import * as productHistoryService from "../services/productHistory.service.js";

export const getProductHistoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const product = await productHistoryService.getHistoryProductById(id);

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

