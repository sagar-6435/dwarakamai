# Render Deployment Guide

This guide explains how to deploy the Dwarakamai backend to Render.

## Prerequisites

1. Render account (free tier available)
2. GitHub repository connected to Render
3. MongoDB Atlas account (or MongoDB instance)
4. Cloudinary account
5. All environment variables configured

## Step-by-Step Deployment

### 1. Connect GitHub Repository

1. Go to [render.com](https://render.com)
2. Sign in with your account
3. Click **New +** → **Web Service**
4. Select your `dwarakamai` repository from GitHub
5. Click **Connect**

### 2. Configure Deployment Settings

**Basic Settings:**
- **Name:** `dwarakamai-backend`
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Plan:** Free (or upgrade as needed)

**Build & Deploy:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`
- **Root Directory:** `backend`

### 3. Add Environment Variables

In Render dashboard, go to **Environment** and add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dwarakamai
JWT_SECRET=your-very-secure-secret-key-change-this
JWT_EXPIRY=24h
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=https://your-frontend-domain.com
```

**Get MongoDB Atlas Connection String:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/select your cluster
3. Click **Connect** → **Drivers**
4. Copy the connection string
5. Replace `<username>`, `<password>`, and database name as needed

**Get Cloudinary Credentials:**
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy your Cloud Name, API Key, and API Secret

### 4. Deploy

1. Click **Deploy** button in Render
2. Monitor the build logs in the **Deploy** section
3. Once deployed, you'll get a URL like: `https://dwarakamai-backend-xxxx.onrender.com`

## Important Notes

- **Free tier:** Render spins down services after 15 minutes of inactivity. Services will restart on next request (takes 30 seconds)
- **Upgrade to paid:** If you need always-on service, upgrade to a paid plan
- **Environment Variables:** Always mark sensitive variables (like JWT_SECRET) with `sync: false` in render.yaml
- **Logs:** View application logs in Render dashboard under **Logs** tab

## Auto-Deploy on GitHub Push

1. In Render dashboard, go to **Settings**
2. Enable **Auto-Deploy** for your repository
3. Choose branch (e.g., `main`)
4. Now every push to `main` will trigger a new deployment

## Testing Deployment

Once deployed, test your API:

```bash
# Health check
curl https://dwarakamai-backend-xxxx.onrender.com

# Register user
curl -X POST https://dwarakamai-backend-xxxx.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Troubleshooting

**Build Fails:**
- Check logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify `root directory` is set to `backend`

**MongoDB Connection Error:**
- Verify MongoDB URI in environment variables
- Check MongoDB Atlas IP whitelist includes Render
- Ensure database name exists in MongoDB

**Application Crashes:**
- Check application logs in Render dashboard
- Verify all required environment variables are set
- Ensure JWT_SECRET is not empty

## Monitoring

1. **Logs:** Real-time application logs visible in Render dashboard
2. **Metrics:** View CPU, memory usage in dashboard
3. **Alerts:** Set up email alerts for deployment failures

## Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Cloudinary account set up
- [ ] All environment variables added to Render
- [ ] SSL certificate enabled (Render provides free HTTPS)
- [ ] Frontend CORS configured correctly in FRONTEND_URL
- [ ] Database backups configured in MongoDB Atlas
- [ ] API tested with Postman or similar tool
