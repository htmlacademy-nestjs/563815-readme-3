import {
  BlogPostToClient,
  NewBlogPostFromClient,
} from '@project/shared/shared-types';
import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { PostQuery } from './post.query';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostRepository
  implements CRUDRepository<NewBlogPostFromClient, BlogPostToClient, number>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(blogPost: NewBlogPostFromClient) {
    this.prisma.databasePost.create({
      data: {
        ...blogPost,
        comments: {
          connect: [],
        },
        tags: {
          connect: blogPost.tags,
        },
      },
      include: {
        comments: true,
        tags: true,
      },
    });
  }

  public async destroy(id: number) {
    await this.prisma.databasePost.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: number) {
    return this.prisma.databasePost.findFirst({
      where: {
        id: id,
      },
      include: {
        comments: true,
        tags: true,
      },
    });
  }

  public find({ limit, tags, sortDirection, page }: PostQuery) {
    return this.prisma.databasePost.findMany({
      where: {
        tags: {
          some: {
            id: {
              in: tags,
            },
          },
        },
        status: 'published',
      },
      take: limit,
      include: {
        comments: true,
        tags: true,
      },
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findByUser(
    userId: number,
    { limit, tags, sortDirection, page }: PostQuery
  ) {
    return this.prisma.databasePost.findMany({
      where: {
        authorId: userId,
        tags: {
          some: {
            id: {
              in: tags,
            },
          },
        },
        status: 'published',
      },
      take: limit,
      include: {
        comments: true,
        tags: true,
      },
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, post: NewBlogPostFromClient): Promise<void> {
    this.prisma.databasePost.update({
      where: {
        id: id,
      },
      data: {
        ...post,
        tags: {
          connect: post.tags,
        },
      },
    });
  }
}
