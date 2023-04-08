import { UserStored } from '@project/shared/shared-types';

export class UserRepositoryEntity implements UserStored {
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(user: UserStored) {
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
  }

  public toObject() {
    return { ...this };
  }
}
