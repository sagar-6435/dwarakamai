# Dwarakamai NestJS Backend

A production-ready NestJS backend for the Dwarakamai e-commerce and service platform. Built with TypeScript, MongoDB, and Cloudinary.

## 🎯 Features

- **Authentication**: JWT-based authentication with role-based access control (User/Admin)
- **Product Management**: Full CRUD operations with pagination and category filtering
- **Order Management**: Order creation with stock management and user-specific access control
- **Service Booking**: User-friendly service booking system with admin management
- **Shopping Cart**: Cart operations (add, update, remove items) with real-time calculations
- **Image Management**: Cloudinary integration for image uploads and management
- **Gallery**: Image gallery management with categorization
- **Events**: Event management with date-based sorting
- **User Profile**: User registration, login, and profile management
- **Admin Panel**: Complete admin functionality with protected routes

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account

## 🚀 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/dwarakamai

   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=24h

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Frontend
   FRONTEND_URL=http://localhost:3000

   # Server
   PORT=5000
   ```

3. **Start the development server**:
   ```bash
   npm run start:dev
   ```

## 📁 Project Structure

```
src/
├── app.module.ts              # Root module
├── main.ts                    # Bootstrap entry point
├── auth/                      # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   └── auth.dto.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── admin.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── products/                  # Products module
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   └── dto/
│       └── product.dto.ts
├── categories/                # Categories module
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   ├── categories.module.ts
│   └── dto/
│       └── category.dto.ts
├── orders/                    # Orders module
│   ├── orders.controller.ts
│   ├── orders.service.ts
│   ├── orders.module.ts
│   └── dto/
│       └── order.dto.ts
├── services/                  # Services module
│   ├── services.controller.ts
│   ├── services.service.ts
│   ├── services.module.ts
│   └── dto/
│       └── service.dto.ts
├── cart/                      # Cart module
│   ├── cart.controller.ts
│   ├── cart.service.ts
│   ├── cart.module.ts
│   └── dto/
│       └── cart.dto.ts
├── service-bookings/          # Service bookings module
│   ├── service-bookings.controller.ts
│   ├── service-bookings.service.ts
│   ├── service-bookings.module.ts
│   └── dto/
│       └── service-booking.dto.ts
├── gallery/                   # Gallery module
│   ├── gallery.controller.ts
│   ├── gallery.service.ts
│   ├── gallery.module.ts
│   └── dto/
│       └── gallery.dto.ts
├── events/                    # Events module
│   ├── events.controller.ts
│   ├── events.service.ts
│   ├── events.module.ts
│   └── dto/
│       └── event.dto.ts
├── upload/                    # Upload module
│   ├── upload.controller.ts
│   ├── upload.service.ts
│   └── upload.module.ts
└── schemas/                   # MongoDB schemas
    ├── user.schema.ts
    ├── product.schema.ts
    ├── category.schema.ts
    ├── order.schema.ts
    ├── service.schema.ts
    ├── service-booking.schema.ts
    ├── gallery.schema.ts
    ├── event.schema.ts
    └── cart.schema.ts
```

## 🔐 Authentication

### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token for subsequent requests.

### Get Current User
```bash
GET /auth/me
Authorization: Bearer {token}
```

## 📦 API Endpoints

### Products
- `GET /products` - List all products (paginated)
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Categories
- `GET /categories` - List all categories
- `GET /categories/:id` - Get category details
- `POST /categories` - Create category (admin only)
- `PUT /categories/:id` - Update category (admin only)
- `DELETE /categories/:id` - Delete category (admin only)

### Orders
- `GET /orders` - List user's orders (authenticated)
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status (admin only)
- `DELETE /orders/:id` - Delete order (admin only)

### Services
- `GET /services` - List all services
- `GET /services/:id` - Get service details
- `POST /services` - Create service (admin only)
- `PUT /services/:id` - Update service (admin only)
- `DELETE /services/:id` - Delete service (admin only)

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove/:productId` - Remove item from cart
- `DELETE /cart/clear` - Clear entire cart

### Service Bookings
- `GET /service-bookings` - List bookings
- `POST /service-bookings` - Create booking
- `PUT /service-bookings/:id` - Update booking (admin only)
- `DELETE /service-bookings/:id` - Delete booking (admin only)

### Gallery
- `GET /gallery` - List gallery items
- `GET /gallery/:id` - Get gallery item
- `POST /gallery` - Create gallery item (admin only)
- `PUT /gallery/:id` - Update gallery item (admin only)
- `DELETE /gallery/:id` - Delete gallery item (admin only)

### Events
- `GET /events` - List events
- `GET /events/:id` - Get event details
- `POST /events` - Create event (admin only)
- `PUT /events/:id` - Update event (admin only)
- `DELETE /events/:id` - Delete event (admin only)

### Upload
- `POST /upload/image` - Upload single image (admin only)
- `POST /upload/images` - Upload multiple images (admin only)
- `DELETE /upload/image` - Delete image by publicId (admin only)

## 🔑 Key Decorators & Guards

### Route Decorators
```typescript
@Controller('route')          // Define controller route
@Get()                        // GET endpoint
@Post()                       // POST endpoint
@Put()                        // PUT endpoint (full update)
@Patch()                      // PATCH endpoint (partial update)
@Delete()                     // DELETE endpoint
```

### Guard Decorators
```typescript
@UseGuards(JwtAuthGuard)      // Require JWT authentication
@UseGuards(AdminGuard)        // Require admin role
@UseGuards(JwtAuthGuard, AdminGuard)  // Require both
```

### Parameter Decorators
```typescript
@Param('id')                  // URL parameter
@Query('page')                // Query string parameter
@Body()                       // Request body
@Request()                    // Express request object
```

## 📝 Data Validation

DTOs (Data Transfer Objects) use `class-validator` decorators:

```typescript
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  images?: string[];
}
```

## 🗄️ Database Models

### User
```typescript
{
  name: string,
  email: string (unique),
  phone: string,
  password: string (hashed),
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```typescript
{
  name: string,
  description: string,
  price: number,
  discountPrice: number,
  category: ObjectId,
  stock: number,
  images: string[],
  slug: string (unique),
  featured: boolean,
  active: boolean,
  specifications: object,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```typescript
{
  orderNumber: string (unique),
  customer: ObjectId,
  items: [{
    product: ObjectId,
    quantity: number,
    price: number
  }],
  totalAmount: number,
  status: 'pending' | 'processing' | 'shipped' | 'delivered',
  paymentStatus: 'pending' | 'completed' | 'failed',
  paymentMethod: 'cod' | 'card',
  shippingAddress: object,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build

# Production start
npm start

# Testing
npm test

# Linting
npm run lint
```

## 🔄 CORS Configuration

CORS is enabled with the following settings:
- **Origin**: Frontend URL from environment variable
- **Credentials**: Enabled
- **Methods**: GET, POST, PUT, DELETE, PATCH
- **Headers**: Content-Type, Authorization

## 🐛 Error Handling

Global error handling middleware returns standardized error responses:

```typescript
{
  "statusCode": 400,
  "message": "Error description",
  "error": "BadRequest"
}
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Cloudinary API Docs](https://cloudinary.com/documentation)
- [JWT Documentation](https://jwt.io)

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
