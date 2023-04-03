import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from "@project/config/config-users";

@Module({
  imports: [UsersModule, AuthenticationModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
