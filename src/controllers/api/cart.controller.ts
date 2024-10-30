import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CartService } from "../../services/cart.service";
import { ServiceResult } from "../../responses/service-result.dto";
import { Cart } from "../../entities/cart";
import { BaseController } from "../base.controller";

@injectable()
export class CartController extends BaseController {
  constructor(@inject(CartService) private cartService: CartService) {
    super()
  }

  public async addToCart(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user;
    const { productId, quantity } = req.body;

    const result: ServiceResult<Cart> = await this.cartService.addToCart(
      userId,
      productId,
      quantity
    );
    if(!result.isSuccess){
      return this.errorResponse(res,result.message,result.status)
    }

    return this.successResponse(
      res,
      result.data,
      result.message,
      result.status
    );
  }

  public async getCart(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user;

    const result: ServiceResult<Cart> = await this.cartService.getCart(userId);

    if(!result.isSuccess){
      return this.errorResponse(res,result.message,result.status)
    }

    return this.successResponse(
      res,
      result.data,
      result.message,
      result.status
    );
  }

  public async removeFromCart(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user;
    const { productId } = req.body;

    const result: ServiceResult<Cart> = await this.cartService.removeFromCart(
      userId,
      productId
    );

    if(!result.isSuccess){
      return this.errorResponse(res,result.message,result.status)
    }
    return this.successResponse(
      res,
      result.data,
      result.message,
      result.status
    );
  }
}
