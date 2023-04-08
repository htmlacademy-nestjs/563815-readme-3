export type PostType = 'video' | 'text' | 'quote' | 'photo' | 'link';

export type PostStatus = 'draft' | 'published' | 'archived';

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
