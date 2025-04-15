
#!/bin/bash
# Post-deployment script for Plesk environment

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Run npm install if needed
npm install

# Build the application
npm run build

# Any additional commands needed after deployment
echo "Deployment completed successfully"
