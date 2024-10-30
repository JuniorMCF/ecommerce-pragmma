// config/storage-config.ts
import "dotenv/config";

export type DiskOptions = "local" | "s3";

export default {
  default: (process.env.STORAGE_DISK as DiskOptions) || "local",
  localPath: process.env.LOCAL_STORAGE_PATH || "./uploads",
  disks: {
    local: {
      driver: "local",
      path: process.env.LOCAL_STORAGE_PATH || "./uploads",
    },
    s3: {
      driver: "s3",
      bucket: process.env.AWS_BUCKET_NAME || "",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      region: process.env.AWS_REGION || "",
    },
  },
};
