export type PostType = 'video' | 'text' | 'quote' | 'photo' | 'link';

export type PostStatus = 'draft' | 'published' | 'archived';

export type RepositoryUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};
