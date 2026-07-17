import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database.js";
import Product from "./product.model.js";

class ProductHistory extends Model<
  InferAttributes<ProductHistory>,
  InferCreationAttributes<ProductHistory>
> {
  declare id: CreationOptional<number>;
  declare product_id: number;
  declare action: "CREATE" | "UPDATE" | "DELETE" | "STATUS_CHANGE";
  declare description: string;
  declare created_at: CreationOptional<Date>;
}

ProductHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    action: {
      type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE", "STATUS_CHANGE"),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "product_history",
    timestamps: false,
  }
);

export default ProductHistory;
