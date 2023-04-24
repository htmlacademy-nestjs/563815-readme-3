import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@project/shared/shared-types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }
}
