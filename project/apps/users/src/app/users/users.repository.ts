import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UserRepositoryEntity } from './user-repository-entity';
import { UserStored } from '@project/shared/shared-types';

@Injectable()
export class UsersRepository
  implements CRUDRepository<UserRepositoryEntity, string, UserStored>
{
  private repository: { [key: string]: UserStored } = {};

  public async create(item: UserRepositoryEntity): Promise<UserStored> {
    const entry = { ...item.toObject(), id: crypto.randomUUID() };
    this.repository[entry.id] = entry;

    return { ...entry };
  }

  public async findById(id: string): Promise<UserStored | null> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findByEmail(email: string): Promise<UserStored | null> {
    const existUser = Object.values(this.repository).find(
      (userItem) => userItem.email === email
    );

    if (!existUser) {
      return null;
    }

    return { ...existUser };
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: UserRepositoryEntity) {
    this.repository[id] = { ...item.toObject() };
  }
}
