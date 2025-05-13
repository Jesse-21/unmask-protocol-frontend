
#!/bin/bash
# Post-deployment script for Plesk environment

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Check node version
echo "Node version: $(node -v)"

# Export NVM directory if using NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Try to use the correct node version
if [ -f ".node-version" ]; then
    NODE_VERSION=$(cat .node-version)
    echo "Using Node.js version from .node-version: $NODE_VERSION"
    
    # Check if the version is available with nvm
    if command -v nvm &> /dev/null; then
        nvm install $NODE_VERSION || nvm use $NODE_VERSION || echo "Failed to set Node version with nvm"
    fi
    
    # Additional diagnostic info
    echo "After NVM setup, using Node version: $(node -v)"
    echo "Node path: $(which node)"
    echo "NPM version: $(npm -v)"
fi

# Set permissions
chmod +x ./deploy-scripts.sh

# Run npm install if needed with force to resolve any conflicts
echo "Installing dependencies..."
npm install --force

# Check if install succeeded
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed. Check Node.js compatibility"
    exit 1
fi

# Build the application with explicit base path for assets
echo "Building application..."
npm run build

# Check if build succeeded
if [ $? -ne 0 ]; then
    echo "ERROR: build failed. See error messages above."
    exit 1
fi

# Create necessary directories if they don't exist
mkdir -p dist/protection-shield.png

# Copy static assets to ensure they're available
echo "Copying static assets..."
cp -f protection-shield.png dist/protection-shield.png/ || echo "Warning: Failed to copy protection-shield.png"
echo "Contents of distribution folder:"
ls -la dist/

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
echo "4. If you're still having issues, try adding 'console.log' statements to debug"
echo "=============================="
