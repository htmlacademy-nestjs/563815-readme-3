import { CRUDRepository } from '@project/util/util-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberModel } from './email-subscriber.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Subscriber } from '@project/shared/shared-types';

@Injectable()
export class EmailSubscriberRepository
  implements CRUDRepository<CreateSubscriberDto, Subscriber, string>
{
  constructor(
    @InjectModel(EmailSubscriberModel.name)
    private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: CreateSubscriberDto) {
    new this.emailSubscriberModel(item).save();
  }

  public async destroy(id: string) {
    this.emailSubscriberModel.deleteOne({ _id: id }).exec();
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ _id: id }).exec();
  }

  public async update(id: string, item: CreateSubscriberDto) {
    this.emailSubscriberModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ email }).exec();
  }
}
