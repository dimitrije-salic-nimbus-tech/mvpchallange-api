import { Joi, Segments } from 'celebrate';

import { RoleEnum } from '../../../../lib/shared/enums';
import { VALID_COINS } from '../../../../lib/utils/validation';

const createUserSchema = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    role: Joi.string()
      .valid(...Object.values(RoleEnum))
      .required(),
  }),
};

const getUserSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

const updateUserSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().optional(),
  }),
};

const addDepositSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    deposit: Joi.number()
      .valid(...VALID_COINS)
      .required(),
  }),
};

export const userSchemas = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  addDepositSchema,
};
