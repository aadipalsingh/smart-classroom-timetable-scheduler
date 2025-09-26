# Smart Classroom & Timetable Scheduler - Server

## Overview

Backend API server for the Smart Classroom & Timetable Scheduler application.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your database URL in .env
# DATABASE_URL="postgresql://username:password@localhost:5432/smart_classroom_db"

# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Faculty Management

- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/:id` - Get faculty by ID
- `POST /api/faculty` - Create new faculty
- `PUT /api/faculty/:id` - Update faculty
- `DELETE /api/faculty/:id` - Delete faculty

### Classroom Management

- `GET /api/classrooms` - Get all classrooms
- `GET /api/classrooms/:id` - Get classroom by ID
- `POST /api/classrooms` - Create new classroom
- `PUT /api/classrooms/:id` - Update classroom
- `DELETE /api/classrooms/:id` - Delete classroom

### Timetable Management

- `GET /api/timetables` - Get all timetables
- `POST /api/timetables/generate` - Generate new timetable
- `GET /api/timetables/:id` - Get timetable by ID
- `PUT /api/timetables/:id` - Update timetable
- `DELETE /api/timetables/:id` - Delete timetable

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client
- `npm run studio` - Open Prisma Studio
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
server/
├── src/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utilities
│   └── index.ts        # Entry point
├── prisma/
│   └── schema.prisma   # Database schema
└── tests/              # Test files
```

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT
