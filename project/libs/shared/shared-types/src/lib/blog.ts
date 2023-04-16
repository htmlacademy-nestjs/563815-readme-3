import {
  DatabasePost,
  DatabasePostStatus,
  DatabasePostType,
  DatabaseTag,
} from '@prisma/client';

export type PostType = DatabasePostType;
export type PostStatus = DatabasePostStatus;
export type BlogPostToClient = DatabasePost;
export type BlogTagToClient = DatabaseTag;

export type NewBlogPostFromClient = Pick<
  DatabasePost,
  | 'announcement'
  | 'authorId'
  | 'externalUrl'
  | 'quoteAuthor'
  | 'text'
  | 'title'
  | 'type'
> & {
  tags: DatabaseTag[];
};
