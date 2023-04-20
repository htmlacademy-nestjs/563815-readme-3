export type File = {
  id?: string;
  originalName: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
};

export type WrittenFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
};
