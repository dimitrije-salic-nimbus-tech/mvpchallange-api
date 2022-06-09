import { Joi, Segments } from 'celebrate';

const createProductSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    amountAvailable: Joi.number().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
};

const getProductSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

const updateProductSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

const buyProductSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    products: Joi.array().items(
      Joi.object().keys({
        productId: Joi.string().uuid().required(),
        amount: Joi.number().required(),
      }),
    ),
  }),
};

export const productSchemas = {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  buyProductSchema,
};
