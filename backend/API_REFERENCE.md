# Dwarakamai NestJS API Testing Guide

## Complete API Endpoint Reference with Examples

### Base URL
```
http://localhost:5000
```

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

### 2. Login
**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. Get Current User
**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Update Profile
**Endpoint:** `PUT /auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "John Updated",
  "phone": "9988776655"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "9988776655",
    "role": "user"
  }
}
```

---

## Products Endpoints

### 1. Get All Products
**Endpoint:** `GET /products`

**Query Parameters:**
```
page=1&limit=10&category=electronics
```

**Response (200 OK):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Wireless Earbuds",
      "description": "High-quality wireless earbuds",
      "price": 2999,
      "discountPrice": 2499,
      "stock": 50,
      "category": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Electronics"
      },
      "slug": "wireless-earbuds",
      "images": ["https://cloudinary.com/image1.jpg"],
      "featured": true,
      "active": true
    }
  ],
  "pagination": {
    "total": 45,
    "pages": 5,
    "current": 1
  }
}
```

### 2. Get Product by ID
**Endpoint:** `GET /products/:id`

**Response (200 OK):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Wireless Earbuds",
    "description": "High-quality wireless earbuds",
    "price": 2999,
    "discountPrice": 2499,
    "stock": 50,
    "category": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Electronics"
    },
    "slug": "wireless-earbuds",
    "images": ["https://cloudinary.com/image1.jpg"],
    "featured": true,
    "active": true,
    "specifications": {
      "warranty": "1 year",
      "battery": "20 hours"
    }
  }
}
```

### 3. Create Product (Admin Only)
**Endpoint:** `POST /products`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Wireless Earbuds",
  "description": "High-quality wireless earbuds with ANC",
  "category": "507f1f77bcf86cd799439013",
  "price": 2999,
  "discountPrice": 2499,
  "stock": 100,
  "images": ["https://cloudinary.com/image1.jpg"],
  "specifications": {
    "warranty": "1 year",
    "battery": "20 hours"
  }
}
```

**Response (201 Created):**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Wireless Earbuds",
    "slug": "wireless-earbuds",
    "price": 2999,
    "stock": 100,
    "active": true
  }
}
```

### 4. Update Product (Admin Only)
**Endpoint:** `PUT /products/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request:**
```json
{
  "price": 2899,
  "stock": 150
}
```

**Response (200 OK):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "price": 2899,
    "stock": 150
  }
}
```

### 5. Delete Product (Admin Only)
**Endpoint:** `DELETE /products/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Orders Endpoints

### 1. Get All Orders
**Endpoint:** `GET /orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
page=1&limit=10
```

**Response (200 OK):**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "orderNumber": "ORD-1705329000000-123",
      "customer": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [
        {
          "product": {
            "_id": "507f1f77bcf86cd799439012",
            "name": "Wireless Earbuds"
          },
          "quantity": 1,
          "price": 2999
        }
      ],
      "totalAmount": 2999,
      "status": "pending",
      "paymentStatus": "pending",
      "paymentMethod": "cod",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "pages": 1,
    "current": 1
  }
}
```

### 2. Get Order by ID
**Endpoint:** `GET /orders/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439020",
    "orderNumber": "ORD-1705329000000-123",
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe"
    },
    "items": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Wireless Earbuds",
          "price": 2999
        },
        "quantity": 1,
        "price": 2999
      }
    ],
    "totalAmount": 2999,
    "status": "pending",
    "paymentStatus": "pending",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }
}
```

### 3. Create Order
**Endpoint:** `POST /orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "items": [
    {
      "product": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "cod"
}
```

**Response (201 Created):**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439020",
    "orderNumber": "ORD-1705329000000-456",
    "totalAmount": 5998,
    "status": "pending",
    "paymentStatus": "pending"
  }
}
```

### 4. Update Order Status (Admin Only)
**Endpoint:** `PUT /orders/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request:**
```json
{
  "status": "shipped",
  "paymentStatus": "completed"
}
```

**Response (200 OK):**
```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "shipped",
    "paymentStatus": "completed"
  }
}
```

---

## Cart Endpoints

### 1. Get Cart
**Endpoint:** `GET /cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "cart": {
    "_id": "507f1f77bcf86cd799439030",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Wireless Earbuds",
          "price": 2999
        },
        "quantity": 2
      }
    ],
    "totalPrice": 5998
  }
}
```

### 2. Add to Cart
**Endpoint:** `POST /cart/add`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 1
}
```

**Response (200 OK):**
```json
{
  "message": "Item added to cart",
  "cart": {
    "items": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Wireless Earbuds"
        },
        "quantity": 3
      }
    ],
    "totalPrice": 8997
  }
}
```

### 3. Update Cart Item
**Endpoint:** `PUT /cart/update`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 5
}
```

**Response (200 OK):**
```json
{
  "message": "Cart updated",
  "cart": {
    "totalPrice": 14995
  }
}
```

### 4. Remove from Cart
**Endpoint:** `DELETE /cart/remove/:productId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Item removed from cart",
  "cart": {
    "items": [],
    "totalPrice": 0
  }
}
```

### 5. Clear Cart
**Endpoint:** `DELETE /cart/clear`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Cart cleared",
  "cart": {
    "items": [],
    "totalPrice": 0
  }
}
```

---

## Service Bookings Endpoints

### 1. Get Bookings
**Endpoint:** `GET /service-bookings`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe"
      },
      "service": {
        "_id": "507f1f77bcf86cd799439050",
        "name": "Wedding Planning",
        "price": 50000
      },
      "date": "2024-02-20",
      "time": "10:00",
      "status": "pending",
      "notes": "Large wedding with 200 guests"
    }
  ]
}
```

### 2. Create Booking
**Endpoint:** `POST /service-bookings`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "service": "507f1f77bcf86cd799439050",
  "date": "2024-02-20",
  "time": "10:00",
  "notes": "Large wedding with 200 guests"
}
```

**Response (201 Created):**
```json
{
  "message": "Service booking created successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439040",
    "status": "pending"
  }
}
```

---

## Upload Endpoints

### 1. Upload Single Image
**Endpoint:** `POST /upload/image`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
file: <image_file>
folder: dwarakamai
```

**Response (200 OK):**
```json
{
  "message": "Image uploaded successfully",
  "url": "https://res.cloudinary.com/dwarakamai/image/upload/v1705329000/dwarakamai/abcd1234.jpg",
  "publicId": "dwarakamai/abcd1234"
}
```

### 2. Upload Multiple Images
**Endpoint:** `POST /upload/images`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
files: <image_file_1>
files: <image_file_2>
files: <image_file_3>
folder: dwarakamai
```

**Response (200 OK):**
```json
{
  "message": "3 images uploaded successfully",
  "images": [
    {
      "url": "https://res.cloudinary.com/dwarakamai/image/upload/v1705329000/dwarakamai/image1.jpg",
      "publicId": "dwarakamai/image1"
    },
    {
      "url": "https://res.cloudinary.com/dwarakamai/image/upload/v1705329000/dwarakamai/image2.jpg",
      "publicId": "dwarakamai/image2"
    }
  ]
}
```

### 3. Delete Image
**Endpoint:** `DELETE /upload/image`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request:**
```json
{
  "publicId": "dwarakamai/abcd1234"
}
```

**Response (200 OK):**
```json
{
  "message": "Image deleted successfully"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed: Password is too weak",
  "error": "BadRequest"
}
```

### 401 - Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid or expired token",
  "error": "Unauthorized"
}
```

### 403 - Forbidden
```json
{
  "statusCode": 403,
  "message": "Admin access required",
  "error": "Forbidden"
}
```

### 404 - Not Found
```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "NotFound"
}
```

### 500 - Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "InternalServerError"
}
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "phone": "9876543210",
    "password": "pass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "pass123"
  }'
```

### Get Protected Endpoint
```bash
curl -X GET http://localhost:5000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Product (as Admin)
```bash
curl -X POST http://localhost:5000/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "price": 1000,
    "category": "507f1f77bcf86cd799439013"
  }'
```

### Upload Image
```bash
curl -X POST http://localhost:5000/upload/image \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "folder=dwarakamai"
```

---

## Testing with Postman

1. **Create Environment**
   - Add variable: `baseUrl` = `http://localhost:5000`
   - Add variable: `token` = (leave empty initially)

2. **Authentication Flow**
   - Register → Login → Copy token to environment
   - Add to Headers: `Authorization: Bearer {{token}}`

3. **Test Collections**
   - Create folders for each module
   - Add requests with proper headers and body
   - Use environment variables for reusability

---

## Pagination Examples

### Get page 2 with 20 items per page
```
GET /products?page=2&limit=20
```

### Filter by category and paginate
```
GET /products?page=1&limit=10&category=electronics
```

### Get orders page 3
```
GET /orders?page=3&limit=15
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Passwords must be at least 6 characters
- Phone numbers should be valid format
- Tokens expire in 24 hours
- Stock is automatically decremented when orders are created
- Cart totals are calculated automatically
