import { CRUDRepository } from "@project/util/util-types";
import { UserRepositoryEntity } from "./user-repository-entity";
import { RepositoryUser } from "@project/shared/shared-types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository
  implements CRUDRepository<UserRepositoryEntity, string, RepositoryUser> {
  private repository: { [key: string]: RepositoryUser } = {};

  public async create(item: UserRepositoryEntity): Promise<RepositoryUser> {
    const entry = { ...item.toObject(), id: crypto.randomUUID() };
    this.repository[entry.id] = entry;

    return { ...entry };
  }

  public async findById(id: string): Promise<RepositoryUser> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findByEmail(email: string): Promise<RepositoryUser | null> {
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

  public async update(id: string, item: UserRepositoryEntity): Promise<RepositoryUser> {
    this.repository[id] = { ...item.toObject(), id };
    return this.findById(id);
  }
}
