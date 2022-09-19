import { Router } from "express";
import ProductController from "./web/controllers/ProductController";
import { celebrate, Joi, Segments } from "celebrate";

const productsRouter = Router();

const productsController = new ProductController();

productsRouter
  //.get('/products', productsController.index)

  // .get(
  //   '/products/:id',
  //   celebrate({
  //     [Segments.PARAMS]: {
  //       _id: Joi.string().uuid().required(),
  //     },
  //   }),
  //   productsController.show,
  // )

  .post(
    "/products",
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().precision(2).required(),
      },
    }),
    productsController.create
  );

// .put(
//   '/products/:id',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       price: Joi.number().precision(2).required(),
//       quantity: Joi.number().required(),
//     },
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   productsController.update,
// )

// .delete(
//   '/products/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   productsController.delete,
// );

export default productsRouter;
