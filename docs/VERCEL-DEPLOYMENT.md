# 🚀 TimeNest Deployment Guide for Vercel

This guide will help you deploy your TimeNest project to Vercel.

## 📋 Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository (already set up ✅)
- Node.js 18+ locally

## 🔧 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository: `aadipalsingh/smart-classroom-timetable-scheduler`
4. Vercel will automatically detect it as a Vite project

### Step 2: Configure Build Settings

Vercel should auto-detect these settings, but verify:

```bash
Framework Preset: Vite
Root Directory: ./
Build Command: cd client && npm run build
Install Command: cd client && npm install
Output Directory: client/dist
```

### Step 3: Environment Variables (Optional)

If you have any environment variables, add them in the Vercel dashboard:

```
VITE_APP_NAME=TimeNest
```

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete (usually 2-3 minutes).

## 🔧 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Project Root

```bash
# From the project root directory
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: timenest or smart-classroom-scheduler
# - Directory: ./
```

### Step 4: Production Deployment

```bash
vercel --prod
```

## 📁 Project Structure for Deployment

The project is configured with:

```
smart-classroom-timetable-scheduler/
├── vercel.json              # Deployment configuration
├── client/                  # Frontend application
│   ├── dist/               # Built files (auto-generated)
│   ├── package.json        # Dependencies and build scripts
│   └── src/               # Source code
└── server/                 # Backend (for future deployment)
```

## ⚙️ Vercel Configuration

The `vercel.json` file is configured to:

- Build the React app from the `client` directory
- Serve the built files with proper routing for SPA
- Handle client-side routing with fallback to `index.html`

## 🔍 Build Process

When deployed, Vercel will:

1. Run `cd client && npm install` to install dependencies
2. Run `cd client && npm run build` to build the React app
3. Serve the built files from `client/dist`
4. Configure routing for React Router

## 🌐 Custom Domain (Optional)

After deployment:

1. Go to your project dashboard on Vercel
2. Click **"Settings" → "Domains"**
3. Add your custom domain
4. Configure DNS settings as instructed

## � Troubleshooting 404 Errors

If you're getting a 404 error, try these fixes:

### Fix 1: Manual Build Settings Override

In Vercel dashboard, go to **Settings → General → Build & Output Settings** and override:

```bash
Build Command: npm run build
Install Command: npm run install-client
Output Directory: client/dist
Root Directory: ./
```

### Fix 2: Alternative Vercel Configuration

If the above doesn't work, try updating your `vercel.json`:

```json
{
  "buildCommand": "cd client && npm ci && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm ci",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Fix 3: Check Build Logs

1. Go to your Vercel project dashboard
2. Click on the failed deployment
3. Check the build logs for specific errors
4. Common issues:
   - Dependencies not installing correctly
   - Build command failing
   - Output directory not found

## �🔧 Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure build command is correct: `cd client && npm run build`
- Verify Node.js version compatibility

### Routing Issues

- The `vercel.json` handles SPA routing automatically
- All routes fall back to `index.html` for client-side routing

### Environment Variables

- Add any required environment variables in Vercel dashboard
- Prefix with `VITE_` for Vite to include them in build

## 📊 Expected Deployment Stats

- **Build Time**: ~2-3 minutes
- **Bundle Size**: ~2-3 MB
- **Performance**: 95+ Lighthouse score
- **Features**: All CRUD operations, authentication, responsive design

## 🎯 Post-Deployment Checklist

- [ ] Landing page loads correctly
- [ ] Authentication flow works
- [ ] Classroom management (CRUD) functions properly
- [ ] Responsive design on mobile/tablet
- [ ] All routes work correctly
- [ ] Performance is optimal

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React Router with Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

Your TimeNest application will be live at: `https://your-project-name.vercel.app`
