# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the files and build
COPY . .
RUN npm run build

# 2. Production Stage (Nginx)
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static export from builder to nginx public folder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (DigitalOcean usually maps port 8080 or 80 automatically)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
