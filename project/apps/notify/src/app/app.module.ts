import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EmailSubscriberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
