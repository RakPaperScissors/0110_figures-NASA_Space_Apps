# Railway Deployment Guide - NASA Space Apps Flood Marking System

## 🚀 Quick Deploy

This guide will help you deploy both the backend (NestJS) and frontend (Vite + React) to Railway.

---

## 📋 Prerequisites

1. [Railway Account](https://railway.app/) (sign up with GitHub)
2. PostgreSQL database with PostGIS extension
3. GitHub repository pushed to your account

---

## 🗄️ Step 1: Deploy PostgreSQL Database

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Provision PostgreSQL"**
4. Once deployed, go to the PostgreSQL service
5. Click **"Variables"** tab
6. Note down the connection details (you'll need these)

### Enable PostGIS Extension:

1. In PostgreSQL service, click **"Data"** tab
2. Click **"Connect"** to open the database console
3. Run this command:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```

---

## 🔧 Step 2: Deploy Backend (NestJS API)

1. In Railway Dashboard, click **"New"** → **"GitHub Repo"**
2. Select your repository
3. Railway will detect the monorepo
4. **Configure the backend service:**
   - Click **"Settings"**
   - **Root Directory**: Set to `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`

5. **Add Environment Variables** (click "Variables" tab):
   ```env
   # Database Configuration
   DATABASE_HOST=${{Postgres.PGHOST}}
   DATABASE_PORT=${{Postgres.PGPORT}}
   DATABASE_USER=${{Postgres.PGUSER}}
   DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
   DATABASE_NAME=${{Postgres.PGDATABASE}}
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   
   # Application
   NODE_ENV=production
   PORT=3000
   
   # Frontend URL (you'll update this after frontend is deployed)
   FRONTEND_URL=https://your-frontend.railway.app
   
   # Meteomatics API (from your existing .env)
   METEOMATICS_USERNAME=buhayan_joseph
   METEOMATICS_PASSWORD=m49Ci4rQ0obS5zP72u37
   ```

6. **Deploy**: Railway will automatically build and deploy
7. **Get Backend URL**: Copy the generated URL (e.g., `https://your-backend.railway.app`)

---

## 🎨 Step 3: Deploy Frontend (Vite + React)

1. In the same Railway project, click **"New"** → **"GitHub Repo"**
2. Select the same repository again
3. **Configure the frontend service:**
   - Click **"Settings"**
   - **Root Directory**: Set to `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`

4. **Add Environment Variables** (click "Variables" tab):
   ```env
   # Backend API URL (use the URL from Step 2)
   VITE_API_URL=https://your-backend.railway.app
   
   # Meteomatics API Credentials
   VITE_API_USERNAME=buhayan_joseph
   VITE_API_PASSWORD=m49Ci4rQ0obS5zP72u37
   
   # Port for Railway
   PORT=4173
   ```

5. **Deploy**: Railway will automatically build and deploy
6. **Get Frontend URL**: Copy the generated URL (e.g., `https://your-frontend.railway.app`)

---

## 🔄 Step 4: Update Backend CORS

1. Go back to your **Backend service** in Railway
2. Update the `FRONTEND_URL` environment variable with your actual frontend URL:
   ```env
   FRONTEND_URL=https://your-frontend.railway.app
   ```
3. Redeploy the backend (it will restart automatically)

---

## ✅ Step 5: Verify Deployment

1. **Test Backend**:
   - Visit: `https://your-backend.railway.app/marks/active`
   - Should return JSON (empty array `[]` or flood marks data)

2. **Test Frontend**:
   - Visit: `https://your-frontend.railway.app`
   - Should load the map interface
   - Try creating a flood mark to test the connection

---

## 🔐 Environment Variables Summary

### Backend (.env):
```env
# Database (use Railway PostgreSQL references)
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_USER=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_NAME=${{Postgres.PGDATABASE}}

# Application
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend.railway.app

# APIs
METEOMATICS_USERNAME=buhayan_joseph
METEOMATICS_PASSWORD=m49Ci4rQ0obS5zP72u37
```

### Frontend (.env):
```env
VITE_API_URL=https://your-backend.railway.app
VITE_API_USERNAME=buhayan_joseph
VITE_API_PASSWORD=m49Ci4rQ0obS5zP72u37
PORT=4173
```

---

## 🐛 Troubleshooting

### Backend won't start:
- Check logs: Click service → "Deployments" → "View Logs"
- Verify DATABASE_URL is set correctly
- Ensure PostGIS extension is enabled

### Frontend can't connect to backend:
- Verify VITE_API_URL is correct
- Check backend CORS includes frontend URL
- Check browser console for CORS errors

### Database connection errors:
- Verify PostgreSQL service is running
- Check DATABASE_* variables are set
- Run `CREATE EXTENSION postgis;` in database console

### CORS errors:
- Update FRONTEND_URL in backend variables
- Redeploy backend service
- Clear browser cache

---

## 📦 Project Structure

```
0110_figures-NASA_Space_Apps/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── railway.json
│   └── Procfile
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── railway.json
│   └── Procfile
└── RAILWAY_DEPLOYMENT.md
```

---

## 🔄 Continuous Deployment

Railway automatically redeploys when you push to your GitHub repository:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Railway will automatically detect changes and redeploy

---

## 💡 Tips

1. **Environment Variables**: Use Railway's `${{ServiceName.VARIABLE}}` syntax to reference variables from other services
2. **Logs**: Always check deployment logs if something fails
3. **Health Checks**: Railway automatically detects if your service is healthy
4. **Custom Domains**: You can add custom domains in Railway settings
5. **Scaling**: Railway can scale your services automatically based on traffic

---

## 📞 Support

- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- Project Issues: Check GitHub repository issues

---

## 🎉 Success!

Once both services are deployed and working:
- ✅ Backend API running on Railway
- ✅ Frontend accessible via Railway URL
- ✅ PostgreSQL database with PostGIS
- ✅ Automatic deployments on git push

Your NASA Space Apps flood marking system is now live! 🌊🗺️
