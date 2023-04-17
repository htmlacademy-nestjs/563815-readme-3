import 'multer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED } from './file.constants';
import { ensureDir } from 'fs-extra';
import { filesConfig } from '@project/config/config-files';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class FileService {
  constructor(
    @Inject(filesConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof filesConfig>
  ) {}

  public async writeFile(file: Express.Multer.File): Promise<string> {
    const uploadDirectoryPath = this.applicationConfig.uploadDirectory;

    if (!uploadDirectoryPath) {
      throw new Error(ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED);
    }
    const destinationFile = `${uploadDirectoryPath}/${file.originalname}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return destinationFile;
  }
}
