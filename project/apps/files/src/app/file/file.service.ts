import * as crypto from 'node:crypto';
import {
  ERROR_FILE_EXTENSION_IS_NOT_DEFINED,
  ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED,
} from './file.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
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
    console.log({ file });
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;

    console.log({ uploadDirectory });

    if (!uploadDirectory) {
      throw new NotFoundException(ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED);
    }

    const filename = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);

    console.log({ fileExtension });

    if (!fileExtension) {
      throw new NotFoundException(ERROR_FILE_EXTENSION_IS_NOT_DEFINED);
    }

    const uploadDirectoryPath = path.join(uploadDirectory, year, month);
    const destinationFile = path.format({
      dir: uploadDirectoryPath,
      name: filename,
      ext: fileExtension,
    });

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return destinationFile;
  }
}
