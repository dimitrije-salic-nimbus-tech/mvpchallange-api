import { PageableItems } from '../../../dto/pagination';

export const createPageableResponse = <R>(
  items: R[],
  limit: number,
  count: number,
  page: number,
): PageableItems<R> => ({
  items,
  totalPages: Math.ceil(count / limit),
  page,
});
