#!/bin/bash

# Development setup script for Smart Classroom & Timetable Scheduler
echo "🚀 Setting up development environment..."

# Navigate to project root
cd "$(dirname "$0")/.."

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install

# Start development server
echo "🔥 Starting development server..."
npm run dev

echo "✅ Development environment ready!"
echo "📱 Frontend: http://localhost:8081"
echo "🔗 Network: Available on your local network"