import {
  DatabasePost,
  DatabasePostStatus,
  DatabasePostType,
} from '@prisma/client';
import { danielAuthorMock, sarahAuthorMock } from './authors';

export const videoPostMock: DatabasePost = {
  type: DatabasePostType.video,
  id: 1,
  authorId: danielAuthorMock.id,
  status: DatabasePostStatus.published,

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

export const textPostMock: DatabasePost = {
  type: DatabasePostType.text,
  id: 2,
  authorId: sarahAuthorMock.id,
  status: DatabasePostStatus.draft,

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),

  title: 'About the text DatabasePost and how to make it',
  announcement:
    "This is a text DatabasePost. It doesn't have a title, but it has a text.",
  text: "So, this is a text DatabasePost. It doesn't have a title, but it has a text. It's a text DatabasePost.",

  isRepost: false,
  originalAuthorId: null,
  originalPostId: null,

  externalUrl: null,
  quoteAuthor: null,
};

export const quotePostMock: DatabasePost = {
  type: DatabasePostType.text,
  id: 3,
  authorId: danielAuthorMock.id,
  status: DatabasePostStatus.draft,

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

export const photoPostMock: DatabasePost = {
  type: DatabasePostType.photo,
  id: 4,
  authorId: sarahAuthorMock.id,
  status: DatabasePostStatus.archived,

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

export const linkPostMock: DatabasePost = {
  type: DatabasePostType.link,
  id: 5,
  authorId: danielAuthorMock.id,
  status: DatabasePostStatus.published,

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
