```
backend/
│
├── src/
│   ├── config/
│   │   ├── db.ts                    # MongoDB connection setup
│   │   └── cloudinary.ts            # Cloudinary configuration
│   │
│   ├── models/                      # Mongoose schemas and types
│   │   ├── User.ts                  # User authentication model
│   │   ├── Product.ts               # Product model
│   │   ├── Category.ts              # Category model
│   │   ├── Order.ts                 # Order model
│   │   ├── Service.ts               # Service model
│   │   ├── ServiceBooking.ts         # Service booking model
│   │   ├── Gallery.ts               # Gallery images model
│   │   ├── Event.ts                 # Event model
│   │   └── Cart.ts                  # Shopping cart model
│   │
│   ├── controllers/                 # Business logic
│   │   ├── authController.ts        # Login, Register, Auth
│   │   ├── productController.ts     # Product CRUD
│   │   ├── categoryController.ts    # Category CRUD
│   │   ├── orderController.ts       # Order management
│   │   ├── serviceController.ts     # Service CRUD
│   │   ├── serviceBookingController.ts  # Booking management
│   │   ├── galleryController.ts     # Gallery CRUD
│   │   ├── eventController.ts       # Event CRUD
│   │   ├── cartController.ts        # Cart operations
│   │   └── uploadController.ts      # Image upload
│   │
│   ├── routes/                      # API endpoints
│   │   ├── auth.ts                  # Auth routes
│   │   ├── products.ts              # Product routes
│   │   ├── categories.ts            # Category routes
│   │   ├── orders.ts                # Order routes
│   │   ├── services.ts              # Service routes
│   │   ├── serviceBookings.ts       # Booking routes
│   │   ├── gallery.ts               # Gallery routes
│   │   ├── events.ts                # Event routes
│   │   ├── cart.ts                  # Cart routes
│   │   └── upload.ts                # Upload routes
│   │
│   ├── middleware/
│   │   ├── auth.ts                  # JWT authentication & authorization
│   │   └── errorHandler.ts          # Error handling & async wrapper
│   │
│   └── server.ts                    # Main Express server
│
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── README.md                        # Complete API documentation
├── FRONTEND_INTEGRATION.md          # Frontend integration guide
├── API_TESTING.md                   # API testing examples
├── SETUP_COMPLETE.md                # Setup completion guide
└── FILE_STRUCTURE.md                # This file
```

## File Descriptions

### Configuration Files

**src/config/db.ts**
- Connects to MongoDB using Mongoose
- Exports connection function

**src/config/cloudinary.ts**
- Configures Cloudinary for image storage
- Sets up cloud credentials

### Models (src/models/)

Each file defines a MongoDB schema with TypeScript types:

- **User.ts** - User accounts, authentication, roles
- **Product.ts** - Store products with pricing, stock
- **Category.ts** - Product categories
- **Order.ts** - Customer orders with items and status
- **Service.ts** - Services offered (photography, etc.)
- **ServiceBooking.ts** - Service bookings by customers
- **Gallery.ts** - Gallery images/portfolio
- **Event.ts** - Events and announcements
- **Cart.ts** - User shopping carts

### Controllers (src/controllers/)

Handle business logic for each feature:

- **authController.ts**
  - register() - Create new user
  - login() - User login
  - getCurrentUser() - Get logged-in user
  - updateProfile() - Update user profile

- **productController.ts**
  - getProducts() - List products with filtering
  - getProductById() - Get single product
  - createProduct() - Create (Admin)
  - updateProduct() - Update (Admin)
  - deleteProduct() - Delete (Admin)

- **categoryController.ts** - Category CRUD operations
- **orderController.ts** - Order creation and management
- **serviceController.ts** - Service CRUD operations
- **serviceBookingController.ts** - Manage service bookings
- **galleryController.ts** - Gallery image management
- **eventController.ts** - Event CRUD operations
- **cartController.ts** - Shopping cart operations

### Routes (src/routes/)

Define API endpoints for each resource:

- **auth.ts** - Authentication endpoints
- **products.ts** - Product endpoints
- **categories.ts** - Category endpoints
- **orders.ts** - Order endpoints
- **services.ts** - Service endpoints
- **serviceBookings.ts** - Booking endpoints
- **gallery.ts** - Gallery endpoints
- **events.ts** - Event endpoints
- **cart.ts** - Cart endpoints
- **upload.ts** - File upload endpoints

### Middleware (src/middleware/)

**auth.ts**
- authMiddleware() - Verify JWT token
- adminMiddleware() - Check admin role
- optionalAuthMiddleware() - Optional authentication

**errorHandler.ts**
- errorHandler() - Global error handling
- asyncHandler() - Async error wrapper

### Main Server (src/server.ts)

- Express app initialization
- CORS configuration
- Middleware setup
- Route mounting
- Error handling
- Server startup on PORT

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create (Admin)
- `PUT /api/products/:id` - Update (Admin)
- `DELETE /api/products/:id` - Delete (Admin)

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:id` - Get category
- `POST /api/categories` - Create (Admin)
- `PUT /api/categories/:id` - Update (Admin)
- `DELETE /api/categories/:id` - Delete (Admin)

### Orders
- `GET /api/orders` - List user orders (Protected)
- `GET /api/orders/:id` - Get order (Protected)
- `POST /api/orders` - Create order (Protected)
- `PUT /api/orders/:id` - Update status (Admin)
- `DELETE /api/orders/:id` - Delete (Admin)

### Services
- `GET /api/services` - List services
- `GET /api/services/:id` - Get service
- `POST /api/services` - Create (Admin)
- `PUT /api/services/:id` - Update (Admin)
- `DELETE /api/services/:id` - Delete (Admin)

### Service Bookings
- `GET /api/service-bookings` - List bookings (Protected)
- `POST /api/service-bookings` - Create booking (Protected)
- `PUT /api/service-bookings/:id` - Update (Admin)
- `DELETE /api/service-bookings/:id` - Delete (Admin)

### Gallery
- `GET /api/gallery` - List gallery
- `GET /api/gallery/:id` - Get item
- `POST /api/gallery` - Create (Admin)
- `PUT /api/gallery/:id` - Update (Admin)
- `DELETE /api/gallery/:id` - Delete (Admin)

### Events
- `GET /api/events` - List events
- `GET /api/events/:id` - Get event
- `POST /api/events` - Create (Admin)
- `PUT /api/events/:id` - Update (Admin)
- `DELETE /api/events/:id` - Delete (Admin)

### Shopping Cart
- `GET /api/cart` - Get cart (Protected)
- `POST /api/cart/add` - Add item (Protected)
- `PUT /api/cart/update` - Update item (Protected)
- `DELETE /api/cart/remove/:productId` - Remove item (Protected)
- `DELETE /api/cart/clear` - Clear cart (Protected)

### Upload
- `POST /api/upload` - Upload image (Admin)
- `DELETE /api/upload` - Delete image (Admin)

## Data Flow

### User Registration/Login
1. User submits credentials via frontend
2. authController validates input
3. Password hashed with bcryptjs
4. JWT token generated
5. Token returned to frontend
6. Frontend stores token in localStorage

### Product Purchase
1. User adds products to cart
2. Cart stored in database per user
3. User proceeds to checkout
4. Order created with items
5. Stock reduced automatically
6. Order stored with status 'pending'
7. Admin can view/update order

### Image Upload
1. Admin selects image file
2. Multer receives file in memory
3. File converted to base64
4. Uploaded to Cloudinary
5. Secure URL returned
6. URL saved to database

## Development Tips

### Adding a New Feature

1. **Create Model** (src/models/Feature.ts)
2. **Create Controller** (src/controllers/featureController.ts)
3. **Create Routes** (src/routes/feature.ts)
4. **Mount Routes** in src/server.ts
5. **Test** with API client

### Error Handling

All errors automatically caught and returned as JSON:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Authentication

Protected routes use authMiddleware:
```typescript
router.get('/', authMiddleware, getUser);
```

Admin routes also use adminMiddleware:
```typescript
router.post('/', authMiddleware, adminMiddleware, createItem);
```

### Database Operations

All CRUD operations use Mongoose:
```typescript
await Model.findById(id);
await Model.create(data);
await Model.findByIdAndUpdate(id, data);
await Model.findByIdAndDelete(id);
```

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Images**: Cloudinary
- **Uploads**: Multer
- **CORS**: cors package
- **Validation**: express-validator

## Deployment

### Environment Setup

Set these in your hosting platform:
- MONGODB_URI
- JWT_SECRET
- CLOUDINARY_* credentials
- FRONTEND_URL

### Build & Run

```bash
npm run build    # Compile TypeScript
npm start        # Run compiled code
```

Supports:
- Heroku
- AWS
- DigitalOcean
- Vercel Functions
- Any Node.js hosting

## Performance Considerations

- Pagination supported on all list endpoints
- Database indexes on frequently searched fields
- Cloudinary for optimized image delivery
- JWT for stateless authentication
- Mongoose lean queries for read-only operations

## Security Features

✅ Password hashing with salt
✅ JWT token verification
✅ Role-based access control
✅ CORS protection
✅ Input validation
✅ SQL injection protection (MongoDB)
✅ XSS prevention with CORS

---

**For more information:**
- API Documentation: See README.md
- Frontend Integration: See FRONTEND_INTEGRATION.md
- API Testing: See API_TESTING.md
