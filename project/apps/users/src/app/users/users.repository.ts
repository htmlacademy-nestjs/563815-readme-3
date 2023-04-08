import { CRUDRepository } from '@project/util/util-types';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDbModel } from './user.db-model';
import { UserRepositoryEntity } from './user-repository-entity';
import { UserStored } from '@project/shared/shared-types';

@Injectable()
export class UsersRepository
  implements CRUDRepository<UserRepositoryEntity, string, UserStored>
{
  constructor(
    @InjectModel(UserDbModel.name)
    private readonly userDbModel: Model<UserDbModel>
  ) {}

  public async create(item: UserRepositoryEntity): Promise<UserStored> {
    const newBlogUser = new this.userDbModel(item);
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.userDbModel.deleteOne({ _id: id }).exec();
  }

  public async findById(id: string): Promise<UserStored | null> {
    return this.userDbModel.findOne({ _id: id });
  }

  public async findByEmail(email: string): Promise<UserStored | null> {
    return this.userDbModel.findOne({ email }).exec();
  }

  public async update(id: string, item: UserRepositoryEntity): Promise<void> {
    await this.userDbModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
