import { DatabaseTag } from '@prisma/client';

export const natureTagMock: DatabaseTag = {
  id: 1,
  name: 'nature',
};

export const spaceTagMock: DatabaseTag = {
  id: 2,
  name: 'space',
};

export const tagsMock: DatabaseTag[] = [natureTagMock, spaceTagMock];
