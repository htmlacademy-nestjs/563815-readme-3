import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NewBlogPostFromClient } from '@project/shared/shared-types';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Get('/')
  async index() {
    return this.postService.getPosts();
  }

  @Post('/')
  async create(@Body() dto: NewBlogPostFromClient) {
    return this.postService.createPost(dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NewBlogPostFromClient
  ) {
    return this.postService.updatePost(id, dto);
  }
}
