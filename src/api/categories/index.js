import express from "express";
import CategoriesModel from "./model.js";
import { Op } from "sequelize";
import ProductsModel from "../products/model.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { categorieId } = await CategoriesModel.create(req.body);
    res.status(201).send({ id: categorieId });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get("/", async (req, res, next) => {
  try {
    // const query = {};
    // if (req.query.name) query.name = { [Op.iLike]: `%${req.query.name}%` };
    // if (req.query.category)
    //   query.category = { [Op.iLike]: `%${req.query.category}%` };
    // if (req.query.price) query.price = { [Op.eq]: parseInt(req.query.price) };
    const categories = await CategoriesModel.findAll();

    res.send(categories);
  } catch (error) {
    next(error);
  }
});

// To create bulk categories and send back all created categorieIds

categoriesRouter.post("/bulk", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.bulkCreate([
      { name: "electronics" },
      { name: "food" },
      { name: "cars" },
      { name: "cosmetics" },
    ]);
    res.send(categories.map((categorie) => categorie.categorieId));
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get("/:categorieId", async (req, res, next) => {
  try {
    const categorie = await CategoriesModel.findByPk(req.params.categorieId);
    if (categorie) {
      res.send(categorie);
    } else {
      next(
        createHttpError(
          404,
          `Categorie with id ${req.params.categorieId} not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
categoriesRouter.put("/:categorieId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await CategoriesModel.update(
      req.body,
      {
        where: { id: req.params.categorieId },
        returning: true,
      }
    );

    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(
        createHttpError(
          404,
          `Categorie with id ${req.params.categorieId} not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete("/:categorieId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await CategoriesModel.destroy({
      where: { id: req.params.categorieId },
    });

    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(
          404,
          `Categorie with id ${req.params.categorieId} not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
export default categoriesRouter;
