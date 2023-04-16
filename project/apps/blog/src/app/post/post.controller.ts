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
} from '@nestjs/common';
import { NewBlogPostFromClient } from '@project/shared/shared-types';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    this.postService.getPost(postId);
  }

  @Get('/')
  async index() {
    this.postService.getPosts();
  }

  @Post('/')
  async create(@Body() dto: NewBlogPostFromClient) {
    this.postService.createPost(dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    this.postService.deletePost(parseInt(id, 10));
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: NewBlogPostFromClient) {
    this.postService.updatePost(parseInt(id, 10), dto);
  }
}
