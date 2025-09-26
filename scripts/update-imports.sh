#!/bin/bash

# Script to update import paths in the restructured project

echo "Updating import paths..."

# Directory containing the client source files
CLIENT_SRC="/Users/adityapal/Developer/smart classroom and timetable Scheduler/client/src"

# Find all TypeScript and TSX files and update imports
find "$CLIENT_SRC" -name "*.tsx" -o -name "*.ts" | while read -r file; do
    echo "Updating: $file"
    
    # Update component imports
    sed -i '' 's|@/components/ui/|@/shared/components/ui/|g' "$file"
    sed -i '' 's|@/components/|@/shared/components/|g' "$file"
    
    # Update other shared imports
    sed -i '' 's|@/hooks/|@/shared/hooks/|g' "$file"
    sed -i '' 's|@/lib/|@/shared/lib/|g' "$file"
    sed -i '' 's|@/contexts/|@/shared/contexts/|g' "$file"
    sed -i '' 's|@/types/|@/shared/types/|g' "$file"
    sed -i '' 's|@/data/|@/shared/data/|g' "$file"
    sed -i '' 's|@/services/|@/shared/services/|g' "$file"
    
done

echo "Import paths updated successfully!"