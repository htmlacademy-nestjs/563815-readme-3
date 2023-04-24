import { ApiResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create like',
  })
  @Post('/')
  async create(@Body() dto: LikeFromClient) {
    return this.likesService.create(dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete like',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return this.likesService.destroy(id);
  }
}
