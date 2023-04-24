import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostToClient } from '@project/shared/shared-types';
import { ERROR_POST_NOT_FOUND } from './constants';
import { NewBlogPostFromClient } from './dto/new-blog-post-from-client.dto';
import { PostQuery } from './post.query';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(dto: NewBlogPostFromClient): Promise<void> {
    this.postRepository.create(dto);
  }

  async repost(dto: NewBlogPostFromClient): Promise<void> {
    this.postRepository.create(dto);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (post) {
      this.postRepository.destroy(id);
    } else {
      throw new NotFoundException(ERROR_POST_NOT_FOUND);
    }
  }

  async getPost(id: number): Promise<BlogPostToClient> {
    const post = await this.postRepository.findById(id);

    if (post) {
      return post;
    } else {
      throw new NotFoundException(ERROR_POST_NOT_FOUND);
    }
  }

  async getPosts(query: PostQuery): Promise<BlogPostToClient[]> {
    return this.postRepository.find(query);
  }

  async getPostsByUser(
    userId: number,
    query: PostQuery
  ): Promise<BlogPostToClient[]> {
    return this.postRepository.findByUser(userId, query);
  }

  async updatePost(id: number, dto: NewBlogPostFromClient): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (post) {
      this.postRepository.update(id, dto);
    } else {
      throw new NotFoundException(ERROR_POST_NOT_FOUND);
    }
  }
}
