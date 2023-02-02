import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const ReviewsModel = sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  //   {timestamps: false} -> timestamps are true by default
});

export default ReviewsModel;
