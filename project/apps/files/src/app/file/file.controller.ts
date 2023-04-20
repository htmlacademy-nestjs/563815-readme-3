import 'multer';
import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { filesConfig } from '@project/config/config-files';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(filesConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof filesConfig>
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.saveFile(file);
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    return await this.fileService.getFile(fileId);
  }
}
