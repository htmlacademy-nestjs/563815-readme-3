import { AuthenticationModel, UserDbModelSchema } from './authentication.model';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from '../notify/notify.module';
import { UsersRepository } from './users.repository';
import { getJwtOptions } from '@project/config/config-users';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    MongooseModule.forFeature([
      { name: AuthenticationModel.name, schema: UserDbModelSchema },
    ]),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy, UsersRepository],
})
export class AuthenticationModule {}
