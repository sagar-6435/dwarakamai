# API Testing Guide

## Prerequisites

Install one of these tools:
- [Postman](https://www.postman.com/) - GUI tool
- [REST Client VS Code Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - VS Code extension
- [curl](https://curl.se/) - Command line

## Quick Test Setup

1. Start backend: `npm run dev` (runs on http://localhost:5000)
2. Use the examples below to test endpoints

## REST Client Examples

Create a file `test.http` in your backend folder and use VS Code REST Client extension:

```http
### Health Check
GET http://localhost:5000/health

### Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

@authToken = YOUR_TOKEN_HERE

### Get Current User
GET http://localhost:5000/api/auth/me
Authorization: Bearer @authToken

### Get Products
GET http://localhost:5000/api/products?page=1&limit=10

### Get Single Product
GET http://localhost:5000/api/products/PRODUCT_ID

### Get Categories
GET http://localhost:5000/api/categories

### Get Services
GET http://localhost:5000/api/services?page=1&limit=10

### Get Gallery
GET http://localhost:5000/api/gallery?page=1&limit=12

### Get Events
GET http://localhost:5000/api/events?page=1&limit=10

### Get Cart
GET http://localhost:5000/api/cart
Authorization: Bearer @authToken

### Add to Cart
POST http://localhost:5000/api/cart/add
Authorization: Bearer @authToken
Content-Type: application/json

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

### Update Cart Item
PUT http://localhost:5000/api/cart/update
Authorization: Bearer @authToken
Content-Type: application/json

{
  "productId": "PRODUCT_ID",
  "quantity": 3
}

### Remove from Cart
DELETE http://localhost:5000/api/cart/remove/PRODUCT_ID
Authorization: Bearer @authToken

### Create Order
POST http://localhost:5000/api/orders
Authorization: Bearer @authToken
Content-Type: application/json

{
  "items": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "9876543210"
  },
  "paymentMethod": "cod"
}

### Get Orders
GET http://localhost:5000/api/orders
Authorization: Bearer @authToken

### Book Service
POST http://localhost:5000/api/service-bookings
Authorization: Bearer @authToken
Content-Type: application/json

{
  "service": "SERVICE_ID",
  "bookingDate": "2024-12-25",
  "preferredTime": "10:00 AM",
  "notes": "I would like to book this service",
  "contact": {
    "phone": "9876543210",
    "email": "john@example.com"
  }
}

### Get Service Bookings
GET http://localhost:5000/api/service-bookings
Authorization: Bearer @authToken
```

## Postman Collection

### Step 1: Create Collection
1. Open Postman
2. Click "Collections" → "+" → "New Collection"
3. Name it "Dwaraka Mai API"

### Step 2: Add Requests
Create folders:
- Auth
- Products
- Orders
- Services
- Gallery
- Events
- Cart

### Step 3: Set Variables
1. In collection settings, go to "Variables"
2. Add variable: `baseUrl` = `http://localhost:5000/api`
3. Add variable: `token` = (leave empty, will be set after login)

### Step 4: Use in Requests
Replace hard-coded URLs with `{{baseUrl}}`
Example: `{{baseUrl}}/products`

### Step 5: Save Token After Login
In login request:
1. Go to "Tests" tab
2. Add:
```javascript
if (pm.response.code === 200) {
    pm.environment.set("token", pm.response.json().token);
}
```

## cURL Examples

```bash
# Health Check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Products
curl http://localhost:5000/api/products

# Get User (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/me

# Create Order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{\n    "items": [{"product": "PRODUCT_ID", "quantity": 1}],\n    "shippingAddress": {"street": "123 Main", "city": "NYC", "state": "NY", "zipCode": "10001", "country": "USA", "phone": "9876543210"},\n    "paymentMethod": "cod"\n  }'
```

## Test Data

Create this test data first:

### 1. Create Admin User (using register endpoint)
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123"
}
```

Then manually update role to 'admin' in MongoDB:
```javascript
db.users.updateOne({email: "admin@example.com"}, {$set: {role: "admin"}})
```

### 2. Create Category (Admin)
```json
{
  "name": "Gifts",
  "description": "Personalized gifts and memorabilia",
  "image": "https://example.com/gifts.jpg"
}
```

### 3. Create Product (Admin)
```json
{
  "name": "Personalized Crystal Gift",
  "description": "Beautiful personalized crystal gift",
  "category": "CATEGORY_ID",
  "price": 1499,
  "stock": 50,
  "images": ["https://example.com/crystal.jpg"],
  "specifications": {
    "material": "Crystal",
    "size": "5x5 inches"
  }
}
```

### 4. Create Service (Admin)
```json
{
  "name": "Professional Photography",
  "description": "Professional photography services",
  "price": 5000,
  "duration": "2 hours",
  "features": ["Editing", "Prints", "Digital copies"],
  "images": ["https://example.com/photo.jpg"],
  "category": "Photography"
}
```

## Common Responses

### Success (200)
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Created (201)
```json
{
  "message": "Resource created successfully",
  "product": { ... }
}
```

### Error (400/401/403)
```json
{
  "success": false,
  "message": "Error description"
}
```

## Troubleshooting

### CORS Error
- Check `FRONTEND_URL` in backend `.env`
- Ensure backend is running on correct port

### 401 Unauthorized
- Check token is valid
- Token might have expired

### 404 Not Found
- Check ID exists in database
- Check URL spelling

### 500 Server Error
- Check backend console for errors
- Verify database connection
- Check `.env` variables

## Next Steps

After testing all endpoints:
1. Create frontend integration layer
2. Set up state management
3. Implement error handling in frontend
4. Add loading states
5. Test full user workflows
