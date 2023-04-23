import { EMAIL_NOT_VALID, NAME_IS_EMPTY } from '../email-subscriber.constant';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  public name: string;

  constructor(user: CreateSubscriberDto) {
    this.email = user.email;
    this.name = user.name;
  }
}
