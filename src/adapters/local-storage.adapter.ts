// adapters/local-storage-adapter.ts
import { IStorageAdapter } from "../contracts/adapters/istorage.adapter";
import * as fs from "fs";
import * as path from "path";
import crypto from "crypto";

export class LocalStorageAdapter implements IStorageAdapter {
  constructor(private basePath: string) {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const uniqueHash = crypto
      .createHash("sha256")
      .update(Date.now() + file.originalname)
      .digest("hex")
      .substring(0, 12);
    const uniqueFilename = `${uniqueHash}${path.extname(file.originalname)}`;
    const filePath = path.join(this.basePath, uniqueFilename);

    // Guardar el archivo en la ruta generada
    await fs.promises.writeFile(filePath, file.buffer);
    return uniqueFilename;
  }

  async get(filename: string): Promise<Buffer> {
    const filePath = path.join(this.basePath, filename);
    return fs.promises.readFile(filePath);
  }

  async delete(filename: string): Promise<void> {
    const filePath = path.join(this.basePath, filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}

export const createLocalStorageAdapter = (config: any) =>
  new LocalStorageAdapter(config.path);
