import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceBooking, ServiceBookingSchema } from '../schemas/service-booking.schema';
import { Service, ServiceSchema } from '../schemas/service.schema';
import { ServiceBookingsService } from './service-bookings.service';
import { ServiceBookingsController } from './service-bookings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceBooking.name, schema: ServiceBookingSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  providers: [ServiceBookingsService],
  controllers: [ServiceBookingsController],
})
export class ServiceBookingsModule {}
