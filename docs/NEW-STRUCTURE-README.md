# Smart Classroom Timetable Scheduler - Restructured Architecture

## 🏗️ New Project Structure

This project has been completely restructured for better organization, scalability, and future backend integration.

### Directory Overview

```
smart-classroom-timetable-scheduler/
├── client/                     # Frontend React application
├── docs/                      # Documentation files  
├── scripts/                   # Build and test scripts
└── README.md                  # This file
```

### Client Architecture (Frontend)

```
client/
├── src/
│   ├── app/                   # App-level configuration
│   │   ├── App.tsx           # Main routing and layout
│   │   ├── App.css           # Global styles
│   │   ├── globals.css       # Tailwind imports
│   │   ├── Index.tsx         # Landing page
│   │   └── NotFound.tsx      # 404 page
│   │
│   ├── features/             # Feature-based modules
│   │   ├── auth/            # Authentication
│   │   ├── dashboard/       # Dashboard & notifications  
│   │   ├── faculty/         # Faculty management
│   │   ├── classrooms/      # Classroom management
│   │   ├── timetable/       # Timetable generation
│   │   └── settings/        # Settings & profile
│   │
│   └── shared/              # Shared resources
│       ├── components/      # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utilities
│       ├── contexts/       # React contexts
│       ├── services/       # API services
│       ├── types/          # TypeScript types
│       ├── data/           # Mock data
│       └── assets/         # Static assets
│
├── public/                  # Static files
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
└── .env.local              # Environment variables
```

## 🎯 Architecture Benefits

### 1. **Feature-Based Organization**
- Each feature is self-contained with its own components and logic
- Easy to locate and maintain related functionality
- Supports multiple developers working on different features

### 2. **Clean Separation of Concerns**
- `app/` - Application shell and routing
- `features/` - Business domain logic
- `shared/` - Reusable utilities and components

### 3. **Scalable Structure**
- Easy to add new features without cluttering
- Clear import paths with TypeScript aliases
- Modular architecture supports team growth

### 4. **Backend-Ready**
When adding a backend server:
```
server/
├── src/
│   ├── controllers/        # Route handlers
│   ├── models/            # Database models  
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── services/          # Business logic
├── config/                # Configuration
└── package.json           # Server dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd smart-classroom-timetable-scheduler

# Install dependencies
cd client
npm install

# Set up environment variables
cp .env.example .env.local
# Configure EmailJS credentials in .env.local

# Start development server
npm run dev
```

### Development Server
The app will be available at `http://localhost:8080`

## 📁 Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of relative imports
import { Button } from '../../shared/components/ui/button'

// Use clean aliases  
import { Button } from '@/shared/components/ui/button'
```

Available aliases:
- `@/` → `src/`
- `@/app` → `src/app/`
- `@/features` → `src/features/`
- `@/shared` → `src/shared/`

## 🔧 Adding New Features

1. **Create feature directory**
   ```bash
   mkdir client/src/features/new-feature
   ```

2. **Add components and logic**
   ```bash
   touch client/src/features/new-feature/NewFeature.tsx
   touch client/src/features/new-feature/index.ts
   ```

3. **Export from index.ts**
   ```typescript
   export { default as NewFeature } from './NewFeature';
   ```

4. **Add to routing in App.tsx**
   ```typescript
   import { NewFeature } from '@/features/new-feature';
   ```

## 📦 Scripts

Located in `/scripts/` directory:
- `test-duration.js` - Performance testing
- `test-generation.js` - Timetable generation testing  
- `test-pdf-functionality.js` - PDF export testing

## 📚 Documentation

Located in `/docs/` directory:
- `README.md` - Main documentation
- `report.md` - Project report
- `debug-auth.html` - Authentication debugging

## 🌐 Deployment

The project is configured for Vercel deployment:
- Build command: `npm run build` (in client directory)
- Output directory: `client/dist`
- Environment variables needed for production

## ✅ Recent Enhancements

### Environment Configuration
- Added development and production environment files
- Created `use-environment` hook for centralized config management
- Added TypeScript definitions for environment variables

### API Service Layer
- Created base API service with HTTP methods (GET, POST, PUT, DELETE)
- Added feature-specific services (Faculty, Classroom)
- Ready for seamless backend integration

### Development Scripts
- Added development setup script (`scripts/dev-setup.sh`)
- Added production build script (`scripts/build-prod.sh`)
- Enhanced package.json with additional scripts

### Backend Structure
- Created complete server directory structure
- Added server package.json with all required dependencies
- Created environment configuration for server
- Added comprehensive server documentation

## 🚀 Next Steps

1. **Backend Implementation**: 
   ```bash
   cd server
   npm install
   # Set up database and implement API endpoints
   ```

2. **Database Setup**: Configure PostgreSQL and Prisma models
3. **API Integration**: Replace mock data with real API calls using existing services
4. **Authentication**: Implement JWT-based authentication
5. **Testing**: Add comprehensive test suites for both client and server
6. **Deployment**: Set up CI/CD pipelines

## 🤝 Future Enhancements

This structure supports:
- Backend API integration
- Database connectivity
- Real-time features with WebSockets
- Microservices architecture
- Multi-tenant support
- Mobile app development

## 📄 Migration Notes

All existing functionality has been preserved:
- All React components moved to appropriate feature directories
- Import paths updated with new aliases
- Existing build and deployment configuration maintained
- Environment variables and configuration preserved

The application works exactly the same as before, just with better organization! 🎉