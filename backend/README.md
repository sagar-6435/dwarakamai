# Dwaraka Mai Digital Studio - Backend API

A comprehensive Node.js/Express backend for a digital studio e-commerce and service booking platform with MongoDB and Cloudinary integration.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Product Management**: CRUD operations for products with categories
- **Order Management**: Complete order lifecycle management
- **Service Management**: Service listings and bookings
- **Gallery Management**: Image gallery with Cloudinary integration
- **Event Management**: Event creation and management
- **Shopping Cart**: User cart management with product stock tracking
- **Image Upload**: Cloudinary-powered image uploads

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

## Installation

1. **Clone or setup the backend folder**
```bash
cd backend
npm install
```

2. **Create `.env` file** (based on `.env.example`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dwarakamai
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=your-stripe-key-optional
FRONTEND_URL=http://localhost:3000
```

3. **Start the server**
```bash
npm run dev       # Development mode
npm run build     # Build TypeScript
npm start         # Production mode
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

#### Register
- **POST** `/api/auth/register`
- **Body**: `{ name, email, phone?, password }`
- **Response**: User object with JWT token

#### Login
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: User object with JWT token

#### Get Current User
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Current user details

#### Update Profile
- **PUT** `/api/auth/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ name?, phone?, address? }`
- **Response**: Updated user profile

### Products (`/api/products`)

#### Get Products
- **GET** `/api/products`
- **Query**: `category?`, `featured?`, `page?`, `limit?`
- **Response**: Paginated products list

#### Get Single Product
- **GET** `/api/products/:id`
- **Response**: Product details

#### Create Product (Admin)
- **POST** `/api/products`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ name, description, category, price, discountPrice?, stock, images?, specifications? }`
- **Response**: Created product

#### Update Product (Admin)
- **PUT** `/api/products/:id`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: Same as create (partial updates allowed)

#### Delete Product (Admin)
- **DELETE** `/api/products/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Categories (`/api/categories`)

#### Get Categories
- **GET** `/api/categories`

#### Get Single Category
- **GET** `/api/categories/:id`

#### Create Category (Admin)
- **POST** `/api/categories`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ name, description?, image? }`

#### Update Category (Admin)
- **PUT** `/api/categories/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

#### Delete Category (Admin)
- **DELETE** `/api/categories/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Orders (`/api/orders`)

#### Get Orders
- **GET** `/api/orders`
- **Headers**: `Authorization: Bearer {token}`
- **Query**: `status?`, `page?`, `limit?`
- **Note**: Users see only their orders, admins see all

#### Get Single Order
- **GET** `/api/orders/:id`
- **Headers**: `Authorization: Bearer {token}`

#### Create Order
- **POST** `/api/orders`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
```json
{
  "items": [
    { "product": "product_id", "quantity": 2 }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country",
    "phone": "9876543210"
  },
  "paymentMethod": "cod|card|upi|bank_transfer",
  "notes": "optional notes"
}
```

#### Update Order Status (Admin)
- **PUT** `/api/orders/:id`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ status?, paymentStatus? }`

#### Delete Order (Admin)
- **DELETE** `/api/orders/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Services (`/api/services`)

#### Get Services
- **GET** `/api/services`
- **Query**: `category?`, `featured?`, `page?`, `limit?`

#### Get Single Service
- **GET** `/api/services/:id`

#### Create Service (Admin)
- **POST** `/api/services`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ name, description?, price?, duration?, features?, images?, category? }`

#### Update Service (Admin)
- **PUT** `/api/services/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

#### Delete Service (Admin)
- **DELETE** `/api/services/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Service Bookings (`/api/service-bookings`)

#### Get Bookings
- **GET** `/api/service-bookings`
- **Headers**: `Authorization: Bearer {token}`

#### Create Service Booking
- **POST** `/api/service-bookings`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
```json
{
  "service": "service_id",
  "bookingDate": "2024-12-25",
  "preferredTime": "10:00 AM",
  "notes": "optional notes",
  "contact": {
    "phone": "9876543210",
    "email": "user@example.com"
  }
}
```

#### Update Booking (Admin)
- **PUT** `/api/service-bookings/:id`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ status?, notes? }`

#### Delete Booking (Admin)
- **DELETE** `/api/service-bookings/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Gallery (`/api/gallery`)

#### Get Gallery
- **GET** `/api/gallery`
- **Query**: `category?`, `page?`, `limit?`

#### Get Single Gallery Item
- **GET** `/api/gallery/:id`

#### Create Gallery Item (Admin)
- **POST** `/api/gallery`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ title, description?, image, category?, displayOrder? }`

#### Update Gallery Item (Admin)
- **PUT** `/api/gallery/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

#### Delete Gallery Item (Admin)
- **DELETE** `/api/gallery/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Events (`/api/events`)

#### Get Events
- **GET** `/api/events`
- **Query**: `category?`, `featured?`, `page?`, `limit?`

#### Get Single Event
- **GET** `/api/events/:id`

#### Create Event (Admin)
- **POST** `/api/events`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ title, description?, date, location?, image?, category?, capacity? }`

#### Update Event (Admin)
- **PUT** `/api/events/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

#### Delete Event (Admin)
- **DELETE** `/api/events/:id`
- **Headers**: `Authorization: Bearer {admin-token}`

### Shopping Cart (`/api/cart`)

#### Get Cart
- **GET** `/api/cart`
- **Headers**: `Authorization: Bearer {token}`

#### Add to Cart
- **POST** `/api/cart/add`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ productId, quantity }`

#### Update Cart Item
- **PUT** `/api/cart/update`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ productId, quantity }`

#### Remove from Cart
- **DELETE** `/api/cart/remove/:productId`
- **Headers**: `Authorization: Bearer {token}`

#### Clear Cart
- **DELETE** `/api/cart/clear`
- **Headers**: `Authorization: Bearer {token}`

### Image Upload (`/api/upload`)

#### Upload Image (Admin)
- **POST** `/api/upload`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: Form data with `file` field
- **Response**: `{ url, publicId }`

#### Delete Image (Admin)
- **DELETE** `/api/upload`
- **Headers**: `Authorization: Bearer {admin-token}`
- **Body**: `{ publicId }`

## Database Models

### User
- `name`: String (required)
- `email`: String (required, unique)
- `phone`: String
- `password`: String (hashed)
- `role`: 'user' | 'admin'
- `profileImage`: String
- `address`: Object (street, city, state, zipCode, country)

### Product
- `name`: String
- `slug`: String (unique)
- `description`: String
- `category`: ObjectId (ref: Category)
- `price`: Number
- `discountPrice`: Number
- `stock`: Number
- `images`: [String]
- `specifications`: Object
- `featured`: Boolean
- `active`: Boolean

### Category
- `name`: String
- `slug`: String
- `description`: String
- `image`: String

### Order
- `orderNumber`: String (unique)
- `customer`: ObjectId (ref: User)
- `items`: Array of {product, quantity, price}
- `totalAmount`: Number
- `discountAmount`: Number
- `shippingAddress`: Object
- `status`: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
- `paymentStatus`: 'pending' | 'completed' | 'failed'
- `paymentMethod`: 'card' | 'upi' | 'bank_transfer' | 'cod'

### Service
- `name`: String
- `slug`: String
- `description`: String
- `price`: Number
- `duration`: String
- `features`: [String]
- `images`: [String]
- `category`: String
- `featured`: Boolean
- `active`: Boolean

### ServiceBooking
- `user`: ObjectId (ref: User)
- `service`: ObjectId (ref: Service)
- `bookingDate`: Date
- `preferredTime`: String
- `status`: 'pending' | 'confirmed' | 'completed' | 'cancelled'
- `notes`: String
- `contact`: {phone, email}

### Gallery
- `title`: String
- `description`: String
- `image`: String
- `category`: String
- `displayOrder`: Number
- `active`: Boolean

### Event
- `title`: String
- `description`: String
- `date`: Date
- `location`: String
- `image`: String
- `category`: String
- `capacity`: Number
- `registrations`: Number
- `featured`: Boolean
- `active`: Boolean

### Cart
- `user`: ObjectId (ref: User)
- `items`: Array of {product, quantity}
- `totalPrice`: Number

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. 

1. Register or login to get a token
2. Include the token in the `Authorization` header as: `Authorization: Bearer {token}`
3. The token expires according to `JWT_EXPIRE` setting

## Error Handling

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not found
- `500`: Server error

## CORS Configuration

The API is configured to accept requests from the frontend URL specified in the `FRONTEND_URL` environment variable. Update this based on your deployment.

## Cloudinary Integration

Images are stored in Cloudinary under the `dwarakamai` folder. Make sure your Cloudinary credentials are set up correctly in the `.env` file.

## Development

The project uses TypeScript for type safety. To compile TypeScript:
```bash
npm run build
```

## Deployment

1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Run: `npm start`

Supported hosting platforms:
- Heroku
- AWS
- DigitalOcean
- Vercel (with serverless functions)
- Any Node.js hosting

## Support

For issues or questions, refer to the API documentation above or check the source code in the respective controller files.
