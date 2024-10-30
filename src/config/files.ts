import "dotenv/config";

export const mimeTypes = {
  images: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
  ],
  pdf: ["application/pdf"],
  documents: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  spreadsheets: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
};

export const maxFileSize =
  parseInt(process.env.MAX_FILE_SIZE_MB || "5") * 1024 * 1024;
