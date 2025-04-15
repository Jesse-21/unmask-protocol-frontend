
FROM node:21-alpine

WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Make sure the app doesn't run as root
USER node

# Expose the port
EXPOSE 5001

# Command to run the app
CMD ["npm", "run", "dev"]
