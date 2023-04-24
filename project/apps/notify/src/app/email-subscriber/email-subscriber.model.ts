import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Subscriber } from '@project/shared/shared-types';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  constructor(subscriber: Subscriber) {
    super();
    this.email = subscriber.email;
    this.name = subscriber.name;
  }
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);
