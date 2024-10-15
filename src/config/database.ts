import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { config } from "dotenv";
import server from "./app"

config();

const uri = server.mongoConnectUri;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

class Database {
  private static instance: Database;
  private client: MongoClient;
  private dbName: string = 'ecommerce-pragmma-db';
  private isConnected: boolean = false;

  private constructor() {
    this.client = client; 
  }

  public static getInstance(): Database {
    if (!Database.instance) {
        Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        console.log("Connected to MongoDB!");
      } catch (error) {
        console.error("Error connecting to database", error);
      }
    }
  }

  public getDb() {
    return this.client.db(this.dbName);
  }

  public async disconnect() {
      await this.client.close();
      console.log("disconnected to database");
  }
}


async function connectToDatabase() {
  const dbInstance = Database.getInstance();
  await dbInstance.connect();
  return dbInstance.getDb(); //return the database instance
}

export {
  client,
  connectToDatabase,
}