import { Expose } from 'class-transformer';

export class PageableRequest {
  @Expose()
  offset!: number;

  @Expose()
  limit!: number;

  @Expose()
  page!: number;
}
