import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
} from './constants';
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { SortTypeEnum } from '@project/shared/shared-types';
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
  public tags?: number[];

  @IsIn(Object.keys(SortTypeEnum))
  @IsOptional()
  public sortType: string = DEFAULT_SORT_TYPE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  @IsObject()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @IsDefined()
  @Transform(({ value }) => +value)
  public page: number;

  constructor() {
    this.page = 1;
  }
}
