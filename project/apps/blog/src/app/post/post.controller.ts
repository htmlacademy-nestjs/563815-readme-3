import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NewBlogPostFromClient } from '@project/shared/shared-types';
import { PostQuery } from './post.query';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  @Get('/')
  async index(@Query() query: PostQuery) {
    return this.postService.getPosts(query);
  }

  @Post('/')
  async create(@Body() dto: NewBlogPostFromClient) {
    return this.postService.createPost(dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: NewBlogPostFromClient) {
    return this.postService.updatePost(id, dto);
  }
}
