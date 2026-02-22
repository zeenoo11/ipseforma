# Step 1: Build the Vite application
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first for better cache utilization
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the app into the /app/dist folder
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: If you need custom Nginx configuration, you can copy it here:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
