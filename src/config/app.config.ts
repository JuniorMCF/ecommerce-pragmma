import "dotenv/config";

export default {
  environment: process.env.NODE_ENV || "development",
  port: process.env.SERVER_PORT || 3000,
  mongoConnectUri: process.env.MONGODB_CONNECT_URI || "",
  jwtAccessToken: process.env.JWT_ACCESS_SECRET || ""
};
