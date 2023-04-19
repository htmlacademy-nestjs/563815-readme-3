import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { File } from '@project/shared/shared-types';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class FileModel extends Document implements File {
  @Prop({
    required: true,
  })
  public originalName: string;

  @Prop({
    required: true,
  })
  public hashName: string;

  @Prop({
    required: true,
  })
  public mimetype: string;

  @Prop({
    required: true,
  })
  public path: string;

  @Prop({
    required: true,
  })
  public size: number;

  constructor(file: File) {
    super();
    this.originalName = file.originalName;
    this.hashName = file.hashName;
    this.mimetype = file.mimetype;
    this.path = file.path;
    this.size = file.size;
  }
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
