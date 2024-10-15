import "dotenv/config";

export default {
  environment: process.env.NODE_ENV || "dev",
  port: process.env.SERVER_PORT || 3000,
  mongoConnectUri: process.env.MONGODB_CONNECT_URI || "",
};
