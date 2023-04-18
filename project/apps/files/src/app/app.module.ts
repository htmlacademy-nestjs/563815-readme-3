import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigFilesModule } from '@project/config/config-files';
import { FileModule } from './file/file.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigFilesModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
