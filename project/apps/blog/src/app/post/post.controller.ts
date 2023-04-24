import { ApiResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get posts',
  })
  @Get('/')
  async index(@Query() query: PostQuery) {
    return this.postService.getPosts(query);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get post',
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get posts by user id',
  })
  @Get('/:user')
  async showByUser(@Param('user') id: number, @Query() query: PostQuery) {
    return this.postService.getPostsByUser(id, query);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create post',
  })
  @Post('/')
  async create(@Body() dto: NewBlogPostFromClient) {
    return this.postService.createPost(dto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Repost post',
  })
  @Post('/repost')
  async repost(@Body() dto: NewBlogPostFromClient) {
    return this.postService.repost(dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete post',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update post',
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: NewBlogPostFromClient) {
    return this.postService.updatePost(id, dto);
  }
}
