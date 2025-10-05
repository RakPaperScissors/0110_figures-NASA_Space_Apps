# Render.com Deployment Guide

## Overview

This guide will help you deploy the NASA Space Apps flood marking system to Render.com. The application consists of:
- **Backend**: NestJS API server
- **Frontend**: React/Vite application
- **Database**: Cloud PostgreSQL with PostGIS (external)

## Prerequisites

1. **Render.com Account**: Sign up at https://render.com
2. **GitHub Repository**: Your code must be pushed to GitHub
3. **Cloud PostgreSQL Database** with:
   - PostGIS extension enabled
   - Connection details (host, port, user, password, database name)
   - Network access allowed from Render.com IPs

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your latest changes are committed and pushed:

```powershell
git add .
git commit -m "Configure for Render.com deployment"
git push origin main
```

### 2. Deploy Using Blueprint

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Create New Blueprint**:
   - Click "New" → "Blueprint"
   - Connect your GitHub account if not already connected
   - Select repository: `RakPaperScissors/0110_figures-NASA_Space_Apps`
   - Select branch: `main` (or `Deployment` if you're using that branch)
   - Click "Apply"

3. **Render will detect `render.yaml`** and create:
   - ✅ Backend service: `nasa-flood-backend`
   - ✅ Frontend service: `nasa-flood-frontend`

### 3. Configure Environment Variables

After the services are created, you need to add environment variables:

#### Backend Service Environment Variables

Go to your backend service settings and add:

**Database Configuration:**
```
DATABASE_HOST=your-postgres-host.com
DATABASE_PORT=5432
DATABASE_USER=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_NAME=your-database-name
```

**Meteomatics API (Already in render.yaml):**
```
METEOMATICS_USERNAME=buhayan_joseph
METEOMATICS_PASSWORD=m49Ci4rQ0obS5zP72u37
```

**Frontend URL (Auto-configured):**
```
FRONTEND_URL=https://nasa-flood-frontend.onrender.com
```
(Update this after your frontend is deployed and you know the URL)

#### Frontend Service Environment Variables

Go to your frontend service settings and add:

**Backend API URL (Auto-configured):**
```
VITE_API_URL=https://nasa-flood-backend.onrender.com
```
(Update this after your backend is deployed and you know the URL)

**Meteomatics API (Already in render.yaml):**
```
VITE_API_USERNAME=buhayan_joseph
VITE_API_PASSWORD=m49Ci4rQ0obS5zP72u37
```

**Port (Auto-configured):**
```
PORT=10000
```

### 4. Enable Cross-Service References

The `render.yaml` is configured to automatically link frontend and backend URLs, but you may need to update the CORS settings in `backend/src/main.ts` to allow your Render URLs.

The current CORS configuration should already allow `*.onrender.com` domains.

### 5. Deploy

After adding environment variables:

1. **Backend will auto-deploy** - Wait for it to complete
2. **Frontend will auto-deploy** - Wait for it to complete
3. **Check logs** for any errors in the Render dashboard

## Troubleshooting

### Build Fails: "nest: not found" or "vite: not found"

This means devDependencies aren't being installed. The `render.yaml` now includes `--include=dev` flag to fix this.

**Solution**: Make sure your `render.yaml` has:
```yaml
buildCommand: npm ci --include=dev && npm run build
```

### Database Connection Fails

**Check**:
1. Database credentials are correct in environment variables
2. Render.com IPs are allowed in your database firewall
3. PostGIS extension is enabled: `CREATE EXTENSION IF NOT EXISTS postgis;`

**Get Render.com IPs**: https://render.com/docs/static-outbound-ip-addresses

### CORS Errors

If you see CORS errors in the browser console:

1. Check `backend/src/main.ts` includes your Render URLs
2. Update `FRONTEND_URL` in backend environment variables
3. The regex `/^https?:\/\/.*\.onrender\.com$/` should match your domains

### Images Not Displaying

1. Verify backend endpoint `/posts/{postId}/image` is accessible
2. Check database has image data (stored as bytea/Buffer)
3. Check browser network tab for failed image requests

### Port Binding Errors

Make sure:
- Backend binds to `0.0.0.0` (already configured in main.ts)
- Frontend preview command uses `--host 0.0.0.0 --port $PORT`

## Service URLs

After deployment, your services will be available at:

- **Backend**: `https://nasa-flood-backend.onrender.com`
- **Frontend**: `https://nasa-flood-frontend.onrender.com`
- **Health Check**: `https://nasa-flood-backend.onrender.com/marks/active`

## Important Notes

### Free Tier Limitations

Render.com free tier has some limitations:
- ⏰ Services spin down after 15 minutes of inactivity
- 🐌 First request after spin-down takes 30-60 seconds (cold start)
- 💾 750 hours/month of runtime per service
- 🌐 Shared IP addresses

### Build Time

- Backend build: ~2-3 minutes
- Frontend build: ~1-2 minutes
- Total deployment: ~5-7 minutes

### Automatic Deploys

Render automatically redeploys when you push to your connected branch:
- Push to `main` → Auto-deploy triggered
- View deploy logs in Render dashboard

## Updating Your App

1. **Make code changes locally**
2. **Commit and push to GitHub**:
   ```powershell
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Render auto-deploys** - Check dashboard for progress

## Environment Variable Reference

### Backend Required Variables
| Variable | Example | Description |
|----------|---------|-------------|
| `DATABASE_HOST` | `postgres.example.com` | PostgreSQL host |
| `DATABASE_PORT` | `5432` | PostgreSQL port |
| `DATABASE_USER` | `dbuser` | Database username |
| `DATABASE_PASSWORD` | `secretpassword` | Database password |
| `DATABASE_NAME` | `flooddb` | Database name |
| `FRONTEND_URL` | `https://nasa-flood-frontend.onrender.com` | Frontend URL for CORS |
| `NODE_ENV` | `production` | Node environment |
| `PORT` | `3000` | Backend port (auto-set by Render) |

### Frontend Required Variables
| Variable | Example | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `https://nasa-flood-backend.onrender.com` | Backend API URL |
| `VITE_API_USERNAME` | `buhayan_joseph` | Meteomatics username |
| `VITE_API_PASSWORD` | `m49Ci4rQ0obS5zP72u37` | Meteomatics password |
| `PORT` | `10000` | Frontend port (auto-set by Render) |

## Support

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Community Forum**: https://community.render.com

## Next Steps

1. ✅ Deploy to Render.com
2. ✅ Configure environment variables
3. ✅ Test the application
4. ✅ Set up custom domain (optional)
5. ✅ Monitor logs and usage in Render dashboard

Your flood marking system is now ready for production! 🌊🚀
