import { IStorageAdapter } from "../contracts/adapters/istorage.adapter";

// Mapa de adaptadores registrados
class StorageFactory {
  private static adapters: Map<string, (config: any) => IStorageAdapter> = new Map();

  // Método para registrar un adaptador
  static registerAdapter(name: string, adapterCreator: (config: any) => IStorageAdapter) {
    this.adapters.set(name, adapterCreator);
  }

  // Método para obtener una instancia de un adaptador registrado
  static getAdapter(name: string, config: any): IStorageAdapter {
    const adapterCreator = this.adapters.get(name);
    if (!adapterCreator) {
      throw new Error(`Storage adapter "${name}" is not registered.`);
    }
    return adapterCreator(config);
  }
}

export default StorageFactory;