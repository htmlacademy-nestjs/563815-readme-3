import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED } from './file.constants';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { filesConfig } from '@project/config/config-files';
import path from 'path';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class FileService {
  constructor(
    @Inject(filesConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof filesConfig>
  ) {}

  public async writeFile(file: Express.Multer.File): Promise<string> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;

    if (!uploadDirectory) {
      throw new Error(ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED);
    }

    const uploadDirectoryPath = path.join(uploadDirectory, year, month);
    const destinationFile = path.join(uploadDirectoryPath, file.originalname);

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return destinationFile;
  }
}
