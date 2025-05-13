
#!/bin/bash
# Post-deployment script for Plesk environment

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Set permissions
chmod +x ./deploy-scripts.sh

# Run npm install if needed with force to resolve any conflicts
echo "Installing dependencies..."
npm install --force

# Build the application with explicit base path for assets
echo "Building application..."
npm run build

# Create necessary directories if they don't exist
mkdir -p dist/protection-shield.png

# Copy static assets to ensure they're available
echo "Copying static assets..."
cp -f protection-shield.png dist/protection-shield.png/ || echo "Warning: Failed to copy protection-shield.png"

# Fix permissions for all files
echo "Setting permissions..."
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# Any additional commands needed after deployment
echo "Deployment completed successfully"

# Print help information
echo ""
echo "====== DEPLOYMENT NOTES ======"
echo "If you encounter issues with image loading:"
echo "1. Check that protection-shield.png exists in your root directory"
echo "2. Confirm that your server has correct MIME types configured"
echo "3. Review server logs for 404 or 500 errors"
echo "=============================="

