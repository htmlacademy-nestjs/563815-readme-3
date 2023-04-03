import { genSalt, hash } from 'bcrypt';
import { RepositoryUser } from '@project/shared/shared-types';
import { SALT_ROUNDS } from './constants';
import { nanoid } from 'nanoid';

export class UserRepositoryEntity implements RepositoryUser {
  public id: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(user: Omit<RepositoryUser, 'id' | 'passwordHash'>) {
    this.email = user.email;
    this.name = user.name;
    this.id = nanoid();
  }

  public toObject() {
    return { ...this };
  }

  public async setPassword(password: string): Promise<UserRepositoryEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    hash(password, salt);
    return this;
  }
}
