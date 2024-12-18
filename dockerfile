# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the application source code
COPY . .

# Build the application for production
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:1.23-alpine

# Copy built files from the build stage to Nginx's default web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
