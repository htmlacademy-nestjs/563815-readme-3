import 'multer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
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

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(filesConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof filesConfig>
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'File uploaded successfully',
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.saveFile(file);
  }

  @Get(':fileId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File',
  })
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    return await this.fileService.getFile(fileId);
  }
}
