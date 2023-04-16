import { Comment } from '@prisma/client';

export const happyCommentMock: Comment = {
  id: 1,
  userId: 1,
  message: 'This is a happy comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sadCommentMock: Comment = {
  id: 2,
  userId: 2,
  message: 'This is a sad comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const angryCommentMock: Comment = {
  id: 3,
  userId: 1,
  message: 'This is an angry comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const questionCommentMock: Comment = {
  id: 4,
  userId: 2,
  message: 'This is a question comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const curiousCommentMock: Comment = {
  id: 5,
  userId: 1,
  message: 'This is a curious comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const funnyCommentMock: Comment = {
  id: 6,
  userId: 2,
  message: 'This is a funny comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const anxiousCommentMock: Comment = {
  id: 7,
  userId: 1,
  message: 'This is an anxious comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const bewilderedCommentMock: Comment = {
  id: 8,
  userId: 2,
  message: 'This is a bewildered comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const loveCommentMock: Comment = {
  id: 9,
  userId: 1,
  message: 'This is a love comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const confusedCommentMock: Comment = {
  id: 10,
  userId: 2,
  message: 'This is a confused comment',

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const commentsMock: Comment[] = [
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
