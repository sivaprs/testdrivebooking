# Use Node.js 20 base image
FROM node:20.14.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the application code
COPY . .

# Expose port (match your Express server port)
EXPOSE 9000

# Start the server
CMD ["npm", "start"]