export {
  Author,
  Tag,
  PostType,
  PostStatus,
  Post,
  Comment,
} from '@prisma/client';

export type UserBase = {
  email: string;
  name: string;
};

export type UserPublic = UserBase & {
  id: string;
};

export type UserStored = UserBase & {
  passwordHash: string;
};
