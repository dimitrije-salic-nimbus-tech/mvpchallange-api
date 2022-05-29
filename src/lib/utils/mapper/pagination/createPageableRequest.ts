import { QueryParamsPaginationType } from '../../../types';
import { PageableRequest } from '../../../dto/pagination';

export const createPageableRequest = (request: QueryParamsPaginationType): PageableRequest => ({
  limit: +request.limit!,
  offset: +request.offset!,
  page: +request.page!,
});
