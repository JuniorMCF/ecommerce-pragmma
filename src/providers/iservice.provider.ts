abstract class ServiceProvider {
    static register(): void {
      throw new Error("El método register() debe ser implementado.");
    }
  }
  
  export default ServiceProvider;
  