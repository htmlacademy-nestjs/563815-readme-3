import { Post, PostStatus, PostType } from '@prisma/client';
import { danielAuthorMock, sarahAuthorMock } from './authors';

export const videoPostMock: Post = {
  type: PostType.video,
  id: 1,
  authorId: danielAuthorMock.id,
  status: PostStatus.published,

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),

  title: 'How to make a video',
  externalUrl: 'https://www.youtube.com/watch?v=1',

  isRepost: false,
  originalAuthorId: null,
  originalPostId: null,

  announcement: null,
  quoteAuthor: null,
  text: null,
};

export const textPostMock: Post = {
  type: PostType.text,
  id: 2,
  authorId: sarahAuthorMock.id,
  status: PostStatus.draft,

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),

  title: 'About the text post and how to make it',
  announcement:
    "This is a text post. It doesn't have a title, but it has a text.",
  text: "So, this is a text post. It doesn't have a title, but it has a text. It's a text post.",

  isRepost: false,
  originalAuthorId: null,
  originalPostId: null,

  externalUrl: null,
  quoteAuthor: null,
};

export const quotePostMock: Post = {
  type: PostType.text,
  id: 3,
  authorId: danielAuthorMock.id,
  status: PostStatus.draft,

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),

  isRepost: true,
  originalAuthorId: 2,
  originalPostId: 1,

  text: "Life is like a box of chocolates. You never know what you're gonna get.",
  quoteAuthor: 'Forrest Gump',

  title: null,
  announcement: null,
  externalUrl: null,
};

export const photoPostMock: Post = {
  type: PostType.photo,
  id: 4,
  authorId: sarahAuthorMock.id,
  status: PostStatus.archived,

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),

  externalUrl: 'https://www.instagram.com/p/1/',

  isRepost: true,
  originalAuthorId: 1,
  originalPostId: 2,

  title: null,
  announcement: null,
  quoteAuthor: null,
  text: null,
};

export const linkPostMock: Post = {
  type: PostType.link,
  id: 5,
  authorId: danielAuthorMock.id,
  status: PostStatus.published,

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),

  announcement: 'Fire in the hole!',
  externalUrl: 'https://www.youtube.com/watch?v=1',

  isRepost: true,
  originalAuthorId: 1,
  originalPostId: 2,

  title: null,
  quoteAuthor: null,
  text: null,
};
