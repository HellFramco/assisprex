import ProductHistory from "../models/productHistory.model.js";

export const registerHistory = async (
  product_id: number,
  action: "CREATE" | "UPDATE" | "DELETE" | "STATUS_CHANGE",
  description: string
) => {
  await ProductHistory.create({
    product_id,
    action,
    description,
  });
};


// listar historial de articulo
export const getHistoryProductById = async (id: number): Promise<ProductHistory[]> => {
  return await ProductHistory.findAll({
    where: {
      product_id: id
    }
  });
};

