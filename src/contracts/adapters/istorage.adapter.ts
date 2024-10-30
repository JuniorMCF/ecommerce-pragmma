export interface IStorageAdapter {
    upload(file: Express.Multer.File): Promise<string>;
    get(filename: string): Promise<Buffer | string>;
    delete(filename: string): Promise<void>;
  }
  