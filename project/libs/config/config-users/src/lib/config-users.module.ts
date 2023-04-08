import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';

const ENV_USERS_FILE_PATH = 'apps/users/.users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class ConfigUsersModule {}
