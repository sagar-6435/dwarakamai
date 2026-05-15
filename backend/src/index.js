require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { seedAdmin, seedCategories } = require('./seed');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const serviceRoutes = require('./routes/services');
const serviceBookingRoutes = require('./routes/serviceBookings');
const cartRoutes = require('./routes/cart');
const galleryRoutes = require('./routes/gallery');
const eventRoutes = require('./routes/events');
const uploadRoutes = require('./routes/upload');

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);
app.use('/service-bookings', serviceBookingRoutes);
app.use('/cart', cartRoutes);
app.use('/gallery', galleryRoutes);
app.use('/events', eventRoutes);
app.use('/upload', uploadRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dwarakamai';

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedAdmin();
    await seedCategories();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
