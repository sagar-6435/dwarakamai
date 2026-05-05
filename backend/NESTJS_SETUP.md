# NestJS Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/dwarakamai

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=24h

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend
FRONTEND_URL=http://localhost:3000

# Server
PORT=5000
NODE_ENV=development
```

### 3. Start the Development Server
```bash
npm run start:dev
```

The server will start on `http://localhost:5000`

## Module Structure

Each feature module follows the NestJS pattern:

```
feature/
├── feature.controller.ts    # HTTP endpoints
├── feature.service.ts       # Business logic
├── feature.module.ts        # Module definition
└── dto/
    └── feature.dto.ts       # Data validation
```

### Module Registration
All modules are imported in `app.module.ts`:
- AuthModule
- ProductsModule
- CategoriesModule
- OrdersModule
- ServicesModule
- CartModule
- ServiceBookingsModule
- GalleryModule
- EventsModule
- UploadModule

## Authentication Flow

1. **Register** → POST `/auth/register`
   - Create new user account
   - Password is hashed with bcryptjs
   - Returns JWT token

2. **Login** → POST `/auth/login`
   - Verify credentials
   - Generate JWT token
   - Token included in response

3. **Use Token** → Include in Authorization header
   ```
   Authorization: Bearer <token>
   ```

4. **Token Validation** → JwtAuthGuard
   - Automatically validates token
   - Extracts user info
   - Throws 401 if invalid

## Guards & Decorators

### Authentication Guard
```typescript
@UseGuards(JwtAuthGuard)
findAll() { }
```
- Validates JWT token
- Requires Authorization header

### Admin Guard
```typescript
@UseGuards(JwtAuthGuard, AdminGuard)
create() { }
```
- Checks user.role === 'admin'
- Returns 403 if not admin

## API Testing

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","phone":"9876543210","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get current user (protected)
curl -X GET http://localhost:5000/auth/me \
  -H "Authorization: Bearer <your_token>"
```

### Using Postman
1. Create new request
2. Set method to GET/POST/PUT/DELETE
3. Enter URL: `http://localhost:5000/endpoint`
4. For protected routes, add Authorization header:
   - Type: Bearer Token
   - Token: `<your_jwt_token>`
5. Add JSON body if needed

## Database Connection

MongoDB connection happens automatically via Mongoose module in `app.module.ts`:

```typescript
MongooseModule.forRoot(process.env.MONGODB_URI)
```

### Schemas
All schemas are defined in `src/schemas/`:
- User
- Product
- Category
- Order
- Service
- ServiceBooking
- Gallery
- Event
- Cart

## Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add to `.env` file
4. Images are stored in `/dwarakamai` folder

## File Upload

### Single Image
```bash
curl -X POST http://localhost:5000/upload/image \
  -H "Authorization: Bearer <token>" \
  -F "file=@image.jpg" \
  -F "folder=dwarakamai"
```

### Multiple Images
```bash
curl -X POST http://localhost:5000/upload/images \
  -H "Authorization: Bearer <token>" \
  -F "files=@image1.jpg" \
  -F "files=@image2.jpg" \
  -F "folder=dwarakamai"
```

## Pagination

Query parameters for paginated endpoints:
```
GET /products?page=1&limit=10
GET /orders?page=2&limit=20
GET /services?page=1&limit=15
```

Default: page=1, limit=10

## Error Responses

All endpoints return consistent error format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "BadRequest"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Performance Tips

1. **Use pagination** to avoid large dataset transfers
2. **Populate relationships** only when needed
3. **Index frequently queried fields** in MongoDB
4. **Cache Cloudinary URLs** on frontend
5. **Use HTTP compression** in production

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Update `.env` with production values:
- Use strong JWT_SECRET
- Use MongoDB Atlas URI
- Update FRONTEND_URL to production domain
- Set NODE_ENV=production

### Run Production Build
```bash
npm start
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using Atlas

### JWT Token Errors
- Ensure JWT_SECRET is set
- Check token expiration time
- Verify Authorization header format

### Cloudinary Upload Errors
- Verify credentials in .env
- Check file size limits
- Ensure file is a valid image

### CORS Errors
- Check FRONTEND_URL in .env
- Verify frontend is making correct requests
- Check browser console for error details

## Development Workflow

1. **Create/modify DTOs** in `feature/dto/`
2. **Implement logic** in `feature.service.ts`
3. **Create endpoints** in `feature.controller.ts`
4. **Register in module** in `feature.module.ts`
5. **Test with Postman/cURL**
6. **Check for validation errors**

## Security Best Practices

1. ✅ Passwords hashed with bcryptjs (10 salt rounds)
2. ✅ JWT tokens with expiry
3. ✅ Role-based access control (Admin guard)
4. ✅ CORS enabled for frontend only
5. ✅ Environment variables for secrets
6. ✅ Input validation with class-validator

**Production Considerations:**
- Use HTTPS only
- Set secure cookie flags
- Implement rate limiting
- Add request logging
- Use environment-specific secrets

## Contact & Support

For issues or questions, refer to:
- [NestJS Docs](https://docs.nestjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Cloudinary Docs](https://cloudinary.com/documentation)
