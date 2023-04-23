import { ConfigFilesModule } from '@project/config/config-files';
import { FileModule } from './file/file.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    FileModule,
    ConfigFilesModule,
    MongooseModule.forRootAsync(getMongooseOptions('files.db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
