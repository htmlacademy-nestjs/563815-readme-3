import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStored } from '@project/shared/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserDbModel extends Document implements UserStored {
  @Prop()
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  constructor(user: UserStored) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }
}

export const UserDbModelSchema = SchemaFactory.createForClass(UserDbModel);
