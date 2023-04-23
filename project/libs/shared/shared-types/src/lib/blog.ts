import { DatabasePost, DatabaseTag } from '@prisma/client';

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

export type LikeFromClient = {
  postId: number;
  userId: number;
};
