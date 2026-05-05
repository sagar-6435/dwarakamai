# Frontend Integration Guide

This guide helps you integrate the Next.js frontend with the Node.js/Express backend API.

## Setup

1. **Create `.env.local` in the frontend folder**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

2. **Install required dependencies**:
```bash
npm install axios
```

## API Client Setup

Create `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

## Usage Examples

### Authentication

```typescript
import apiClient from '@/lib/api';

// Register
const register = async (name, email, password) => {
  const res = await apiClient.post('/auth/register', { name, email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

// Login
const login = async (email, password) => {
  const res = await apiClient.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

// Get current user
const getCurrentUser = async () => {
  const res = await apiClient.get('/auth/me');
  return res.data.user;
};
```

### Products

```typescript
// Get products
const getProducts = async (page = 1, limit = 10, category = null) => {
  const res = await apiClient.get('/products', {
    params: { page, limit, category },
  });
  return res.data;
};

// Get single product
const getProduct = async (id) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data.product;
};

// Admin: Create product
const createProduct = async (productData) => {
  const res = await apiClient.post('/products', productData);
  return res.data.product;
};
```

### Shopping Cart

```typescript
// Get cart
const getCart = async () => {
  const res = await apiClient.get('/cart');
  return res.data.cart;
};

// Add to cart
const addToCart = async (productId, quantity) => {
  const res = await apiClient.post('/cart/add', { productId, quantity });
  return res.data.cart;
};

// Update cart item
const updateCartItem = async (productId, quantity) => {
  const res = await apiClient.put('/cart/update', { productId, quantity });
  return res.data.cart;
};

// Remove from cart
const removeFromCart = async (productId) => {
  const res = await apiClient.delete(`/cart/remove/${productId}`);
  return res.data.cart;
};
```

### Orders

```typescript
// Get user's orders
const getUserOrders = async (page = 1, limit = 10) => {
  const res = await apiClient.get('/orders', {
    params: { page, limit },
  });
  return res.data;
};

// Create order
const createOrder = async (items, shippingAddress, paymentMethod) => {
  const res = await apiClient.post('/orders', {
    items,
    shippingAddress,
    paymentMethod,
  });
  return res.data.order;
};
```

### Gallery

```typescript
// Get gallery
const getGallery = async (page = 1, limit = 12, category = null) => {
  const res = await apiClient.get('/gallery', {
    params: { page, limit, category },
  });
  return res.data;
};
```

### Services

```typescript
// Get services
const getServices = async (page = 1, limit = 10) => {
  const res = await apiClient.get('/services', {
    params: { page, limit },
  });
  return res.data;
};

// Book a service
const bookService = async (serviceId, bookingDate, preferredTime, contact) => {
  const res = await apiClient.post('/service-bookings', {
    service: serviceId,
    bookingDate,
    preferredTime,
    contact,
  });
  return res.data.booking;
};
```

### Events

```typescript
// Get events
const getEvents = async (page = 1, limit = 10) => {
  const res = await apiClient.get('/events', {
    params: { page, limit },
  });
  return res.data;
};
```

### Image Upload

```typescript
// Upload image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.image;
};
```

## React Context Example

Create `src/context/AuthContext.tsx`:

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          setUser(res.data.user);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await apiClient.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Dwaraka Mai Digital Studio
```

## Running Backend & Frontend

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Testing API

Use Postman or VS Code REST Client to test endpoints.

Example request:
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## Error Handling

Implement error handling in your components:

```typescript
try {
  await login(email, password);
} catch (error) {
  if (error.response?.status === 401) {
    console.error('Invalid credentials');
  } else {
    console.error(error.response?.data?.message || 'Error occurred');
  }
}
```

## CORS Issues

If you encounter CORS issues:
1. Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
2. The backend CORS is configured to accept requests from the frontend

## Next Steps

1. Set up authentication context in your app layout
2. Create API service layer for all endpoints
3. Implement protected routes for authenticated users
4. Add loading and error states to your components
5. Set up data caching/state management (React Query, Redux, etc.)
