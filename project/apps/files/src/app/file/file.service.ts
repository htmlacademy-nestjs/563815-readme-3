import * as crypto from 'node:crypto';
import {
  ERROR_FILE_EXTENSION_IS_NOT_DEFINED,
  ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED,
} from './file.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileRepository } from './file.repository';
import { WrittenFile } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
import { filesConfig } from '@project/config/config-files';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class FileService {
  constructor(
    @Inject(filesConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof filesConfig>,
    private readonly fileRepository: FileRepository
  ) {}

  private async writeFile(file: Express.Multer.File): Promise<WrittenFile> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;

    if (!uploadDirectory) {
      throw new NotFoundException(ERROR_UPLOAD_DIRECTORY_IS_NOT_DEFINED);
    }

    const subDirectory = path.join(year, month);

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);

    if (!fileExtension) {
      throw new NotFoundException(ERROR_FILE_EXTENSION_IS_NOT_DEFINED);
    }

    const hashName = path.format({
      name: uuid,
      ext: fileExtension,
    });

    const uploadDirectoryPath = path.join(uploadDirectory, year, month);
    const destinationFile = path.format({
      dir: uploadDirectoryPath,
      name: hashName,
    });

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: path.join(subDirectory, hashName),
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writtenFile = await this.writeFile(file);
    const newFile = {
      size: file.size,
      hashName: writtenFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writtenFile.path,
    };

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
