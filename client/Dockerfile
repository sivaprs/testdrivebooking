# Step 1: Build the React App with Node.js v20.14.0
FROM node:20.14.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app source code
COPY . ./

ENV REACT_APP_API_URL=http://localhost:9000

# Build the React app
RUN npm run build

# Step 2: Serve the App with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the previous step
COPY --from=build /app/build /usr/share/nginx/html

#EXPOSE 3000
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]