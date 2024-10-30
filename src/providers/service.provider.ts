import { createLocalStorageAdapter } from "../adapters/local-storage.adapter";
import { createS3StorageAdapter } from "../adapters/s3-storage.adapter";
import StorageFactory from "../adapters/storage.adapter";

class AppProvider {
  public static register(): void {
    // Register adapters
    StorageFactory.registerAdapter("local", createLocalStorageAdapter);
    StorageFactory.registerAdapter("s3", createS3StorageAdapter);


  }
}

export default AppProvider;
