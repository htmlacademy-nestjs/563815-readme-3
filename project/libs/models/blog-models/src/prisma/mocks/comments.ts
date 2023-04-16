import { DatabaseComment } from '@prisma/client';

export const happyCommentMock: DatabaseComment = {
  id: 1,
  userId: 1,
  message: 'This is a happy comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sadCommentMock: DatabaseComment = {
  id: 2,
  userId: 2,
  message: 'This is a sad comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const angryCommentMock: DatabaseComment = {
  id: 3,
  userId: 1,
  message: 'This is an angry comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const questionCommentMock: DatabaseComment = {
  id: 4,
  userId: 2,
  message: 'This is a question comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const curiousCommentMock: DatabaseComment = {
  id: 5,
  userId: 1,
  message: 'This is a curious comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const funnyCommentMock: DatabaseComment = {
  id: 6,
  userId: 2,
  message: 'This is a funny comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const anxiousCommentMock: DatabaseComment = {
  id: 7,
  userId: 1,
  message: 'This is an anxious comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const bewilderedCommentMock: DatabaseComment = {
  id: 8,
  userId: 2,
  message: 'This is a bewildered comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const loveCommentMock: DatabaseComment = {
  id: 9,
  userId: 1,
  message: 'This is a love comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const confusedCommentMock: DatabaseComment = {
  id: 10,
  userId: 2,
  message: 'This is a confused comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const commentsMock: DatabaseComment[] = [
  happyCommentMock,
  sadCommentMock,
  angryCommentMock,
  questionCommentMock,
  curiousCommentMock,
  funnyCommentMock,
  anxiousCommentMock,
  bewilderedCommentMock,
  loveCommentMock,
  confusedCommentMock,
];
