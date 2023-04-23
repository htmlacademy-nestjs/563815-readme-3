import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';
import { UsersModule } from './users/users.module';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions('users')),
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
