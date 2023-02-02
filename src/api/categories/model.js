import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const CategoriesModel = sequelize.define("categorie", {
  categorieId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  //   {timestamps: false} -> timestamps are true by default
});

export default CategoriesModel;
