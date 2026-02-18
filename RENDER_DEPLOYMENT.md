# Book Lab - Render Deployment

## 🚀 Deployment Guide

### Frontend (React + Vite)
1. **Root Directory**: `app/`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Node Version**: 18.x or higher

### Backend (Node.js + Express)
1. **Root Directory**: `server/`
2. **Start Command**: `npm start`
3. **Node Version**: 18.x or higher

## 📋 Environment Variables

### Frontend
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🛠️ Pre-Deployment Checklist

### ✅ Frontend
- [x] Vite config optimized for production
- [x] API calls use environment variables
- [x] Build timeout increased to 120s
- [x] Source maps disabled for faster builds
- [x] CORS headers configured
- [x] Security headers added

### ✅ Backend
- [x] Express server configured
- [x] CORS enabled for frontend
- [x] Static file serving
- [x] Error handling middleware
- [x] Production-ready

## 🔧 Render Configuration

### Frontend Service
- **Type**: Static Site
- **Build Command**: `cd app && npm install && npm run build`
- **Publish Directory**: `app/dist`
- **Auto-Deploy**: Yes (on push to main)

### Backend Service  
- **Type**: Web Service
- **Build Command**: `cd server && npm install`
- **Start Command**: `npm start`
- **Auto-Deploy**: Yes (on push to main)

## 🌐 Integration

### Frontend API Configuration
Update `app/src/services/api.js` to use environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Backend CORS Configuration
Ensure backend accepts requests from your frontend URL:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
```

## 📁 Project Structure
```
Book/
├── app/                 # Frontend (React + Vite)
│   ├── dist/            # Build output
│   ├── src/
│   ├── package.json
│   └── vite.config.js   # Production optimized
├── server/              # Backend (Node.js + Express)
│   ├── controllers/
│   ├── routes/
│   ├── uploads/         # File storage
│   └── package.json
├── render.yaml         # Render configuration
└── README.md
```

## 🚨 Common Issues & Solutions

### Build Timeout
- ✅ Increased HMR timeout to 120s
- ✅ Disabled source maps
- ✅ Optimized chunk sizes

### CORS Issues
- ✅ Added CORS headers to Vite config
- ✅ Backend CORS configured for frontend URL

### File Upload Issues
- ✅ FormData properly configured
- ✅ Multer middleware in place
- ✅ File size limits set (50MB)

### Memory Issues
- ✅ Manual chunks enabled
- ✅ Dependencies optimized
- ✅ Build process streamlined

## 🎯 Production Optimizations

### Frontend
- Code splitting enabled
- Tree shaking active
- Minification with Terser
- Gzip compression (Render handles)

### Backend
- Production environment set
- Error logging enabled
- Security headers configured
- Rate limiting recommended

## 🔄 Deployment Steps

1. **Push to GitHub**
2. **Create Frontend Service** on Render
3. **Create Backend Service** on Render
4. **Set Environment Variables**
5. **Test Integration**
6. **Configure Custom Domain** (optional)

## 📞 Support

For deployment issues:
1. Check Render build logs
2. Verify environment variables
3. Test API endpoints
4. Check CORS configuration
