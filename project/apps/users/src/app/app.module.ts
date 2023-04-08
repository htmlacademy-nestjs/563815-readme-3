import {
  ConfigUsersModule,
  getMongooseOptions,
} from '@project/config/config-users';
import { AuthenticationModule } from './authentication/authentication.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
