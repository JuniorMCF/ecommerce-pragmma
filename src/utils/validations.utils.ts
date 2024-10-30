import { maxFileSize, mimeTypes } from "../config/files";

export const validateMimeType = (file: Express.Multer.File, type: keyof typeof mimeTypes): boolean => {
  return mimeTypes[type].includes(file.mimetype);
};

export const validateFileSize = (file: Express.Multer.File): boolean => {
  return file.size <= maxFileSize;
};

export const mimeTypeErrorMessage = (type: keyof typeof mimeTypes) => {
  return `File must be a valid format (${mimeTypes[type].join(", ")}).`;
};

export const fileSizeErrorMessage = () => {
  return `File size must be smaller than ${maxFileSize / (1024 * 1024)} MB.`;
};
