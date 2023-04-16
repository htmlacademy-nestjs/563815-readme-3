import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseUser } from '@project/shared/shared-types';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserDbModel extends Document implements DatabaseUser {
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

  constructor(user: DatabaseUser) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }
}

export const UserDbModelSchema = SchemaFactory.createForClass(UserDbModel);
