# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /srv/app

# Install system dependencies
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build Strapi
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /srv/app

# Install system dependencies
RUN apk add --no-cache \
    vips-dev \
    libpng-dev

# Copy built assets from builder
COPY --from=builder /srv/app/node_modules ./node_modules
COPY --from=builder /srv/app/package*.json ./
COPY --from=builder /srv/app/.env* ./
COPY --from=builder /srv/app/config ./config
COPY --from=builder /srv/app/dist ./dist
COPY --from=builder /srv/app/public ./public
COPY --from=builder /srv/app/src ./src
COPY --from=builder /srv/app/package.json ./

# Set environment variables
ENV NODE_ENV=production

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"] 