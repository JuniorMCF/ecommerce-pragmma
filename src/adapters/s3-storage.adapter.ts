import { IStorageAdapter } from "../contracts/adapters/istorage.adapter";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

export class S3StorageAdapter implements IStorageAdapter {
  private s3: S3Client;
  private bucket: string;

  constructor(config: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  }) {
    this.s3 = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    this.bucket = config.bucket;
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
    });
    await this.s3.send(command);
    return `https://${this.bucket}.s3.${this.s3.config.region}.amazonaws.com/${file.originalname}`;
  }

  async get(filename: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });
    const response = await this.s3.send(command);

    const streamToBuffer = (stream: Readable): Promise<Buffer> =>
      new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });

    if (response.Body instanceof Readable) {
      return streamToBuffer(response.Body);
    }
    throw new Error("Failed to retrieve file from S3");
  }

  async delete(filename: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });
    await this.s3.send(command);
  }
}

// Función para instanciar S3StorageAdapter
export const createS3StorageAdapter = (config: any) =>
  new S3StorageAdapter({
    bucket: config.bucket,
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  });
