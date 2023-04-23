import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { LikeFromClient } from '@project/shared/shared-types';
import { LikesService } from './likes.service';

@Controller('tags')
export class TagController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/')
  async create(@Body() dto: LikeFromClient) {
    return this.likesService.create(dto);
  }

  // TODO: Check user permissions
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return this.likesService.destroy(id);
  }
}
