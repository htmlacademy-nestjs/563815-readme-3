import { Tag } from '@prisma/client';

export const natureTagMock: Tag = {
  id: 1,
  name: 'nature',
};

export const spaceTagMock: Tag = {
  id: 2,
  name: 'space',
};

export const tagsMock: Tag[] = [natureTagMock, spaceTagMock];
