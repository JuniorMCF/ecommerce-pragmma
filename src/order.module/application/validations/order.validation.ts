
export class OrderValidator {
  static validateCreateOrder(dto: any): string | null {
    if (!dto) {
      return "body not found";
    }
    // Validar que el userId esté presente y sea una cadena
    if (!dto.userId || typeof dto.userId !== "string") {
      return "user ID is required and must be a valid string.";
    }

    // Validar el método de pago
    if (!["cash", "card"].includes(dto.paymentMethod)) {
      return "Payment method must be 'cash' or 'card'.";
    }

    // Validar el método de entrega
    if (!["pickup", "delivery"].includes(dto.deliveryMethod)) {
      return "Delivery method must be 'pickup' or 'delivery'.";
    }

    // Validar que se hayan enviado productos
    if (!Array.isArray(dto.products) || dto.products.length === 0) {
      return "At least one product must be included in the order.";
    }

    // Validar los detalles de cada producto
    for (const product of dto.products) {
      if (!product.id || typeof product.id !== "string") {
        return "Each product must have a valid product ID.";
      }

      if (typeof product.quantity !== "number" || product.quantity < 1) {
        return "Each product must have a valid quantity of at least 1.";
      }

      if (typeof product.price !== "number" || product.price < 0) {
        return "Each product must have a valid price greater than or equal to 0.";
      }
    }

    // Si todas las validaciones pasan, no hay error
    return null;
  }

  // Validar la actualización de una orden
  static validateUpdateOrder(dto: any, orderId: string): string | null {
    // Validar que el ID de la orden esté presente
    if (!orderId || typeof orderId !== "string") {
      return "Order ID is required and must be a valid string.";
    }

    // Reutilizamos la validación de creación para los campos comunes
    return this.validateCreateOrder(dto);
  }
}
