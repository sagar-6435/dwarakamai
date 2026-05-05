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
import { ServiceBookingsService } from './service-bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('service-bookings')
@UseGuards(JwtAuthGuard)
export class ServiceBookingsController {
  constructor(private bookingsService: ServiceBookingsService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.bookingsService.findAll(
      req.user.id,
      req.user.role === 'admin',
      page,
      limit,
    );
  }

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.bookingsService.create(req.user.id, data);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.bookingsService.update(id, data);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
