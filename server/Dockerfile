# Use Node.js image
FROM node:20.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

RUN ls -l dist/

# Expose port 9000
EXPOSE 9000

# Start the application
CMD ["node", "dist/server.js"]
