import {
  BlogPostToClient,
  NewBlogPostFromClient,
} from '@project/shared/shared-types';
import { ERROR_POST_NOT_FOUND } from './constants';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(dto: NewBlogPostFromClient): Promise<void> {
    this.postRepository.create(dto);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (post) {
      this.postRepository.destroy(id);
    } else {
      throw new Error(ERROR_POST_NOT_FOUND);
    }
  }

  async getPost(id: number): Promise<BlogPostToClient> {
    const post = await this.postRepository.findById(id);

    if (post) {
      return post;
    } else {
      throw new Error(ERROR_POST_NOT_FOUND);
    }
  }

  async getPosts(): Promise<BlogPostToClient[]> {
    return this.postRepository.find();
  }

  async updatePost(id: number, dto: NewBlogPostFromClient): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (post) {
      this.postRepository.update(id, dto);
    } else {
      throw new Error(ERROR_POST_NOT_FOUND);
    }
  }
}
