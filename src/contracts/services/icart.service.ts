import { Cart } from "../../entities/cart";
import { ServiceResult } from "../../responses/service-result.dto";

export interface ICartService {
    addToCart(userId: string, productId: string, quantity: number): Promise<ServiceResult<Cart>>;
    removeFromCart(userId: string, productId: string,quantity:number): Promise<ServiceResult<Cart>>;
    clearCart(userId:string): Promise<ServiceResult<Boolean>>;
    getCart(userId: string): Promise<ServiceResult<Cart>>;
  }