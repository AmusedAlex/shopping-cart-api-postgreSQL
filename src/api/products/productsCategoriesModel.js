import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const ProductsCategoriesModel = sequelize.define("productCategorie", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default ProductsCategoriesModel;
