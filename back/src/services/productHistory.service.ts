import ProductHistory from "../models/productHistory.model";

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
