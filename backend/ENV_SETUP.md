# Environment Configuration Guide

## .env File Setup

Create a `.env` file in the root of the `backend` directory with the following configuration:

### Template (.env.example)
```env
# ========================
# Database Configuration
# ========================
MONGODB_URI=mongodb://localhost:27017/dwarakamai
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dwarakamai

# ========================
# JWT Configuration
# ========================
JWT_SECRET=your_super_secret_jwt_key_change_in_production_use_strong_random_string
JWT_EXPIRY=24h

# ========================
# Cloudinary Configuration
# ========================
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ========================
# Frontend Configuration
# ========================
FRONTEND_URL=http://localhost:3000
# Production:
# FRONTEND_URL=https://yourdomain.com

# ========================
# Server Configuration
# ========================
PORT=5000
NODE_ENV=development
# Production:
# NODE_ENV=production
```

## Environment Variables Explanation

### Database

**MONGODB_URI**
- Connection string for MongoDB
- Local development: `mongodb://localhost:27017/dwarakamai`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/dwarakamai`
- Required for server startup

### JWT (JSON Web Tokens)

**JWT_SECRET**
- Secret key for signing JWT tokens
- Use a strong, random string
- Example (DO NOT USE): `your_jwt_secret_key_min_32_chars_recommended`
- Generate secure key: 
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

**JWT_EXPIRY**
- How long tokens remain valid
- Format: `24h`, `7d`, `30d`, etc.
- Default: `24h`

### Cloudinary

**CLOUDINARY_CLOUD_NAME**
- Your Cloudinary account cloud name
- Found in Cloudinary Dashboard

**CLOUDINARY_API_KEY**
- Your Cloudinary API key
- Found in Cloudinary Dashboard under API Keys

**CLOUDINARY_API_SECRET**
- Your Cloudinary API secret
- Found in Cloudinary Dashboard under API Keys
- Keep this secret and never commit to version control

### Frontend Integration

**FRONTEND_URL**
- URL where your Next.js frontend is hosted
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`
- Used for CORS configuration

### Server

**PORT**
- Port on which backend server listens
- Default: `5000`
- Can be any available port

**NODE_ENV**
- Environment mode
- Values: `development`, `production`
- Affects error messages and performance optimizations

## Setup Steps

### Step 1: Create .env File

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create `.env` file:
   ```bash
   touch .env
   ```

3. Copy template:
   ```bash
   cp .env.example .env
   ```

### Step 2: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Windows (using MongoDB installer)
mongod

# Mac (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com](https://mongodb.com)
2. Create a cluster
3. Get connection string from "Connect" button
4. Add IP whitelist for your machine
5. Update `MONGODB_URI` in .env with connection string

### Step 3: Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy credentials:
   - Cloud Name
   - API Key
   - API Secret
4. Add to .env file

### Step 4: Generate JWT Secret

Create a strong random secret:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Using OpenSSL:**
```bash
openssl rand -hex 32
```

**Using Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the output and paste into `JWT_SECRET` in .env

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Start Development Server

```bash
npm run start:dev
```

Server should be running on `http://localhost:5000`

## Example Configurations

### Development Environment (.env)
```env
MONGODB_URI=mongodb://localhost:27017/dwarakamai
JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
JWT_EXPIRY=24h
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### Production Environment (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dwarakamai
JWT_SECRET=production_jwt_secret_random_string_min_32_chars
JWT_EXPIRY=24h
CLOUDINARY_CLOUD_NAME=mycompany
CLOUDINARY_API_KEY=production_api_key
CLOUDINARY_API_SECRET=production_api_secret
FRONTEND_URL=https://dwarakamai.com
PORT=5000
NODE_ENV=production
```

## Security Best Practices

1. **Never commit .env to version control**
   - Add to `.gitignore`:
     ```
     .env
     .env.local
     .env.*.local
     ```

2. **Use strong secrets in production**
   - Minimum 32 characters
   - Mix uppercase, lowercase, numbers, special characters
   - Use environment management tools

3. **Rotate secrets regularly**
   - JWT_SECRET should be rotated periodically
   - Update Cloudinary credentials

4. **Use different credentials per environment**
   - Development: Less sensitive keys
   - Production: Separate, stronger credentials

5. **Protect sensitive data**
   - Use environment variables
   - Never expose secrets in logs
   - Use secrets management (AWS Secrets Manager, HashiCorp Vault)

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running
- Check connection string in MONGODB_URI
- Verify port 27017 is not blocked

### JWT Error
```
Error: No secret provided for JWT
```
**Solution:**
- Check JWT_SECRET is set in .env
- Ensure it's not empty
- Restart server after updating

### Cloudinary Error
```
Error: Authentication failed
```
**Solution:**
- Verify CLOUDINARY credentials in .env
- Check credentials are correct
- Try regenerating API key in Cloudinary dashboard

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
- Change PORT in .env to available port
- Kill process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -i :5000
  kill -9 <PID>
  ```

### CORS Error
```
Error: Cross-Origin Request Blocked
```
**Solution:**
- Check FRONTEND_URL matches frontend domain
- Update FRONTEND_URL in .env
- Restart backend server

## Environment Variables in Code

Access environment variables in NestJS:

```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  getConfig() {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const mongoUri = this.configService.get<string>('MONGODB_URI');
    const port = this.configService.get<number>('PORT');
  }
}
```

Or using process.env directly:
```typescript
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 5000;
```

## Validation

Verify environment setup:

```bash
# Check MongoDB connection
curl http://localhost:5000/products

# Check if server is running
curl http://localhost:5000/

# Check environment variables are loaded
node -e "console.log(process.env.MONGODB_URI)"
```

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [NestJS Config Module](https://docs.nestjs.com/techniques/configuration)
- [JWT.io](https://jwt.io)

## Summary Checklist

- ✅ Created .env file
- ✅ Set MONGODB_URI
- ✅ Generated JWT_SECRET
- ✅ Added Cloudinary credentials
- ✅ Set FRONTEND_URL
- ✅ Set PORT
- ✅ Set NODE_ENV
- ✅ Installed dependencies
- ✅ Started server
- ✅ Tested endpoints
