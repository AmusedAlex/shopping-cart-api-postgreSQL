import express from "express";
import ReviewsModel from "./model.js";
import { Op } from "sequelize";
import ProductsModel from "../products/model.js";
import ReviewsCategoriesModel from "../products/productsCategoriesModel.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const { reviewId } = await ReviewsModel.create(req.body);
    res.status(201).send({ reviewId });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/", async (req, res, next) => {
  try {
    // const query = {};
    // if (req.query.name) query.name = { [Op.iLike]: `%${req.query.name}%` };
    // if (req.query.category)
    //   query.category = { [Op.iLike]: `%${req.query.category}%` };
    // if (req.query.price) query.price = { [Op.eq]: parseInt(req.query.price) };
    const reviews = await ReviewsModel.findAll(
      //     {
      //   where: { ...query }, // returns only matching on query ?firstName=
      //   attributes: ["id", "name", "category", "description", "image", "price"], //  includes attributes on return
      // }
      { include: [{ model: ProductsModel, attributes: ["name", "category"] }] }
    );

    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const review = await ReviewsModel.findByPk(req.params.reviewId, {
      attributes: { exclude: ["createdAt", "updatedAt"] }, // excludes attributes
    });
    if (review) {
      res.send(review);
    } else {
      next(
        createHttpError(404, `Review with id ${req.params.reviewId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await ReviewsModel.update(
      req.body,
      {
        where: { id: req.params.reviewId },
        returning: true,
      }
    );

    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(
        createHttpError(404, `Review with id ${req.params.reviewId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ReviewsModel.destroy({
      where: { id: req.params.reviewId },
    });

    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Review with id ${req.params.reviewId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
export default reviewsRouter;
