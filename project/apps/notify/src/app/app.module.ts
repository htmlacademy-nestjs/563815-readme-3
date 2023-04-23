import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EmailSubscriberModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
