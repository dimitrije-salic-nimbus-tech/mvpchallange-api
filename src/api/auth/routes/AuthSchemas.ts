import { Joi, Segments } from 'celebrate';

const loginSchema = { [Segments.QUERY]: Joi.object().keys({
        code: Joi.string().required()
    }) };

export const authSchemas = { loginSchema };
