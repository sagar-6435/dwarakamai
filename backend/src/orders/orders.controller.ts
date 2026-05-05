import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ordersService.findAll(
      req.user.id,
      req.user.role === 'admin',
      page,
      limit,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string, @Request() req: any) {
    return this.ordersService.findById(id, req.user.id, req.user.role === 'admin');
  }

  @Post()
  create(
    @Request() req: any,
    @Body()
    data: {
      items: any[];
      shippingAddress: any;
      paymentMethod: string;
    },
  ) {
    return this.ordersService.create(
      req.user.id,
      data.items,
      data.shippingAddress,
      data.paymentMethod,
    );
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() data: { status?: string; paymentStatus?: string },
  ) {
    return this.ordersService.updateStatus(id, data.status, data.paymentStatus);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
