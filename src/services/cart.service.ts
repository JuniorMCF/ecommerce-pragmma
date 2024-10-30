// src/services/cart.service.ts
import { inject, injectable } from "inversify";
import { ICartService } from "../contracts/services/icart.service";
import { CartRepository } from "../repositories/cart.repository";
import { ProductRepository } from "../repositories/product.repository";
import { ServiceResult } from "../responses/service-result.dto";
import { Cart } from "../entities/cart";

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(CartRepository) private cartRepository: CartRepository,
    @inject(ProductRepository) private productRepository: ProductRepository
  ) {}

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<ServiceResult<Cart>> {
    // Verifica si el producto existe
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return ServiceResult.failure<Cart>(
        "Product not found",
        "PRODUCT_NOT_FOUND",
        404
      );
    }

    // Añade o actualiza el producto en el carrito
    const updatedCart = await this.cartRepository.addToCart(
      userId,
      productId,
      quantity,
      product.price
    );

    if (!updatedCart) {
      return ServiceResult.failure<Cart>(
        "Failed to update cart",
        "CART_UPDATE_FAILED",
        400
      );
    }

    return ServiceResult.success<Cart>(
      updatedCart,
      "Product added to cart successfully",
      200
    );
  }

  async removeFromCart(
    userId: string,
    productId: string
  ): Promise<ServiceResult<Cart>> {
    const result = await this.cartRepository.removeFromCart(userId, productId);

    if (result) {
      return ServiceResult.success<Cart>(result, "Product removed from cart", 200);
    }
    return ServiceResult.failure<Cart>(
      "Product not found in cart",
      "REMOVE_FROM_CART_ERROR",
      404
    );
  }

  async getCart(userId: string): Promise<ServiceResult<Cart>> {
    const result = await this.cartRepository.getCart(userId);

    if (result) {
      return ServiceResult.success<Cart>(result, "Cart retrieved successfully", 200);
    }
    return ServiceResult.failure<Cart>(
      "Error retrieving cart",
      "GET_CART_ERROR",
      500
    );
  }

  async clearCart(userId: string): Promise<ServiceResult<Boolean>> {
    const result = await this.cartRepository.clearCart(userId);

    if (!result) {
      return ServiceResult.failure<Boolean>(
        "Error retrieving cart",
        "GET_CART_ERROR",
        500
      );

     
    }
    return ServiceResult.success<Boolean>(result, result ? "Cart deleted successfully":"Cart not found", 200);
  }
}
