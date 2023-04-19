import {
  ConfigFilesModule,
  getMongooseOptions,
} from '@project/config/config-files';
import { FileModule } from './file/file.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileModule,
    ConfigFilesModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
