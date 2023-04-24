import {
  DatabasePost,
  DatabasePostStatus,
  DatabasePostType,
  DatabaseTag,
} from '@prisma/client';

export type PostType = DatabasePostType;

export enum PostTypeEnum {
  video = 'video',
  text = 'text',
  quote = 'quote',
  photo = 'photo',
  link = 'link',
}

export type PostStatus = DatabasePostStatus;

export enum PostStatusEnum {
  draft = 'draft',
  published = 'published',
  archived = 'archived',
}

export type BlogPostToClient = DatabasePost;
export type BlogTagToClient = DatabaseTag;

export type LikeFromClient = {
  postId: number;
  userId: number;
};

export type SortType = 'date' | 'likes' | 'comments';

export enum SortTypeEnum {
  date = 'date',
  likes = 'likes',
  comments = 'comments',
}
