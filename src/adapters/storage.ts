import storageConfig from "../config/storage.config";
import { IStorageAdapter } from "../contracts/adapters/istorage.adapter";
import StorageFactory from "./storage.adapter";

class Storage {
  static disk(diskName?: keyof typeof storageConfig.disks): IStorageAdapter {
    const selectedDisk = diskName || storageConfig.default;
    const config =
      storageConfig.disks[selectedDisk as keyof typeof storageConfig.disks];
    if (!config) {
      throw new Error(`Storage disk "${selectedDisk}" is not configured.`);
    }

    return StorageFactory.getAdapter(selectedDisk, config);
  }
}

export default Storage;
