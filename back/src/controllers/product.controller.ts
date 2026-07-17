import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service.js";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const product = await productService.getProductById(id);

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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      message: "Producto creado correctamente",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const product = await productService.updateProduct(id, req.body);

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.status(200).json({
      message: "Producto actualizado correctamente",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.status(200).json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const changeProductStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const estado = req.body.estado === "Activo";

    const product = await productService.changeStatus(id, estado);

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.json({
      success: true,
      message: "Estado actualizado correctamente",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
