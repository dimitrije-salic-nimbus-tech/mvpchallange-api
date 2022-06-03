import { Expose } from 'class-transformer';

export class PageableItems<T> {
  @Expose()
  items!: T[];

  @Expose()
  totalPages!: number;

  @Expose()
  page!: number;
}
