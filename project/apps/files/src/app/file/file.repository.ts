import { File } from '@project/shared/shared-types';
import { FileModel } from './file.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>
  ) {}

  public async create(item: File): Promise<File> {
    const file = new this.fileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<File | null> {
    return this.fileModel.findOne({ _id: id }).exec();
  }
}
