import "dotenv/config";
import { ServerApiVersion } from "mongodb";

export default {
  uri: process.env.MONGODB_CONNECT_URI || "",
  dbName: process.env.NAME_DATABASE || "",
  options: {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  },
};
