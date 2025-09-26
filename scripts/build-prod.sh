#!/bin/bash

# Production build script
echo "🏗️  Building for production..."

# Navigate to project root
cd "$(dirname "$0")/.."

# Build client
echo "📦 Building client application..."
cd client
npm run build

# Create production directory structure
echo "📁 Organizing production build..."
cd ..
mkdir -p production
cp -r client/dist production/client

echo "✅ Production build complete!"
echo "📂 Build output: ./production/"
echo "🚀 Ready for deployment!"