import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  addToCart(
    @Request() req: any,
    @Body() data: { productId: string; quantity: number },
  ) {
    return this.cartService.addToCart(req.user.id, data.productId, data.quantity);
  }

  @Put('update')
  updateCartItem(
    @Request() req: any,
    @Body() data: { productId: string; quantity: number },
  ) {
    return this.cartService.updateCartItem(req.user.id, data.productId, data.quantity);
  }

  @Delete('remove/:productId')
  removeFromCart(@Request() req: any, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.id, productId);
  }

  @Delete('clear')
  clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}
