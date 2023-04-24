import { UserFromClient, UserToClient } from '@project/shared/shared-types';
import { AuthenticationModel } from './authentication.model';
import { CRUDRepository } from '@project/util/util-types';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository
  implements CRUDRepository<UserFromClient, UserToClient, string>
{
  constructor(
    @InjectModel(AuthenticationModel.name)
    private readonly userDbModel: Model<AuthenticationModel>
  ) {}

  public async create(item: Omit<UserFromClient, 'password'>) {
    new this.userDbModel(item);
  }

  public async destroy(id: string) {
    this.userDbModel.deleteOne({ _id: id }).exec();
  }

  public async findById(id: string) {
    return this.userDbModel.findOne({ _id: id });
  }

  public async findByEmail(email: string) {
    return this.userDbModel.findOne({ email }).exec();
  }

  public async update(id: string, item: Omit<UserFromClient, 'password'>) {
    await this.userDbModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }
}
