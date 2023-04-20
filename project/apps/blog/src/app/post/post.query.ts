import { DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from './constants';
import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) =>
    value.split(',').map((categoryId: string) => +categoryId)
  )
  @IsArray({})
  @IsOptional()
  public categories?: number[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  constructor() {
    this.page = 1;
  }
}
