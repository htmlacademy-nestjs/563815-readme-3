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
import { NewBlogPostFromClient } from './dto/new-blog-post-from-client.dto';
import { PostQuery } from './post.query';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async index(@Query() query: PostQuery) {
    return this.postService.getPosts(query);
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  @Get('/:user')
  async showByUser(@Param('user') id: number, @Query() query: PostQuery) {
    return this.postService.getPostsByUser(id, query);
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
