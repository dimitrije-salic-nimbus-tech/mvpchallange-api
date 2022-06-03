import { QueryParamsPaginationType } from '../../../shared/types';
import { PageableRequest } from '../../../shared/dto/pagination';

export const createPageableRequest = (request: QueryParamsPaginationType): PageableRequest => ({
  limit: +request.limit!,
  offset: +request.offset!,
  page: +request.page!,
});
