import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import filesConfig from './files.config';

const ENV_FILE_PATH = 'apps/files/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [filesConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigFilesModule {}
