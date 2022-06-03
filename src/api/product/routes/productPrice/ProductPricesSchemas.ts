import { Joi, Segments } from 'celebrate';
import { queryPaginationSchemas } from '../../../../lib/utils/validation/pagination';

const getPricesHistoryByProductSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  ...queryPaginationSchemas.queryPagination,
};

export const productPriceSchemas = {
  getPricesHistoryByProductSchema,
};
