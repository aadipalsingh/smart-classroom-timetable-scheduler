# Smart Classroom Timetable Scheduler

## Quick Start

This project has been restructured for better organization. To run the application:

```bash
# Install dependencies
cd client
npm install

# Start development server  
npm run dev
```

## New Structure

- `client/` - Frontend React application (main codebase)
- `docs/` - Documentation and reports
- `scripts/` - Utility scripts
- `NEW-STRUCTURE-README.md` - Detailed architecture documentation

## Running Commands

All development commands should be run from the `client/` directory:

```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

The application will be available at `http://localhost:8080`

## Environment Setup

Copy environment variables:
```bash
cd client
cp .env.example .env.local
```

Configure EmailJS credentials in `.env.local` for forgot password functionality.

See `NEW-STRUCTURE-README.md` for complete documentation.