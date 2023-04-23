import { ConfigNotifyModule } from '@project/config/config-notify';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('notify.db')),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
