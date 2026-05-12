import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ServicesModule } from './services/services.module';
import { GalleryModule } from './gallery/gallery.module';
import { EventsModule } from './events/events.module';
import { CartModule } from './cart/cart.module';
import { ServiceBookingsModule } from './service-bookings/service-bookings.module';
import { UploadModule } from './upload/upload.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/dwarakamai'),
    SeedModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    ServicesModule,
    GalleryModule,
    EventsModule,
    CartModule,
    ServiceBookingsModule,
    UploadModule,
  ],
})
export class AppModule {}
