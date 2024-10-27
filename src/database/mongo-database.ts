// src/shared/database.ts
import { MongoClient } from "mongodb";
import dbConfig from "../config/databse.config";

const client = new MongoClient(dbConfig.uri, dbConfig.options);

class Database {
  private static instance: Database;
  private client: MongoClient;
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
        this.isConnected = true;
      } catch (error) {
        console.error("Error connecting to database", error);
      }
    }
  }

  public getDb() {
    return this.client.db(dbConfig.dbName);
  }

  public async disconnect() {
    await this.client.close();
    console.log("Disconnected from database");
  }
}

export const connectToDatabase = async () => {
  const dbInstance = Database.getInstance();
  await dbInstance.connect();
  return dbInstance.getDb();
};

export { Database };
